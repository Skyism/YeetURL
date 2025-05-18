const { MongoClient } = require('mongodb');
require('dotenv').config();

let uri = process.env.CONSTR
const client = new MongoClient(uri)
let collection;

async function run() {
    try {
      // Connect the client to the server	(optional starting in v4.7)
      await client.connect();
      // Send a ping to confirm a successful connection
      await client.db("admin").command({ ping: 1 });
      const db = client.db('yeeturl');
      console.log("Pinged your deployment. You successfully connected to MongoDB!");
      collection = db.collection('urls');
    } catch (err) {
      console.error("Error initializing db:", err);
      res.status(500).send("Internal Server Error");
    }
}

function getCollection() {
  if(!collection) {
    throw new Error("Database collection not initialized. Call run() first.");
  }
  return collection;
}


module.exports = {run, getCollection, client}

