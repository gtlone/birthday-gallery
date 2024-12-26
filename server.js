const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();

// 配置静态文件服务
app.use(express.static('public'));
app.use('/uploads', express.static('uploads'));

// 配置文件上传
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/') // 文件将保存在 uploads 目录
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname) // 文件名将是时间戳-原始文件名
    }
});

const upload = multer({ storage: storage });

// 存储照片数据
let photos = {};

// API路由
app.post('/api/photos', upload.single('photo'), (req, res) => {
    try {
        const { year } = req.body;
        const file = req.file;

        if (!photos[year]) {
            photos[year] = [];
        }

        const photo = {
            id: Date.now(),
            url: `/uploads/${file.filename}`,
            uploadDate: new Date()
        };

        photos[year].push(photo);
        res.json({ success: true, photo });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/photos/:year', (req, res) => {
    const year = req.params.year;
    res.json(photos[year] || []);
});

app.delete('/api/photos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    for (let year in photos) {
        photos[year] = photos[year].filter(photo => photo.id !== id);
    }
    res.json({ success: true });
});

// 提供 HTML 文件
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'admin.html'));
});

// 启动服务器
app.listen(3000, () => {
    console.log('Server running on port 3000');
}); 