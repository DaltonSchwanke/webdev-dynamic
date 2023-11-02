import * as path from 'node:path';
import * as url from 'node:url';

import { default as express } from 'express';
import { default as sqlite3 } from 'sqlite3';

const port = 8000;
const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const root = path.join(__dirname, 'templates');
const template = path.join(__dirname, 'templates');

let app = express();
app.use(express.static(root));



/*
const db = new sqlite3.Database(path.join(__dirname, 'data.sqlite3'), sqlite3.OPEN_READONLY, (err) => {
    if (err) {
        console.log('Error connecting to database');
    }
    else {
        console.log('Successfully connected to database');
    }
});


function dbSelect(query, params) {
    let p = new Promise((resolve, reject) => {
        db.all(query, params, (err, rows) => {
            if(err){
                reject(err);
            }
            else{
                resolve(rows);
            }
        });
    });
    return p;
}


app.get('/:name', (req, res) => {
    let manufacturer = req.params.name.toUpperCase();
    console.log(manufacturer);

    let query1 = 'SELECT * FROM Cereals WHERE mfr = ?';
    let query2 = 'SELECT * FROM Manufacturers WHERE id = ?';
    let p1 = dbSelect(query1, [manufacturer]);
    let p2 = dbSelect(query2, [manufacturer]);
    Promise.all([p1, p2]).then((results) => {
        let response = results[2].replace('$$MFR_NAME$$', results[1][0].name);
        let table_body = '';
        results[0].forEach((cereal) => {
            let table_row = '<tr>';
            table_row += '<td>' + cereal.name + '</td>';
            table_row += '<td>' + cereal.type + '</td>';
            table_row += '<td>' + cereal.calories + '</td>';
            table_row += '<td>' + cereal.fat + '</td>';
            table_row += '<td>' + cereal.protein + '</td>';
            table_row += '<td>' + cereal.carbohydrates + '</td>';
            table_row += '</tr>\n';
            table_body += table_row;
        });
    }).catch((error) => {
        res.status(404).type('txt').send("File Not Found");
    })
});
*/

app.listen(port, () => {
    console.log('Now listening on port ' + port);
});