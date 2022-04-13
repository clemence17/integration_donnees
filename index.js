"use strict";

const express= require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const httprequest = require('request');
app.use(express.json())
app.get('/', function(request, response){
    response.send('Intégration de données connectées');
})

app.get('/nom/:name', function(request, response){
    var age = ''+request.query.age;
    response.send('bienvenue '+ request.params.name+' tu as '+age);
})

app.listen(PORT, function(){
    console.log('Hello :'+ PORT);
}) 

/*
// Create the uploade csv view on the url uploadFile.html
app.get('/upload', function(request, response) {
    response.render('uploadFile.html');
});


// Give URL for getting a request
app.post('/uploadCsv', uploadFileController.uploadCsv);

// Create the function for apload
var fs = require("fs");
module.exports.uploadCsv = function(req, res) {
            var today = new Date();
            var date = today.getDate();
            var tempPath = req.files.file.path,
            targetPath = path.resolve('./uploads/'+req.files.file.originalFilename);
            if (path.extname(req.files.file.name).toLowerCase() === '.csv') {
                 fs.rename(tempPath, './uploads/csv_1', function(err) {
                        if (err) throw err;
                        console.log("Upload completed!");
            });
};
*/
//lecture de fichier selon le pays
const csv = require('csv-parser');
var fs = require("fs");


app.get('/read/:pays',function(request,response){
response.write('<html><head></head><body><table><thead><tr><th> Date</th><th>Pays</th><th>Infection</th><th>Deces</th><th>Guerisons</th><th>TauxDeces</th><th>TauxGuerison</th><th>TauxInfection</th></tr></thead>');
fs.createReadStream('data.csv')
  .pipe(csv())
  .on('data', (row) => {
  if (row.Pays==request.params.pays){
  response.write('<tr><td>'+row.Date+'</td><td>'+row.Pays+'</td><td>'+row.Infections+'</td><td>'+row.Deces+'</td><td>'+row.Guerisons+'</td><td>'+row.TauxDeces+'</td><td>'+row.TauxGuerison+'</td><td>'+row.TauxInfection+'</td></tr>');
  
}
})
  response.write('</body></html>');
  
});





app.get('/listePays',function(request,response){
var value = [];
var test='row.'
 var test2=test+request.params.col
   console.log(test2);
//recup les headers
response.write('<p>');
fs.createReadStream('data.csv')
  .pipe(csv())
  .on('data', (row) => {
    if(value.includes(row.Pays)==false){
      //console.log(row[request.params.col]);
  value.push(row.Pays);
  response.write('<li><a href=/read/'+row.Pays+'>'+row.Pays+'</a></li>');
    //console.log(value.length);
    }

  })
  response.write('</p>');

  })



app.get('/csvToJson', function(request, response){
let csvToJson = require('convert-csv-to-json');

let fileInputName = 'data.csv'; 
let fileOutputName = 'datajson.json';
csvToJson.generateJsonFileFromCsv(fileInputName,fileOutputName);

fs.readFile('datajson.json', 'utf8', (error, data) => {
     if(error){
        console.log(error);
        return;
     }
     response.json(JSON.parse(data));
     //console.log(JSON.parse(data));

})


})




///////////////////////////:PARTIE RECUP API

app.get('/COVID', function(request, response){

	var options = {
	  'method': 'GET',
	  'url': 'https://api.covid19api.com/summary',
	  'headers': {
	  }
	};
	httprequest(options, function (error, httpresponse) {
		
		// Checking for errors
		if (error) throw error; 
		response.status(200).json(JSON.parse(httpresponse.body));
	});

})


