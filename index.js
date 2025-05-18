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

// Configure middleware - important!
app.use(express.json()); // For parsing application/json
app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded
app.use(express.static(__dirname));


app.post('/', async (req, res) => {
    const userURL = req.body.url;
    if(!checkURL(userURL)){
        return res.status(400).json({ error: "Missing URL" });
    } else {
        const hash = await shortenURL(userURL);
        return res.json({hash: hash});
    }
})

const PORT = process.env.PORT || 3901;

// Redirection logic
app.get('/:hash', async (req, res) => {
    console.log("hash: " + req.params.hash);
    const hash = req.params.hash;

    try {
        const collection = getCollection()
        let longURL = await collection.findOne({hash: hash}, {_id: 0, longurl: 1});
        if (longURL) {
            console.log("Redirecting user from " + hash + " to " + longURL.longurl);
            // const newURL = toString(longURL.longurl);
            await collection.updateOne({hash: hash}, {$inc:{uses: 1}})
            res.redirect(302, longURL.longurl.toString());
        } else {
            res.sendFile(__dirname + "/error.html");
            console.error("did not find corresponding url");
        }
    } catch (err) {
        console.error("Error fetching URL mapping:", err);
        res.status(500).send("Internal Server Error");
    }
});

initApp();


app.listen(PORT, () => console.log(`App listening on port ${PORT}`));

module.exports = {app};
