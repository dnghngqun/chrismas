const { MongoClient } = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

let db;

async function connectDB() {
    try {
        await client.connect();
        db = client.db("myDatabase"); // Thay "myDatabase" bằng tên database của bạn
        console.log("Kết nối MongoDB thành công!");
    } catch (error) {
        console.error("Không thể kết nối MongoDB:", error);
    }
}

function getDB() {
    if (!db) throw new Error("Database chưa được kết nối!");
    return db;
}

module.exports = { connectDB, getDB };