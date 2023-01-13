# Project 3
**_Created by [David Mostacero](https://github.com/dave1407), [Madduri Sridevi](https://github.com/SrideviMadduri), [Nicoleta Cosereanu](),  [Jordon Moses](https://github.com/jm18443), & [Anger Gardy]()._**

An interactive website that looks ove voting data of 1016 and 2018 that helps to show us more about how voting will be in the future..<br><br>


![screenshot](project/static/img/Website.png)

## Background
We researched datasets that would help us track voting trends among ethnicity, sex, and age. We found data that tracked the voting habits of voters in the years of 2016 and 2018. 2016 being the year of the presidential election and 2018 being the year of senate and house of representative elections.

## Getting Started
_If you prefer to run the dashboard on your local server, please follow the instructions below. Otherwise, you can view the deployed page [here](http://apizzo1-hindsight-2020.herokuapp.com/)._

1. Download the repo in your preferred manner.
2. Create a file called `config.py` in the `/project` folder. 
<br> This file should contain username , password and port for postgress database.
3. Create database Vote_data_db in  PostgreSQL database.
4. Open  project3_Voting_Data.ipynb file in  jupyter notebook and run the file.
5. Run `app.py` in your terminal by using the following command:
```
$ python app.py
```

## Resources, Libraries, & Tools

**Data sources:**
* [Voting and registration data](https://data.world/uscensusbureau/voting-and-registration-data) for national & state data on voting trends

**Libraries:**
* [Leaflet](https://leafletjs.com/index.html), [Leaflet PointInPolygon](https://github.com/hayeswise/Leaflet.PointInPolygon), [Leaflet Heat Map](https://github.com/Leaflet/Leaflet.heat), [Leaflet US Choropleth](https://leafletjs.com/examples/choropleth/us-states.js), [Mapbox](https://docs.mapbox.com/api/maps/#styles) for mapping
* [Plotly for JavaScript](https://plotly.com/javascript/)
* [Bootstrap](https://getbootstrap.com/) for website grid system

**Tools & languages:** JavaScript, HTML, CSS, Python Flask, Jupyter Notebook, PostgreSQL, Bootstrap

## Features
After running the Flask application, begin exploring the data by dragging the timeline slider and selecting a date at the upper-right corner of the page. This slider will continue to be available at the top of the page even after scrolling down. Below, you should see the visualizations respond.

The image at the top of the page and the headline will reflect the **New York Times front page article**. More images are available in a five-image **Getty Images slideshow** that changes based on the month of the selected date.

**Presidential approval and disapproval ratings** are fully visible and interactive, and the selected date is emphasized.

**Ongoing wildfires, contained wildfires, and protests** can be viewed and toggled on the interactive map. State borders are also visible and hoverable. If a state is clicked, the panel next to it will populate **state-specific information** on COVID-19 growth, unemployment, and baseline changes in mobility, all specific to the selected date. A table below the map will display the total contained/active fires and total protests on the selected date, both nationally as well as for the selected state. *Note*: the map may require additional loading time.

**National COVID-19 data** can be viewed by daily case increases or total cases and deaths up to the selected date. The mixed bar/line graph can be hovered over for details.

**National average change in mobility** is displayed in a polar area chart. The radial axis corresponds to the factor of increase in activity from baseline measurements in January/February 2020. For example, a  section with a radial value of _0.7_ represents a _70% increase_ in activity, while a value of _0_ represents _no change_ in activity.

**Select stock prices** are displayed in a line graph with the selected date highlighted, where they can be compared with up to two other stocks via dropdown menus.

Finally, **national unemployment rates** are displayed by month. The national average is shown first. Other demographic comparisons can be toggled via the legend below.

## Analyses & Discussion
As a whole, our dashboard is equipped for you to draw numerous observations about interrelations among each of our featured sections. Given the vast amount of available trends, it is impractical to analyze every significant pattern. As such, we've only listed a handful of noteworthy examples of interrelations that we observed, but we encourage you all to go through the timeline and explore the data yourselves.

**Select analyses:**

* On **March 4**, the NYT headline discusses the limitation of U.S. travel to Europe, while we can also see that the stocks for Boeing, Delta Airlines, & Southwest Airlines (all aviation-related) begin to sharply decrease. A slight recovery in these stocks can be observed on **March 22**, while the NYT headline contains the announcement of a federal bond-buying plan.
* The coronavirus stimilus relief bill was passed on **March 12** as indicated by the NYT headline, which among other things, distributed $1,200 to all American citizens. This date correlates with a peak in President Trump's approval rating.
* On **April 12**, the NYT headline highlights Governor Andrew Cuomo of New York announcing that "the worst is over", referring to COVID-19 in his state. His statement does correlate with the beginning of a continuing downward trend of COVID cases in New York, as well as the downward trend of the first peak in U.S. cases. Later, towards **July 15**, we can see that the U.S. COVID cases reach a much higher second peak in growth, while NY has no discernible peak in its sparkline at that time.
* The impact of the events in the **May 28** NYT headline, "Ex-Officer Charged in Death of George Floyd in Minneapolis", can be seen in the map when viewing the protests on that day, specifically in Minnesota. On dates & states with higher volumes of protests, we can also see a higher increase in park mobility, confirming consistency in our data.
* **September 1** shows an increase in President Trump's approval rating, just as the CDC promises a COVID vaccine by November 2020, as seen in the NYT headline.

## Future Considerations
Some tasks we'd like to build on in future commits:
* Making a loading screen for better transition when data is loading
* Incorporating animation using anime.js
* Optimizing SQL databases to integrate data more effectively and to pull data more efficiently
* Incorporating media queries to make the dashboard responsive to different screen sizes
* Allowing the user to select how to view the national unemployment data 
* Finding more quantifiable/manageable data for tags trending online, air pollution (to add to our map), hate crimes, & other possibly interesting analyses
* Broadening our scope of observation by allowing users to select a range of dates (rather than a single date), & exploring global data 
