const express = require('express');
const cors = require('cors');
const { connectDB, getDB } = require('./db');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 2057;

app.use(cors());
app.use(express.json());

// Kết nối MongoDB
connectDB();

// API: Lấy danh sách tất cả items
app.get('/api/items', async (req, res) => {
    try {
        const db = getDB();
        const items = await db.collection('items').find().toArray();
        res.json(items);
    } catch (error) {
        res.status(500).json({ message: "Lỗi khi lấy dữ liệu!" });
    }
});

// API: Thêm một item
app.post('/api/items', async (req, res) => {
    try {
        const db = getDB();
        const newItem = req.body;
        const result = await db.collection('items').insertOne(newItem);
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: "Lỗi khi thêm dữ liệu!" });
    }
});

// Khởi động server
app.listen(PORT, () => {
    console.log(`Server đang chạy tại http://localhost:${PORT}`);
});