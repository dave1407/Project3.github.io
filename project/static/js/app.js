const baseUrl = 'http://localhost:5000/api/v1.0/voting_summary/';

var state_year =  "";
var state_selected = "Alabama";
var year_selected = "";
var years = ["2016", "2018"];

function dataUpdate(){
   year_selected = document.getElementById("selDataset").value;
   dataAgeGroup();
   dataSexGroup(); 
   dataRaceGroup(); 
   window.localStorage.setItem('year_selected', year_selected);
   window.localStorage.setItem('state_selected', state_selected);
}

function dataAgeGroup(){
   state_year =  state_selected + "/" + year_selected;
   url = new URL(state_year, baseUrl);
   data = d3.json(url);
   
   return data.then(function (inspect) {
   age_id = inspect.age_stats.age_group;
   window.localStorage.setItem("age_id", JSON.stringify(age_id));
   });
} 

function dataSexGroup(){
   state_year =  state_selected + "/" + year_selected;
   url = new URL(state_year, baseUrl);
   data = d3.json(url);
   
   return data.then(function (inspect) {
   sex_id = inspect.sex_stats.sex_group;
   window.localStorage.setItem("sex_id", JSON.stringify(sex_id));
   });
}

function dataRaceGroup(){
   state_year =  state_selected + "/" + year_selected;
   url = new URL(state_year, baseUrl);
   data = d3.json(url);
   
   return data.then(function (inspect) {
   race_id = inspect.race_stats.origin_group;
   window.localStorage.setItem("race_id", JSON.stringify(race_id));
   });
} 

function dropdowndisplay() {
   let select = document.getElementById("selDataset");
   for(let i = 0; i < years.length; i++) {
      let opt = years[i];
      let el = document.createElement("option");
      el.textContent = opt;
      el.value = opt;
      select.appendChild(el);
   }
   window.localStorage.setItem("years", JSON.stringify(years));
}


dropdowndisplay();
dataUpdate();



 