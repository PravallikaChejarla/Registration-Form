const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));

mongoose.connect('mongodb://localhost/blog', { useNewUrlParser: true, useUnifiedTopology: true });

const postSchema = new mongoose.Schema({
    title: String,
    content: String
});

const Post = mongoose.model('Post', postSchema);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index2.html');
});

app.post('/create-post', async (req, res) => {
    const post = new Post({
        title: req.body.title,
        content: req.body.content
    });

    await post.save();
    res.redirect('/');
});

app.get('/posts', async (req, res) => {
    const posts = await Post.find();
    res.json(posts);
});

app.listen(port, () => {
    console.log(`Blog website listening at http://localhost:${port}`);
});