const baseUrl = 'http://localhost:5000/api/v1.0/voting_summary/';

var url = "";
var data = "";
var state_year =  "";
var state_selected = "Alabama";
var year_selected = "";
var years = ["2016", "2018"];

function dataUpdate(){
   year_selected = document.getElementById("selDataset").value;
   window.localStorage.setItem('year_selected', year_selected);
   state_year =  state_selected + "/" + year_selected;
   url = new URL(state_year, baseUrl);
   data = d3.json(url);
   agebardisplay();
   racebardisplay();
   sexpiedisplay();
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
   year_selected = document.getElementById("selDataset").value;
   window.localStorage.setItem('year_selected', year_selected);
}

function agebardisplay() {
      return data.then(function (inspect) {
         let age_id = inspect.age_stats.age_group;
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
               margin: {"t": 0, "b": 0, "l": 0, "r": 0}
               // height: 600,
               // width: 500,
            };

            Plotly.newPlot("age_bar", dataplt, layoutplt);
      });
}

function racebardisplay() {
   return data.then(function (inspect) {
      let race_id = inspect.race_stats.origin_group;
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
            margin: {"t": 0, "b": 0, "l": 0, "r": 0}
            // height: 600,
            // width: 500,
         };

         Plotly.newPlot("race_bar", dataplt, layoutplt);
   });
}

function sexpiedisplay() {
   return data.then(function (inspect) {
      let sex_id = inspect.sex_stats.sex_group;
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
   let select = document.getElementById("sample-metadata");
   let metadataUpdate = getMetadata(subjectID);
   let metadataKeys = Object.keys(metadataUpdate);

   for(let i = 0; i < metadataKeys.length; i++) {
      var key = metadataKeys[i]
      metadataUpdate[key].then(function(metadata){
         let el = document.createElement("p");
         el.textContent = `${metadataKeys[i]}:${metadata}`;
         select.append(el);
      });
   }

}

function panelupdate(subjectID){
   let sel = document.getElementById("sample-metadata"); 
   while(sel.firstChild) {
         sel.removeChild(sel.firstChild);
   }
   paneldisplay(subjectID);
}


function optionChanged(){
   year_selected = document.getElementById("selDataset").value;
   window.localStorage.setItem('year_selected', year_selected);
   dataUpdate();
}


dropdowndisplay();
dataUpdate();

 