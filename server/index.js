require('dotenv').config()

const express = require("express");
const session = require('express-session')
const bcrypt = require('bcrypt');

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

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

app.use('/', require("./items"))