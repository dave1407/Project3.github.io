const baseUrl = 'http://localhost:5000/api/v1.0/voted_age/';

var year_selected = window.localStorage.getItem('year_selected');
var state_selected = window.localStorage.getItem('state_selected');
var age_id = JSON.parse(localStorage.getItem("age_id"));

var url = "";
var data = "";
var year_age =  "";


function dataUpdate(){
   let age_selected = document.getElementById("selDataset").value;
   year_age =  year_selected + "/" + age_selected;
   url = new URL(year_age, baseUrl);
   data = d3.json(url);
   console.log(data)
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

 