import numpy as np
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine
from config import username ,password , port  

from flask import Flask, render_template, jsonify
from flask_cors import CORS

#################################################
# Database Setup
#################################################

engine = create_engine(f'postgresql://{username}:{password}@localhost:{port}/Vote_data_db')

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(engine, reflect=True)

# Save reference to the table
age_dataset = Base.classes.age_dataset
sex_race_dataset = Base.classes.sex_race_dataset


#################################################
# Flask Setup
#################################################
app = Flask(__name__)
CORS(app)


#################################################
# Flask Render HTML Routes
#################################################

@app.route("/", methods=["GET"])
def index():
    return render_template('home.html')

@app.route("/charts", methods=["GET"])
def charts():
    return render_template('charts.html')

@app.route("/age", methods=["GET"])
def age():
    return render_template('age.html')

@app.route("/sex", methods=["GET"])
def sex():
    return render_template('sex.html')

@app.route("/race", methods=["GET"])
def origin():
    return render_template('race.html')

@app.route("/contact", methods=["GET"])
def contact():
    return render_template('contact.html')

#################################################
# Flask API Routes
#################################################

 
@app.route("/api/v1.0/voting_summary/<state>/<year>", methods=["GET", 'POST'])

def voting_summary(state, year):
    

    # Create our session (link) from Python to the DB

    
    voting_summary={}
    
    
    with Session(engine) as session:
        """ Convert the query results to a dictionary .
        Return the JSON representation of your dictionary."""  
            
        # Query all age
        
        age_results_by_age =  session.query(age_dataset.age, age_dataset.total_voted,)\
            .filter(age_dataset.age!='Total',age_dataset.state==state, age_dataset.voting_year==year)\
            .all()
        
    age_group_list=[]
    voted_list=[]
    
    for age, total_voted in age_results_by_age:
         age_group_list.append(age)
         voted_list.append(total_voted)
        
    age_stats={
         'age_group': age_group_list,
         'voted': voted_list
     }
    
    voting_summary['age_stats'] = age_stats
    
    
    
    age_results_by_total =  session.query(age_dataset.total_population, age_dataset.total_registered, age_dataset.total_voted,)\
            .filter(age_dataset.age=='Total', age_dataset.state==state, age_dataset.voting_year==year)\
            .all()
   
    total_list=['total_population','total_registered','total_voted']
    voted_list=[age_results_by_total[0][0],age_results_by_total[0][1],age_results_by_total[0][2]]
    
    
    total_stats={
           'total_group':total_list,
            'voted': voted_list
         
     }
     
    voting_summary['total_stats'] = total_stats   
            
       
    sex_race_results_by_sex =  session.query(sex_race_dataset.sex_race_hispanic_origin, sex_race_dataset.total_voted,)\
            .filter(sex_race_dataset.sex_race_hispanic_origin.in_(('Male','Female')) ,sex_race_dataset.state==state, sex_race_dataset.voting_year==year)\
            .all()
            
    # sex_stats={}
    
    # for sex_race_hispanic_origin , total_voted in sex_race_results_by_sex:
    #  sex_stats[sex_race_hispanic_origin] = total_voted 
    
    sex_group_list=[]
    voted_list=[]
    
    for  sex_race_hispanic_origin , total_voted in sex_race_results_by_sex :
         sex_group_list.append(sex_race_hispanic_origin)
         voted_list.append(total_voted)
        
    sex_stats={
         'sex_group': sex_group_list,
         'voted': voted_list
     }   
     
    
    voting_summary['sex_stats'] = sex_stats
    
     
    
    
    sex_race_results_by_race =  session.query(sex_race_dataset.sex_race_hispanic_origin, sex_race_dataset.total_voted,)\
            .filter(sex_race_dataset.sex_race_hispanic_origin.notin_(('Male','Total','Female')) ,sex_race_dataset.state==state, sex_race_dataset.voting_year==year)\
            .all()
            
    
    origin_group_list=[]
    voted_list=[]
    
    for  sex_race_hispanic_origin , total_voted in sex_race_results_by_race :
         origin_group_list.append(sex_race_hispanic_origin)
         voted_list.append(total_voted)
        
    race_stats={
         'origin_group': origin_group_list,
         'voted': voted_list
     }   
     
    
   
    
    voting_summary['race_stats'] = race_stats
    

    return jsonify(voting_summary)

@app.route("/api/v1.0/voting_summary/years", methods=["GET", 'POST'])

def years():
    
    with Session(engine) as session:        
                
    # Query all Station
        results = session.query(age_dataset.voting_year).distinct(age_dataset.voting_year).all()
         
    #Convert list of tuples into normal list
    all_names = [int(x) for x in list(np.ravel(results))]

    return jsonify(all_names)

@app.route("/api/v1.0/voted_age/<year>/<age>", methods=["GET", 'POST'])

def voted_age(year , age):
    

    # Create our session (link) from Python to the DB

    
    with Session(engine) as session:
        """ Convert the query results to a dictionary .
        Return the JSON representation of your dictionary.""" 
             
        # Query all age
        total_voted_by_age =  session.query(age_dataset.state, age_dataset.total_voted)\
            .filter(age_dataset.state!='US',age_dataset.age==age, age_dataset.voting_year==year)\
            .all()
        
   
    states_list=[]
    voted_list=[]
    
    for state, total_voted in total_voted_by_age:
        states_list.append(state)
        voted_list.append(total_voted)
        
    age_stats={
         'id': states_list,
         'voted': voted_list
     }
      
 
    
    

    return jsonify(age_stats)


@app.route("/api/v1.0/voted_sex/<year>/<sex>", methods=["GET", 'POST'])

def voted_sex(year , sex):
    

    # Create our session (link) from Python to the DB

    
    voting_summary={}
    
    
    with Session(engine) as session:
        """ Convert the query results to a dictionary .
        Return the JSON representation of your dictionary.""" 
             
        # Query all sex
        total_voted_by_sex =  session.query(sex_race_dataset.state, sex_race_dataset.total_voted)\
            .filter(sex_race_dataset.state!='US',sex_race_dataset.sex_race_hispanic_origin==sex, sex_race_dataset.voting_year==year)\
            .all()
        
  
    states_list=[]
    voted_list=[]
    
    for state, total_voted in total_voted_by_sex :
        states_list.append(state)
        voted_list.append(total_voted)
        
    sex_stats={
         'id': states_list,
         'voted': voted_list
     }
      

    return jsonify(sex_stats)


@app.route("/api/v1.0/voted_origin/<year>/<origin>", methods=["GET", 'POST'])

def voted_origin(year, origin):
    

    # Create our session (link) from Python to the DB

    
    voting_summary={}
    
    
    with Session(engine) as session:
        """ Convert the query results to a dictionary .
        Return the JSON representation of your dictionary.""" 
             
        # Query all origin
        total_voted_by_origin =  session.query(sex_race_dataset.state, sex_race_dataset.total_voted,)\
            .filter(sex_race_dataset.sex_race_hispanic_origin.notin_(('Male','Total','Female')) ,sex_race_dataset.sex_race_hispanic_origin==origin, sex_race_dataset.voting_year==year)\
            .all()
        
   
    states_list=[]
    voted_list=[]
    
    for state, total_voted in total_voted_by_origin  :
        states_list.append(state)
        voted_list.append(total_voted)
        
    origin_stats={
         'id': states_list,
         'voted': voted_list
     }
      

    return jsonify(origin_stats)
    
if __name__ == '__main__':
    app.run()
