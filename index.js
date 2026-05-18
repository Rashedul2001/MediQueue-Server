//this solves the dns problem
const dns = require("node:dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const express = require('express')
const dotenv = require('dotenv').config()
const { MongoClient, ServerApiVersion } = require('mongodb');


const port = process.env.PORT || 5000
const uri = process.env.MONGODB_URI

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});



const app = express()

app.get('/', (req, res) => {
    res.send("Server is Running Perfectly...")
})


async function run() {
    try {
        await client.connect();

        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {

        await client.close();
    }
}

run().catch(console.dir);


app.listen(port, () => {
    console.log(`MediQueue listening on port ${port}`)
})

