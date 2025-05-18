const {getCollection, client} = require("./dbinit")
const collection = getCollection();
const {UrlShortener} = require("./hash")

const shortner = new UrlShortener();

function checkURL(userURL){
    var regex = new RegExp("^(http[s]?:\\/\\/(www\\.)?|ftp:\\/\\/(www\\.)?|www\\.){1}([0-9A-Za-z-\\.@:%_\+~#=]+)+((\\.[a-zA-Z]{2,3})+)(/(.)*)?(\\?(.)*)?"); 
    var without_regex = new RegExp("^([0-9A-Za-z-\\.@:%_\+~#=]+)+((\\.[a-zA-Z]{2,3})+)(/(.)*)?(\\?(.)*)?");
    var str = userURL;

    return (regex.test(str) || without_regex.test(str));
}

async function shortenURL(userURL){

    // Check if URL already exists in the database

    let res = await collection.findOne({longurl: userURL}, {_id: 0, hash: 1})

    if(res){
        console.log("found in database")
        return res.hash;
    }

    //it doesn't, insert into db

    let hashed = shortner.shorten(userURL)
    
    await collection.insertOne({
        longurl: userURL,
        hash: hashed,
        time: Date.now(),
        uses: 0
    });
    

    return hashed;

}

module.exports = {checkURL, shortenURL}
