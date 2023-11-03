import * as path from 'node:path';
import * as fs from 'node:fs';
import * as url from 'node:url';
import { default as express } from 'express';
import { default as sqlite3 } from 'sqlite3';

const port = 8088;
const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const root = path.join(__dirname, 'public');
const templates = path.join(__dirname, 'templates');

const app = express();
app.use(express.static(root));

const db = new sqlite3.Database(path.join(__dirname, 'data.sqlite3'), sqlite3.OPEN_READONLY, (err) => {
    if (err) {
        console.log('Error connecting to the database');
    } else {
        console.log('Successfully connected to the database');
    }
});

function dbSelect(query, params) {
    return new Promise((resolve, reject) => {
        db.all(query, params, (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
}

app.get('', (req, res) => {
    fs.promises.readFile(path.join(templates, 'index.html'), 'utf-8').then((template) => {
        res.status(200).type('html').send(template);
    }).catch((err) => {
        res.status(404).type('txt').send('File Not Found');
    });
});


app.get('/index.html', (req, res) => {
    fs.promises.readFile(path.join(templates, 'index.html'), 'utf-8').then((template) => {
        res.status(200).type('html').send(template);
    }).catch((err) => {
        res.status(404).type('txt').send('File Not Found');
    });
});

app.get('/temp1.html', (req, res) => {
    fs.promises.readFile(path.join(templates, 'temp1.html'), 'utf-8').then((template) => {
        res.status(200).type('html').send(template);
    }).catch((err) => {
        res.status(404).type('txt').send('File Not Found');
    });
});

app.get('/temp2.html/:reg1/:reg2', (req, res) => {
    fs.promises.readFile(path.join(templates, 'temp2.html'), 'utf-8').then((template) => {
        res.status(200).type('html').send(template);
    }).catch((err) => {
        res.status(404).type('txt').send('File Not Found');
    });
});

app.get('/year/:num', (req, res) => {
    let num = req.params.num;
    
    let prom1 = dbSelect('SELECT * FROM MY_TABLE WHERE year = ?', [manufactuer.toUpperCase()]);
    let prom3 = fs.promises.readFile(path.join(template, 'review1.html'), 'utf-8');
    Promise.all([prom1,prom3]).then((results) => {
        let response = results[2].replace('$$TABLE$$',results[1][0].num);
        let table_body = '';
        results[0].forEach((num, index) =>{
        let table_row = '<tr>';
        table_row += '<td>' + num.year + '</td>';
        table_row += '<td>' +num.world + '</td>';
        table_row += '<td>' + num.europe + '</td>';
        table_row += '<td>' + num.asia+ '</td>';
            table_row += '</tr>';
    table_body += table_row;
    });
    response = response.replace('$$TABLE_BODY$$', table_body);
    res.status(200).type('html').send(response);
    }).catch((error)=>{
    res.status(400).type('txt').send('Error: File Not Found');
});


app.listen(port, () => {
    console.log('Now listening on port ' + port);
});


