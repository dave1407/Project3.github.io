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
   dataUpdate();
}


dropdowndisplay();
dataUpdate();

 