import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
from datetime import datetime
from dateutil.relativedelta import relativedelta 
from config import username ,password , port  

from flask import Flask, render_template, jsonify
from flask.ext.cors import CORS, cross_origin


#################################################
# Database Setup
#################################################

#engine = create_engine("sqlite:///../Resources/hawaii.sqlite")
engine = create_engine(f'postgresql://{username}:{password}@localhost:{port}/Vote_data_db')

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(engine, reflect=True)

print(Base.classes.keys())
# Save reference to the table
age_dataset = Base.classes.age_dataset
sex_race_dataset = Base.classes.sex_race_dataset


#################################################
# Flask Setup
#################################################
app = Flask(__name__)


#################################################
# Flask Routes
#################################################
@app.route("/", methods=["GET", 'POST'])
def index():
    return render_template('index.html')

# def welcome():    
    
#     """List all available api routes."""
#     return (
#         f"Available Routes:<br/>"
#         f"/api/v1.0/voting_summary/state/year<br/>"
#         f"state: full name in capital letters of any US state<br/>"
#         f"year: 2016, 2018<br/>"

#     )

 
@app.route("/api/v1.0/voting_summary/<state>/<year>", methods=["GET", 'POST'])

def voting_summary(state, year):
    

    # Create our session (link) from Python to the DB
    states=[]

    
    voting_summary={}
    
    # sex_stats['Male'] = 25
    # sex_stats['Female'] = 23
    
    race_stats = {}
    race_stats['White alone'] = 100
    race_stats['Black alone'] = 80
    race_stats['Asian alone'] = 40
    
    
    # voting_summary['sex_stats'] = sex_stats
    # voting_summary['race_stats'] = race_stats
    
    with Session(engine) as session:
        """ Convert the query results to a dictionary using `date` as the key and `prcp` as the value.
        Return the JSON representation of your dictionary."""      
        # Query all Measurement
        age_results_by_age =  session.query(age_dataset.age, age_dataset.total_voted,)\
            .filter(age_dataset.age!='Total',age_dataset.state==state, age_dataset.voting_year==year)\
            .all()
        
    # Create a dictionary from the row data and append to a list of  all_date_percp
    
    age_stats={}
    for age, total_voted in age_results_by_age:
        age_stats[age] = total_voted 

    voting_summary['age_stats'] = age_stats
    
    age_results_by_total =  session.query(age_dataset.total_population, age_dataset.total_registered, age_dataset.total_voted,)\
            .filter(age_dataset.age=='Total', age_dataset.state==state, age_dataset.voting_year==year)\
            .all()
    print('**************************') 
    print(age_results_by_total)
            
    total_stats = {'total_population':age_results_by_total[0][0],\
                   'total_registered':age_results_by_total[0][1],\
                    'total_voted':age_results_by_total[0][2]}
        
    voting_summary['total_stats'] = total_stats
            
    # print(age_results_by_total)
    
    sex_race_results_by_sex =  session.query(sex_race_dataset.sex_race_hispanic_origin, sex_race_dataset.total_voted,)\
            .filter(sex_race_dataset.sex_race_hispanic_origin.in_(('Male','Total','Female')) ,sex_race_dataset.state==state, sex_race_dataset.voting_year==year)\
            .all()
            
    sex_stats={}
    
    for sex_race_hispanic_origin , total_voted in sex_race_results_by_sex:
     sex_stats[sex_race_hispanic_origin] = total_voted 
    
    
     voting_summary['sex_stats'] = sex_stats
    
     print('**************************') 
     print(sex_race_results_by_sex)
     print('**************************') 
    
    response = jsonify(voting_summary)
    # Enable Access-Control-Allow-Origin
    response.headers.add("Access-Control-Allow-Origin", "*")

    return response

if __name__ == '__main__':
    app.run(debug=True)
