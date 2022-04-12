var req = require("request-promise"),
cheerio = require("cheerio"),
fs = require("fs"),
json2csv = require("json2csv").Parser;

// page wikipedia 
const wiki = "https://fr.wikipedia.org/wiki/Coronavirus";

(async () => {
const response = await req({
    uri: wiki,
    headers: {
        accept:
            "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
        "accept-encoding": "gzip, deflate, br",
        "accept-language": "en-US,en;q=0.9"
    },
    gzip: true,
}).then(function (html) {


    let $ = cheerio.load(html);
    let donnees = [];
    let donnees2 = [];
    let name, rank, cols, col;

    let rows = $('table.wikitable tbody tr').each((idx, elem) => {
        rank =$(elem).find('th').text().replace(/[\n\r]+/g,'');
        //name = $(elem).find('td a').html();
        donnees2 = [];
        cols = $(elem).find('td').each((colidx, colelem) => {
            col = $(colelem).text().replace(/[\n\r]+/g,'');
            donnees2.push(col,);    
        }); 

        donnees.push({
            rank,
            ...donnees2,
        });
    });

    // exporting to csv
    const j2cp = new json2csv()
    const csv = j2cp.parse(donnees);

    fs.writeFileSync("./wiki.csv", csv, "utf-8");
}).catch(function (err) {
    console.log(err);
});

}
)();