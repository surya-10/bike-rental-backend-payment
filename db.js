const { MongoClient } = require("mongodb");

async function dbConnection(){
    let client = new MongoClient(process.env.str);
    await client.connect();
    console.log("db");
    return client;
}
// let client = await dbConnection();
module.exports = dbConnection;