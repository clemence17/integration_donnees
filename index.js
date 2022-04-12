"use strict";

const express= require('express');
const app = express();
const PORT = process.env.PORT || 3000;


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
