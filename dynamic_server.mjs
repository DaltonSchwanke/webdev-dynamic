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

app.get('/', (req, res) => {
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

app.get('/temp2.html', (req, res) => {
    fs.promises.readFile(path.join(templates, 'temp2.html'), 'utf-8').then((template) => {
        res.status(200).type('html').send(template);
    }).catch((err) => {
        res.status(404).type('txt').send('File Not Found');
    });
});



app.listen(port, () => {
    console.log('Now listening on port ' + port);
});


