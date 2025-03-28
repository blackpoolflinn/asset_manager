require('dotenv').config()

const express = require("express");
const session = require('express-session')
const bcrypt = require('bcrypt');
const db = require("./db")

const PORT = process.env.PORT || 3001;
const app = express();
app.use(express.json())
const saltRounds = 8; // how many times the hashing algorithm is run to make the hash more secure

async function hashPassword(password) { // hashing algorithm function
  return await bcrypt.hash(password, saltRounds);
}

async function comparePassword(password, hash) { // password checked against hashing algorithm
  return await bcrypt.compare(password, hash);
}

app.set('trust proxy', 1) // trust first proxy

app.use(session({ // sessions to store user info
  secret: `${process.env.SECRET}`,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))

app.get('/api/session', async(req, res) => {
  res.status(200).json(req.session.user ? {...req.session.user, isAuthenticated: true} : {isAuthenticated: false})
})

app.get('/api/logout', async(req, res) => {
  if(!req.session.user){
    return res.status(403).send({success: false})
  }
  req.session.destroy(() => {
    res.status(200).send('ok')
  })
})

app.post('/api/register', async(req, res) => {
  const username = req.body.username
  let password = req.body.password
  if(username.length <= 0 || username.trim().length <= 0 || password.length <= 0 || password.trim().length <= 0){
    return
  }
  const userResult = await db.search("SELECT `user_id`, `password` FROM `Users` WHERE `username`=?", username)
  console.log(userResult)
  if (userResult != undefined) {
    return
  }
  password = await hashPassword(password)
  let result = await db.insert("INSERT INTO `Users` (`username`, `password`) VALUES (?, ?)", [username, password])
  if(result.insertId !== ''){
    res.status(200).send({success: true})
  } else {
    res.status(200).send({success: false})
  }
})

app.post('/api/login', async(req, res) => {
  const username = req.body.username
  let password = req.body.password
  if(username.length <= 0 || username.trim().length <= 0 || password.length <= 0 || password.trim().length <= 0){
    return
  }
  const result = await db.search("SELECT `user_id`, `password` FROM `Users` WHERE `username`=?", username)
  if (result == undefined) {
    return
  }
  compare = await comparePassword(password, result.password)
  if(result.length !== 0){
    if(compare){
      req.session.user = {id: result.user_id, username: username}
      res.status(200).send({success: true, id: result.id})
    } else {
      res.status(200).send({success: false, reason: "incorrect password"})
    }
  } else {
      res.status(200).send({success: false, reason: "incorrect username"})
  }
})

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

app.use('/', require("./items"))