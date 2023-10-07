const express = require("express");
const cors = require('cors');
const {default: mongoose} = require("mongoose");
const User = require('./models/User');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

require('dotenv').config();

const app = express();

app.use(cors({credentials:true,origin:'http://localhost:3000'}));
app.use(express.json());
app.use(cookieParser());

const salt = bcrypt.genSaltSync(10);
const secret = process.env.SECRET;


mongoose.connect(process.env.MONGO_URL);

app.get("/test", (req, res) => {
  res.json("test ok22");
});

app.post('/register', async(req, res) => {
  const {username, password} = req.body;
  try {
    const userDoc = await User.create({username,
     password:bcrypt.hashSync(password , salt)});
    res.json(userDoc);
  } catch (err) {
    res
      .status(400)
      .json(err);
  }
});

app.post("/login" , async (req , res)=>{
    const {username , password} = req.body;
    const userDoc = await User.findOne({username});
    const passOk = bcrypt.compareSync(password , userDoc.password);
    if(passOk)
    {
        //log in successful
        jwt.sign({username,id:userDoc._id} , secret , {} , (err , token)=>{

            if(err) throw err;
            res.cookie('token' , token).json({
                id:userDoc._id,
                username,
            });
        });
    }
    else{
        res.status(400).json("Wrong credentials");
    }
});

app.get("/profile" , (req , res)=>{
    const {token} = req.cookies;
    jwt.verify(token , secret ,{},(err, info)=>{
        if(err) throw err;
        res.json(info);
    });
    res.json(req.cookies);
});

app.post("/logout" , (req , res)=>{
    res.cookie('token' , '').json('ok');
})

app.listen(4000);
