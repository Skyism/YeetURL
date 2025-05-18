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

const PORT = process.env.PORT || 3900;
app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
