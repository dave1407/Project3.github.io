const baseUrl = 'http://localhost:5000/api/v1.0/voted_origin/';

var year_selected = window.localStorage.getItem('year_selected');
var state_selected = window.localStorage.getItem('state_selected');
var race_id = JSON.parse(localStorage.getItem("race_id"));

var url = "";
var data = "";
var year_race = "";

function dataUpdate(){
   let race_selected = document.getElementById("selDataset").value;
   year_race =  year_selected + "/" + race_selected;
   url = new URL(year_race, baseUrl);
   data = d3.json(url);
   console.log(data)
   data.then(heatmap);
}

function dropdowndisplay() {
   let select = document.getElementById("selDataset");
   for(let i = 0; i < race_id.length; i++) {
      let opt = race_id[i];
      let el = document.createElement("option");
      el.textContent = opt;
      el.value = opt;
      select.appendChild(el);
   }
}

function heatmap(race_data){
   console.log(race_data);
   google.charts.load('current', {
      'packages':['geochart'],
    });
    google.charts.setOnLoadCallback(drawRegionsMap);

    voted_by_state=[]
    voted_by_state.push(['State','Voted']);

    race_data.id.map((val, index) => {if(val!=='US') voted_by_state.push([val, race_data.voted[index]])});

   
    function drawRegionsMap() {
      var data = google.visualization.arrayToDataTable(voted_by_state);
   
      var options = {
        region: 'US',
        displayMode: 'regions',
        resolution: 'provinces'
      };
   
      var chart = new google.visualization.GeoChart(document.getElementById('chartdiv'));
   
      chart.draw(data, options);
    }
    
}
dropdowndisplay();
dataUpdate();

 