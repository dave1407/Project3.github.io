const baseUrl = 'http://localhost:5000/api/v1.0/voting_summary/';

var url = "";
var data = "";
var state_year =  "";
var state_selected = "";
var year_selected = "";
var years = ["2016", "2018"];
var ages_list=[];


function dataUpdate(){
   year_selected = document.getElementById("selDataset").value;
   window.localStorage.setItem('year_selected', year_selected);
   state_year =  state_selected + "/" + year_selected;
   url = new URL(state_year, baseUrl);
   data = d3.json(url);
   dataAges()
}

function dataAges(){
   return data.then(function (inspect) {
      let ages = inspect.age_stats;
      let first = ages[0];
      console.log(first);
      // return Promise.resolve(ages_list);
   });
}

function dataKeyRead(key, subkey, index){
   return data.then(function (inspect) {
      let keyresp = inspect[key];   
      let subkeyresp = keyresp.map(function(key_read) {
         return key_read[subkey];
      });
      let ind_resp = subkeyresp[index]
      return Promise.resolve(ind_resp);
   });
}

function getSample(sampleID){
   let sample_values = dataKeyRead("samples", "sample_values", sampleID);
   let otu_ids = dataKeyRead("samples", "otu_ids", sampleID);
   let otu_labels = dataKeyRead("samples","otu_labels", sampleID);
   return { sample_values, otu_ids, otu_labels };
}

function getMetadata(metadataID){
   let id = dataKeyRead("metadata", "id", metadataID);
   let ethnicity = dataKeyRead("metadata", "ethnicity", metadataID);
   let gender = dataKeyRead("metadata","gender", metadataID);
   let age = dataKeyRead("metadata", "age", metadataID);
   let location = dataKeyRead("metadata", "location", metadataID);
   let bbtype = dataKeyRead("metadata","bbtype", metadataID);
   let wfreq = dataKeyRead("metadata", "wfreq", metadataID);

   return { id, ethnicity, gender, age, location, bbtype, wfreq };
}

function initdropdown() {
   let select = document.getElementById("selDataset");
   for(let i = 0; i < years.length; i++) {
      let opt = years[i];
      let el = document.createElement("option");
      el.textContent = opt;
      el.value = opt;
      select.appendChild(el);
}
}

function bardisplay(subjectID) {
   let sampleUpdate = getSample(subjectID);
   sampleUpdate.sample_values.then(function(sample_values){
      sampleUpdate.otu_ids.then(function(otu_ids){
         sampleUpdate.otu_labels.then(function(otu_labels){

            let top10otu_ids = otu_ids.slice(0, 10);
            let top10otu_idsrev = top10otu_ids.reverse();
            let top10sample_values = sample_values.slice(0, 10);     
            let top10sample_valuesrev = top10sample_values.reverse();
            let top10pltotu_labels = otu_labels.slice(0, 10);
            let top10pltotu_labelsrev = top10pltotu_labels.reverse();
            let top10otu_idsrevformatted = top10otu_idsrev.map(x => `OTU ${x}`);

            let dataplt = [{
               x: top10sample_valuesrev,
               y: top10otu_idsrevformatted,
               text: top10pltotu_labelsrev,
               type: "bar",
               orientation: 'h'
            }];
   
            let layoutplt = {
               "yaxis": {
                  "type":"category"
               },
               height: 600,
               width: 500,
            };

            Plotly.newPlot("bar", dataplt, layoutplt);

         });
      });  
    });
}

  
function bubbledisplay(subjectID) {
   let sampleUpdate = getSample(subjectID);
   sampleUpdate.sample_values.then(function(sample_values){
      sampleUpdate.otu_ids.then(function(otu_ids){
         sampleUpdate.otu_labels.then(function(otu_labels){

         let trace1 = {
            x: otu_ids,
            y: sample_values,
            text: otu_labels,
            mode: 'markers',
            marker: {
               size: sample_values,
               color: otu_ids
            }
            };

         let dataplt = [trace1];
         
         let layoutplt = {
            showlegend: false,
            height: 600,
            width: 1200,
            xaxis: {
               title: {
                 text: 'OTU ID',
               },
             },
         };

         Plotly.newPlot("bubble", dataplt, layoutplt);

         });
      });  
   });
}

function gaugedisplay(subjectID) {
   let metadataUpdate = getMetadata(subjectID);

   metadataUpdate.wfreq.then(function(metadata){

   var data = [
      {
      domain: { x: [0, 1], y: [0, 1] },
      value: metadata,
      title: {
         text: `Belly Button Washing Frequency<br>Scrubs per Week`,
         font: {
            family:"Arial",
            size:15,
            color:'#000000'
         }
      },
      type: "indicator",
      mode: "gauge+number",
      // delta: { reference: 400 },
      gauge: { axis: { range: [null, 9] } }
      }
   ];
   
   var layout = { width: 300, height: 400 };
   Plotly.newPlot('gauge', data, layout);

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
   // panelupdate(subjectID);
   // bardisplay(subjectID);
   // bubbledisplay(subjectID);
   // gaugedisplay(subjectID);
}



 
initdropdown();
// gaugedisplay(ID);
// bardisplay(ID);
// bubbledisplay(ID);
// paneldisplay(ID);

 