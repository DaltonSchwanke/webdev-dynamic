import * as fs from 'node:fs';
import * as path from 'node:path';
import * as url from 'node:url';

import { default as express } from 'express';
import { default as sqlite3 } from 'sqlite3';

const port = 3000;
const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const root = path.join(__dirname, 'public');
const template = path.join(__dirname, 'templates');

let app = express();
app.use(express.static(root));

let option1 = "";
let option2 = "";
let yearIndex = 0;
let regionIndex = 0;
let yearSize = 0;
let regionsSize = 6;
let years = ['2000', '2001', '2002', '2003', '2004', '2005', '2006', '2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023'];
let regions = ['Europe', 'North America', 'Latin America', 'Asia', 'Pacific', 'Africa'];


//need to change the database file name
const db = new sqlite3.Database(path.join(__dirname, 'cereal.sqlite3'), sqlite3.OPEN_READONLY, (err) => {
    if (err) {
        console.log('Error connecting to database');
    }
    else {
        console.log('Successfully connected to database');
    }
});



//Button Functions for years
function incrementYear(){
  if(yearIndex == yearSize - 1){yearIndex = 0;}
  else{yearIndex += 1;}
}
function decrementYear(){
  if(yearIndex == 0){yearIndex = size - 1;}
  else{yearIndex -= 1;}
}



//Button function for Regions
function previousRegion(){
  if(regionIndex == 0){regionIndex = size -1;}
  else{regionIndex -= 1;}
}
function nextRegion(){
  if(regionIndex == size - 1){regionIndex = 0;}
  else{regionIndex += 1;}
}



//function for getting selector option
function getOption1(){
  option1 = document.getElementById("dropdown1").value;
}
//function for getting selector option
function getOption2(){
  option2 = document.getElementById("dropdown2").value;
}

  










// Doesn't need to be changed
app.listen(port, () => {
    console.log('Now listening on port ' + port);
});
