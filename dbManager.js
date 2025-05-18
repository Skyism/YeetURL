const {getCollection, client} = require("./dbinit")
const {UrlShortener} = require("./hash")

const shortner = new UrlShortener();

function checkURL(userURL){
    var regex = new RegExp("^(http[s]?:\\/\\/(www\\.)?|ftp:\\/\\/(www\\.)?|www\\.){1}([0-9A-Za-z-\\.@:%_\+~#=]+)+((\\.[a-zA-Z]{2,3})+)(/(.)*)?(\\?(.)*)?"); 
    var without_regex = new RegExp("^([0-9A-Za-z-\\.@:%_\+~#=]+)+((\\.[a-zA-Z]{2,3})+)(/(.)*)?(\\?(.)*)?");
    var str = userURL;

    return (regex.test(str) || without_regex.test(str));
}

function normalizeURL(userURL) {
    if (!/^https?:\/\//i.test(userURL)) {
        return 'https://' + userURL;
    }
    return userURL;
}

async function shortenURL(userURL){

    // Check if URL already exists in the database

    const collection = getCollection();

    let res = await collection.findOne({longurl: userURL}, {_id: 0, hash: 1})

    if(res){
        console.log("found in database")
        return res.hash;
    }

    //it doesn't, insert into db

    let hashed = shortner.shorten(userURL)

    let fixedURL = normalizeURL(userURL)
    console.log("the fixed url is" + fixedURL);
    
    await collection.insertOne({
        longurl: fixedURL,
        hash: hashed,
        time: Date.now(),
        uses: 0
    });
    console.log("successful insertion into db");
    

    return hashed;

}

module.exports = {checkURL, shortenURL}
