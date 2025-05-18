const express = require('express');
const {readFile, writeFile} = require('fs');

const app = express();

app.use(express.static(__dirname));


app.get('/', (request, response) => {
    readFile('index.html', 'utf8', (err, html) => {
        if (err){
            console.error('Error reading HTML file:', err);
            response.status(500).send('skill issue');
            return;
        }

        response.send(html);
    })
});

app.listen(process.env.PORT || 3111, () => console.log('App available on http://localhost:3111'))