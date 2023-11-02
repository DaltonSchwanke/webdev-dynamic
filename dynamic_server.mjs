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
app.get('/year/:year', (req, res) => {
    fs.promises.readFile(path.join(templates, 'temp1.html'), 'utf-8').then((template) => {
        res.status(200).type('html').send(template);
    }).catch((err) => {
        res.status(404).type('txt').send('File Not Found');
    });
});
app.get('/:name', async (req, res) => {
    const region = req.params.name.toUpperCase();
    console.log(region);

    const query1 = 'SELECT * FROM Cereals WHERE mfr = ?';
    const query2 = 'SELECT * FROM Manufacturers WHERE id = ?';

    try {
        const [cereals, manufacturer] = await Promise.all([dbSelect(query1, [region]), dbSelect(query2, [region])]);
        
        const response = manufacturer[0].name;

        res.send(`
            <html>
            <head>
                <title>${response}</title>
            </head>
            <body>
                <h1>${response}</h1>
                <table>
                    <tr><th>Name</th><th>Type</th><th>Calories</th><th>Fat</th><th>Protein</th><th>Carbohydrates</th></tr>
                    ${cereals.map(cereal => `
                        <tr>
                            <td>${cereal.name}</td>
                            <td>${cereal.type}</td>
                            <td>${cereal.calories}</td>
                            <td>${cereal.fat}</td>
                            <td>${cereal.protein}</td>
                            <td>${cereal.carbohydrates}</td>
                        </tr>`).join('')}
                </table>
                <div id="chart-container">
                    <canvas id="myChart"></canvas>
                </div>
                <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
                <script>
                    const labels = ['Calories', 'Fat', 'Protein', 'Carbohydrates'];
                    const data = [${cereals[0].calories}, ${cereals[0].fat}, ${cereals[0].protein}, ${cereals[0].carbohydrates}];

                    const ctx = document.getElementById('myChart').getContext('2d');
                    new Chart(ctx, {
                        type: 'bar',
                        data: {
                            labels: labels,
                            datasets: [{
                                label: 'Cereal Data',
                                data: data,
                                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                                borderColor: 'rgba(75, 192, 192, 1)',
                                borderWidth: 1,
                            }],
                        },
                    });
                </script>
            </body>
            </html>
        `);
    } catch (error) {
        res.status(404).type('txt').send('File Not Found');
    }
});

app.listen(port, () => {
    console.log('Now listening on port ' + port);
});


