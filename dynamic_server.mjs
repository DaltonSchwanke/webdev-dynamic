import * as fs from 'node:fs';
import * as path from 'node:path';
import * as url from 'node:url';

import { default as express } from 'express';
import { default as sqlite3 } from 'sqlite3';

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

const port = 8000;
const root = path.join(__dirname, 'public');
const template = path.join(__dirname, 'templates');

let app = express();
app.use(express.static(root));

app.listen(port, () => {
    console.log('Now listening on port ' + port);
});


const express = require('express');

// Sample sustainability data
const sustainabilityData = [
  { Year: 2020, World: 100, OECD: 50 },
  { Year: 2021, World: 110, OECD: 55 },
  // Add more data for other years and regions
];


app.get('/tables', (req, res) => {
  // Generate an HTML table dynamically
  const tableHtml = `
    <table>
      <tr>
        <th>Year</th>
        <th>World</th>
        <th>OECD</th>
        <!-- Add more table headers for other regions -->
      </tr>
      ${sustainabilityData.map(item => `
        <tr>
          <td>${item.Year}</td>
          <td>${item.World}</td>
          <td>${item.OECD}</td>
          <!-- Add more table data for other regions -->
        </tr>
      `).join('')}
    </table>
  `;

  res.send(`
    <html>
      <head>
        <title>Sustainability Data - Tables</title>
      </head>
      <body>
        <h1>Sustainability Data - Tables</h1>
        ${tableHtml}
      </body>
    </html>
  `);
});

app.get('/graphs', (req, res) => {
  res.send(`
    <html>
      <head>
        <title>Sustainability Data - Graphs</title>
        <!-- Include Chart.js library via CDN -->
        <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
      </head>
      <body>
        <h1>Sustainability Data - Graphs</h1>
        <canvas id="sustainabilityChart" width="400" height="200"></canvas>
        <script>
          var ctx = document.getElementById('sustainabilityChart').getContext('2d');
          var data = ${JSON.stringify(sustainabilityData)};

          var years = data.map(item => item.Year);
          var worldData = data.map(item => item.World);

          new Chart(ctx, {
            type: 'line',
            data: {
              labels: years,
              datasets: [{
                label: 'World',
                data: worldData,
                borderColor: 'blue',
                fill: false,
              }],
            },
          });
        </script>
      </body>
    </html>
  `);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
