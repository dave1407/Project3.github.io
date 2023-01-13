const baseUrl = 'http://localhost:5000/api/v1.0/voting_summary/';

var url = "";
var data = "";
var state_year =  "";
var state_selected = "Alabama";
var year_selected = "";
var years = ["2016", "2018"];
var age_id = [];
var race_id = [];
var sex_id = [];

function delay(time) {
   return new Promise(resolve => setTimeout(resolve, time));
 }

function dataUpdate(){
   year_selected = document.getElementById("selDataset").value;
   state_year =  state_selected + "/" + year_selected;
   url = new URL(state_year, baseUrl);
   data = d3.json(url);
   agebardisplay();
   racebardisplay();
   sexpiedisplay();
   panelupdate();
   delay(1000).then();
   window.localStorage.setItem('year_selected', year_selected);
   window.localStorage.setItem('state_selected', state_selected);
   console.log(age_id);
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
}

function agebardisplay() {
      return data.then(function (inspect) {
         age_id = inspect.age_stats.age_group;
         window.localStorage.setItem("age_id", JSON.stringify(age_id));
         let age_value = inspect.age_stats.voted;
 
            let dataplt = [{
               x: age_value,
               y: age_id,
               text: age_id,
               type: "bar",
               orientation: 'h'
            }];
   
            let layoutplt = {
               "yaxis": {
                  "type":"category"
               },
               // margin: {"t": 0, "b": 0, "l": 0, "r": 0}
               // height: 600,
               // width: 500,
            };

            Plotly.newPlot("age_bar", dataplt, layoutplt);
      });
}

function racebardisplay() {
   return data.then(function (inspect) {
      race_id = inspect.race_stats.origin_group;
      window.localStorage.setItem("race_id", JSON.stringify(race_id));
      let race_value = inspect.race_stats.voted;

         let dataplt = [{
            x: race_value,
            y: race_id,
            text: race_id,
            type: "bar",
            orientation: 'h'
         }];

         let layoutplt = {
            "yaxis": {
               "type":"category"
            },
            //margin: {"t": 0, "b": 0, "l": 0, "r": 0}
            // height: 600,
            // width: 500,
         };

         Plotly.newPlot("race_bar", dataplt, layoutplt);
   });
}

function sexpiedisplay() {
   return data.then(function (inspect) {
      sex_id = inspect.sex_stats.sex_group;
      window.localStorage.setItem("sex_id", JSON.stringify(sex_id));
      let sex_value = inspect.sex_stats.voted;

      var data = [{
         values: sex_value,
         labels: sex_id,
         type: 'pie',
         textinfo: 'label+percent',
         insidetextorientation: "radial",
         showlegend: false,
       }];
       
       var layout = {
          margin: {"t": 0, "b": 0, "l": 0, "r": 0},
         //  height: 300,
         //  width: 400
       };
       
       Plotly.newPlot('sex_pie', data, layout);
   });
}

function paneldisplay(subjectID) {
   let select = document.getElementById("state_total");
   return data.then(function (inspect) {

      let metadataKeys = inspect.total_stats.total_group;
      let metadataValue = inspect.total_stats.voted;

      for(let i = 0; i < metadataKeys.length; i++) {
         let el = document.createElement("p");
         el.textContent = `${metadataKeys[i]}: ${metadataValue[i]}`;
         select.append(el);
      }
   });
}

function panelupdate(){
   let sel = document.getElementById("state_total"); 
   while(sel.firstChild) {
         sel.removeChild(sel.firstChild);
   }
   paneldisplay();
}


dropdowndisplay();
dataUpdate();
paneldisplay();

 