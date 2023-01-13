const baseUrl = 'http://localhost:5000/api/v1.0/voted_sex/';

var year_selected = window.localStorage.getItem('year_selected');
var state_selected = window.localStorage.getItem('state_selected');
var sex_id = JSON.parse(localStorage.getItem("sex_id"));

var url = "";
var data = "";
var year_sex = "";

function dataUpdate(){
   let sex_selected = document.getElementById("selDataset").value;
   year_sex =  year_selected + "/" + sex_selected;
   url = new URL(year_sex, baseUrl);
   data = d3.json(url);
   console.log(data)
}

function dropdowndisplay() {
   let select = document.getElementById("selDataset");
   for(let i = 0; i < sex_id.length; i++) {
      let opt = sex_id[i];
      let el = document.createElement("option");
      el.textContent = opt;
      el.value = opt;
      select.appendChild(el);
   }
}

dropdowndisplay();
dataUpdate();

 