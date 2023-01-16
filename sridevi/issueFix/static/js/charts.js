const baseUrl = 'http://localhost:5000/api/v1.0/voting_summary/';

var year_selected = window.localStorage.getItem('year_selected');
var state_selected = window.localStorage.getItem('state_selected');

var url = "";
var data = "";
var state_year =  "";
var years = ["2016", "2018"];
var age_id = [];
var race_id = [];
var sex_id = [];

function dataUpdate(){
   state_year =  state_selected + "/" + year_selected;
   url = new URL(state_year, baseUrl);
   data = d3.json(url);
   agebardisplay();
   racebardisplay();
   sexpiedisplay();
   panelupdate();
   window.localStorage.setItem('year_selected', year_selected);
   window.localStorage.setItem('state_selected', state_selected);
   document.getElementsByClassName('u-text-2')[0].innerText= year_selected + " " + state_selected + " " + "Graphic Analytics of Voter Census Data [In thousands]";
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
               margin: {"t": 0}
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
            x: race_id,
            y: race_value,
            text: race_id,
            type: "bar",
            orientation: 'v'
         }];

         let layoutplt = {
            "xaxis": {
               "type":"category"
            },
            margin: {"t": 0, "b": 100, "r": 120}
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
          margin: {"t": 0},
       };
       
       Plotly.newPlot('sex_pie', data, layout);
   });
}

function paneldisplay() {
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

dataUpdate();


 