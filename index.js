const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const {readFile, writeFile} = require('fs');

const {checkURL, shortenURL} = require('./dbManager')


const {getCollection, run} = require("./dbinit")

const app = express();

app.use(express.static(__dirname));

async function initApp() {
    try {
        await run();
        console.log("Database initialized successfully");
    } catch (err) {
        console.log("Error initializing databse");
        process.exit(1);
    }
}

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

const collection = getCollection();

app.post('/', (req, res) => {
    const userURL = req.body.url;
    if(!checkURL(userURL)){
        return res.status(400).json({ error: "Missing URL" });
    } else {
        return result.json({hash: shortenURL(userURL)});
    }
})

const PORT = process.env.PORT || 3901;

// Redirection logic
app.get('/:hash', (req, res) => {
    const hash = req.params.hash;

    try {
        let longURL = collection.findOne({hash: hash}, {_id: 0, longurl: 1});

        if (!longURL) return res.status(404).send("Short URL not found");

        console.log("Redirecting user from ${hash} to ${longURL.longurl}");
        return res.redirect(302, longURL.longurl);
    } catch (err) {
        console.error("Error fetching URL mapping:", error);
        return res.status(500).send("Internal Server Error");
    }
});


app.listen(PORT, () => console.log(`App listening on port ${PORT}`));

module.exports = {app};
