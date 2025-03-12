const router = require('express').Router();
const db = require("./db")

router.get('/api/items', async (req, res) => { //async so the program doesn't move on until the request is complete
    console.log("in the items")
    let result = await db.search("SELECT * FROM `Products`", []) //select all the products
    res.send({result}) //send decks
})

router.post('/api/item', async (req, res) => { //async so the program doesn't move on until the request is complete
    const name = req.body.name //get the name of item etc..
    const cost = req.body.cost //get the title of the deck
    const description = req.body.description //get the title of the deck
    const vendor = req.body.vendor //get the title of the deck
    const count = req.body.count //get the title of the deck
    if(name.length <= 0 || name.trim().length <= 0 
    || cost.length <= 0 || cost.trim().length <= 0 
    || description.length <= 0 || description.trim().length <= 0 
    || vendor.length <= 0 || vendor.trim().length <= 0
    || count.length <= 0 || count.trim().length <= 0)
    {
      return //check that the deck isn't empty
    }
    let result = await db.insert("INSERT INTO Products (product_name, product_cost, product_description, product_vendor, product_count) VALUES (?,?,?,?,?)", [name,cost,description,vendor,count])
    res.send({id: result.lastInsertRowid})
  })

module.exports = router //export routers