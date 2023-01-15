# Voter Census Data Project
**_Brought to you by [David Mostacero](https://github.com/dave1407), [Madduri Sridevi](https://github.com/SrideviMadduri), [Nicoleta Cosereanu](),  [Jordon Moses](https://github.com/jm18443), and [Anger Gardy](https://github.com/gardy738)._**

## Project Summary
Elections are always such a hot and controversial topic. Candidate’s platforms usually try to target voters by demographic characteristics such as age group, sex and ethnic background. This project aims to create a platform that helps visualize those demographic characteristics by state from the 2016 senate elections and 2018 presidential elections, and determine whether or not demographic targeting really works.
<!-- An interactive display of voter’s census data across the United States for the senate elections from 2016 and presidential elections from 2018.<br><br> -->


<!-- ![screenshot](project/static/img/Website.png) -->

<!-- ## Background
Elections are always such a hot and controversial topic. Candidate’s platforms usually try to target voters by demographic characteristics such as age group, sex and ethnic background. This project aims to create a platform that helps visualize those demographic characteristics by state from the 2016 senate elections and 2018 presidential elections, and determine whether or not demographic targeting really works. -->

## Getting Started

1. Download the repo in your preferred manner.
2. Create a file called `config.py` in the `/project` folder. 
<br> This file should contain username , password and port for postgreSQL database as shown below:

        username ='insert your user_name' 
        password='insert your password'
        port='xxxx'

3. Create database Vote_data_db in  PostgreSQL database.
4. Open  project3_Voting_Data.ipynb file in  jupyter notebook and run the file.
5. Run `app.py` in your terminal by using the following command:
```
$ python app.py
```
6. Copy the local host url and paste it in your browser.

## Resources, Libraries, & Tools

**Data sources:**
* [Voting and registration data](https://data.world/uscensusbureau/voting-and-registration-data) for national & state data on voting trends

**Libraries:**
* [Leaflet](https://leafletjs.com/index.html), [Leaflet PointInPolygon](https://github.com/hayeswise/Leaflet.PointInPolygon), [Leaflet Heat Map](https://github.com/Leaflet/Leaflet.heat), [Leaflet US Choropleth](https://leafletjs.com/examples/choropleth/us-states.js), [Mapbox](https://docs.mapbox.com/api/maps/#styles) for mapping
* [Plotly for JavaScript](https://plotly.com/javascript/)
* [Bootstrap](https://getbootstrap.com/) for website grid system

**Tools & languages:** 
* JavaScript, HTML, CSS, Python Flask, Jupyter Notebook, PostgreSQL, Bootstrap

## Navigation
- On the home page, select the year you want to study. This year will be saved in your local cache memory and will be the year by which all other pages displayed are filtered.
Next you can click on any state from the interactive US map to go to the visualization page.

![screenshot](project/static/img/Website.png)

- The visualizations will display the number of voters in thousands by age, sex and race based on the year and state selected. A data card will also display total population of the state, total population registered to vote and total population who actually voted.

(Visualization page picture)

Clicking on any of the graphic visualization will open a new page that displays a heatmap of the respective subsection.

**Age Page**
- Select an age group to exhibit a US heatmap of the distribution of voters by the selected age group.

**Sex Page**
- Select sex  to exhibit a US heatmap of the distribution of voters by the selected sex group.

**Race Page**
- Select a race to exhibit a US heatmap of the distribution of voters by the selected race.

## Observations

- The most voters are in the 45 to 64 age group. Then next highest typically is the 65+ age group, but in certain states such as Colorado, the 25 to 34 and 35 to 44 age groups compete very closely with the 65+ age groups.

- Female voters surpass male voters overall and, in each state, individually.  In New Mexico, female voters are 10% more than male voters.
- Looking at a heat map of voters by race, we see that most Asian voters are concentrated in California while black voters are mostly in the south and east region of the US. Other races follow closely the population distribution by state

## Future Development

- Analyze if there is a correlation between the voter demographic data and the election results by state.
- Make the website more user friendly by allowing the user to select the year on each page to refresh the visuals accordingly.

<!-- ## Features
After running the Flask application, begin exploring the data by perusing the data by years using the drop down in the top right corner..

The map, barchart, piechart, and cards will reflect that change and show the data based on the year.

**Interactive Map** The map is interactive and will change based on where the mouse is hovering and by clicking on the states the data in the pie chart and bar charts will change.

**Bar Chart** can be viewed and toggled on the interactive map. State borders are also visible and hoverable. If a state is clicked, the bar chart will populate with that states data. By clicking the years bar chart the website will be navigated to a heat map that shows the density of voters by age using the selected drop down year. By clicking the ethnicity bar chart the website will be navigated to a heat map that shows the density of voters by ethnicity using the selected drop down year. 

**Pie Chart** can be viewed and toggled on the interactive map. State borders are also visible and hoverable. If a state is clicked, the bar chart will populate with that states data.  By clicking the pie chart the website will be navigated to a heat map that shows the density of voters by sex using the selected drop down year. 



## Analyses & Discussion
As a whole, our dashboard is equipped for you to draw numerous observations about interrelations among each of our featured sections. Given the vast amount of available trends, it is impractical to analyze every significant pattern. As such, we've only listed a handful of noteworthy examples of interrelations that we observed, but we encourage you all to go through the timeline and explore the data yourselves.

**Select analyses:**

* In all states, **women** vote more regularly in both 2016 and 2018.
* Moste voter were between the ages of **45-64**

## Future Considerations
Some tasks we'd like to build on in future commits:

*   -->
