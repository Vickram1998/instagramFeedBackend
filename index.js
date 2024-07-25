const mongoose = require('mongoose');
const bodyParser = require ('body-parser');
const express = require("express");
const cors = require('cors');
const multer = require("multer");
const Post = require("./modules/userModule")
const app = express();
const Port = 5500;


mongoose.connect('mongodb://localhost:27017/Back-end', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected to MongoDB");
}).catch(err => {
    console.error("Failed to connect to MongoDB", err);
});



const upload = multer({
    dest: 'uploads/images'
});


app.use('/images', express.static(__dirname + '/uploads/images'));
app.use(cors());
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/posts', async (req, res) => {
    try {
        const posts = await Post.find();
        res.status(200).json({
            'posts': posts
        });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/posts', upload.single('postImage'), async (req, res) => {
    const { author, location, description } = req.body;
    const newPost = new Post({
        author,
        location,
        description,
        postImage: `/images/${req.file.filename}`
    });
    try {
        await newPost.save();
        res.status(200).json({
            success: 'true'
        });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


app.listen(Port, () => console.log(`Server Running ON Port ${Port}`));
