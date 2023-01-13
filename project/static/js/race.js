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

dropdowndisplay();
dataUpdate();

 