const express = require("express");
const cors = require('cors');
const {default: mongoose} = require("mongoose");
const User = require('./models/User');
const Post = require('./models/Post')
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const multer = require('multer');
const uploadMiddleware = multer({dest: 'uploads/'});
const fs = require('fs');

const app = express();

require('dotenv').config();

app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(__dirname + '/uploads'));

const salt = bcrypt.genSaltSync(10);
const secret = process.env.SECRET;

mongoose.connect(process.env.MONGO_URL);

app.get("/test", (req, res) => {
  res.json("test ok22");
});



// register user
app.post('/register', async(req, res) => {
  const {username, password} = req.body;
  try {
    const userDoc = await User.create({
      username,
      password: bcrypt.hashSync(password, salt)
    });
    res.json(userDoc);
  } catch (err) {
    res
      .status(400)
      .json(err);
  }
});



//login functionality
app.post("/login", async(req, res) => {
  const {username, password} = req.body;
  const userDoc = await User.findOne({username});
  const passOk = bcrypt.compareSync(password, userDoc.password);
  if (passOk) {
    jwt.sign({
      username,
      id: userDoc._id
    }, secret, {}, (err, token) => {

      if (err) 
        throw err;
      res
        .cookie('token', token)
        .json({id: userDoc._id, username});
    });
  } else {
    res
      .status(400)
      .json("Wrong credentials");
  }
});


//get user profile
app.get('/profile', (req, res) => {
  const {token} = req.cookies;
  jwt.verify(token, secret, {}, (err, info) => {
    if (err) 
      throw err;
    res.json(info);
  });
});

//logout
app.post("/logout", (req, res) => {
  res
    .cookie('token', '')
    .json('ok');
});


//create a post
app.post('/post', uploadMiddleware.single('file'), async(req, res) => {
  const {originalname, path} = req.file;
  const parts = originalname.split('.');
  const ext = parts[parts.length - 1];
  const newPath = path + '.' + ext;
  fs.renameSync(path, newPath);

  const {token} = req.cookies;
  jwt.verify(token, secret, {}, async(err, info) => {
    if (err) 
      throw err;
    const {title, summary, content} = req.body;
    const postDoc = await Post.create({title, summary, content, cover: newPath, author: info.id});
    res.json(postDoc);
  });

});


//update the post
app.put('/post', uploadMiddleware.single('file'), async(req, res) => {
  let newPath = null;
  if (req.file) {
    const {originalname, path} = req.file;
    const parts = originalname.split('.');
    const ext = parts[parts.length - 1];
    newPath = path + '.' + ext;
    fs.renameSync(path, newPath);
  }

  const {token} = req.cookies;
  jwt.verify(token, secret, {}, async(err, info) => {
    if (err) 
      throw err;
    const {id, title, summary, content} = req.body;
    const postDoc = await Post.findById(id);
    const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(info.id);
    if (!isAuthor) {
      return res
        .status(400)
        .json('you are not the author');
    }
    await postDoc.updateOne({
      title,
      summary,
      content,
      cover: newPath
        ? newPath
        : postDoc.cover
    });

    res.json(postDoc);
  });

});


//show all posts
app.get('/post', async(req, res) => {
  res.json(await Post.find().populate('author', ['username']).sort({createdAt: -1}).limit(20));
});


//get post of specific id
app.get("/post/:id", async(req, res) => {
  const {id} = req.params;
  const postDoc = await Post
    .findById(id)
    .populate('author', ['username']);
  res.json(postDoc);
});

app.listen(4000);
