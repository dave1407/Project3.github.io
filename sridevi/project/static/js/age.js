const baseUrl = 'http://localhost:5000/api/v1.0/voted_age/';

var year_selected = window.localStorage.getItem('year_selected');
var state_selected = window.localStorage.getItem('state_selected');
var age_id = JSON.parse(localStorage.getItem("age_id"));

var url = "";
var data = "";
var year_age =  "";

// invoked upon selection of age group
function dataUpdate(){
   let age_selected = document.getElementById("selDataset").value;
   year_age =  year_selected + "/" + age_selected;
   url = new URL(year_age, baseUrl);
   data = d3.json(url);
   console.log(data);
   data.then(heatmap);
}


function dropdowndisplay() {
   let select = document.getElementById("selDataset");
   for(let i = 0; i < age_id.length; i++) {
      let opt = age_id[i];
      let el = document.createElement("option");
      el.textContent = opt;
      el.value = opt;
      select.appendChild(el);
   }
}

dropdowndisplay();
dataUpdate();

function heatmap(age_data){
   console.log(age_data);
   google.charts.load('current', {
      'packages':['geochart'],
    });
    google.charts.setOnLoadCallback(drawRegionsMap);

    voted_by_state=[]
    voted_by_state.push(['State','Voted']);

    age_data.id.map((val, index) => voted_by_state.push([val, age_data.voted[index]]));

   
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
