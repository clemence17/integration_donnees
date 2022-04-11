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
//lecture de fichier selon le departement
const csv = require('csv-parser');

app.get('/read/:dep',function(request,response){

response.write('<html><head></head><body><table><thead><tr><th> Date</th><th>Departement</th><th>Reanimation</th><th>Hospitalisation</th></tr></thead>');
fs.createReadStream('data.csv')
  .pipe(csv())
  .on('data', (row) => {
  if (row.lib_dep==request.params.dep){
  response.write('<tr><td>'+row.date+'</td><td>'+row.lib_dep+'</td><td>'+row.rea+'</td><td>'+row.hosp+'</td></tr>');
  
}
})
  response.write('</body></html>');
  
});}
