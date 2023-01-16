const baseUrl = 'http://localhost:5000/api/v1.0/voted_sex/';

var year_selected = window.localStorage.getItem('year_selected');
var state_selected = window.localStorage.getItem('state_selected');
var sex_id = JSON.parse(localStorage.getItem("sex_id"));
var years = JSON.parse(localStorage.getItem("years"));

var url = "";
var data = "";
var year_sex =  "";

document.getElementsByClassName('u-text-2')[0].innerText= "Data displayed for year" + " " + year_selected;

// invoked upon selection of sex group
function dataUpdate(){
   let sex_selected = document.getElementById("selDatagroup").value;
   year_selected = document.getElementById("selDatayears").value;
   window.localStorage.setItem('year_selected', year_selected);
   year_sex =  year_selected + "/" + sex_selected;
   url = new URL(year_sex, baseUrl);
   data = d3.json(url);
   data.then(heatmap);
}


function dropdownyears() {
   let select = document.getElementById("selDatayears");
   for(let i = 0; i < years.length; i++) {
      let opt = years[i];
      let el = document.createElement("option");
      el.textContent = opt;
      el.value = opt;
      select.appendChild(el);
   }
   document.getElementById("selDatayears").value= year_selected;
}

function dropdowngroup() {
   let select = document.getElementById("selDatagroup");
   for(let i = 0; i < sex_id.length; i++) {
      let opt = sex_id[i];
      let el = document.createElement("option");
      el.textContent = opt;
      el.value = opt;
      select.appendChild(el);
   }
}

function heatmap(sex_data){
   console.log(sex_data);
   google.charts.load('current', {
      'packages':['geochart'],
    });
    google.charts.setOnLoadCallback(drawRegionsMap);

    voted_by_state=[]
    voted_by_state.push(['State','Voted']);

    sex_data.id.map((val, index) => {if(val!=='US') voted_by_state.push([val, sex_data.voted[index]])});

   
    function drawRegionsMap() {
      var data = google.visualization.arrayToDataTable(voted_by_state);
   
      var options = {
        region: 'US',
        displayMode: 'regions',
        resolution: 'provinces',
        keepAspectRatio: true,
      };
   
      var chart = new google.visualization.GeoChart(document.getElementById('chartdiv'));
   
      chart.draw(data, options);
    }
}

dropdownyears();
dropdowngroup();
dataUpdate();