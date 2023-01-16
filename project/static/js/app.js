var state_year =  "";
var state_selected = "Alabama";
var year_selected = "";
var years = ["2016", "2018"];




function dataUpdate(){
   year_selected = document.getElementById("selDataset").value;
   window.localStorage.setItem('year_selected', year_selected);
   window.localStorage.setItem('state_selected', state_selected);
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



 