const router = require('express').Router();
const db = require("./db")

router.get('/items', async (req, res) => { //async so the program doesn't move on until the request is complete
    console.log("in the items")
    let result = await db.apply("SELECT * FROM `Products`", []) //select all the decks that belong to user
    res.send({result}) //send decks
})

module.exports = router //export routers