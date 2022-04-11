
const fetch = require("node-fetch");

// function to get the raw data
const getRawData = (URL) => {
   return fetch(URL)
      .then((response) => response.text())
      .then((data) => {
         return data;
      });
};

// URL for data
const URL = "https://fr.wikipedia.org/wiki/Coronavirus";

// start of the program
const List_raw_page = async () => {
   const Data_wiki = await getRawData(URL);
   console.log(Data_wiki);
};

// invoking the main function
List_raw_page();