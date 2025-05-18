const { MongoClient } = require('mongodb');
require('dotenv').config();

let uri = process.env.CONSTR
const client = new MongoClient(uri)

async function run() {
    try {
      // Connect the client to the server	(optional starting in v4.7)
      await client.connect();
      // Send a ping to confirm a successful connection
      await client.db("admin").command({ ping: 1 });
      console.log("Pinged your deployment. You successfully connected to MongoDB!");
      const collection = db.collection('urls')
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
}


module.exports = {run, collection, client}

