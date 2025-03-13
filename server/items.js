const router = require('express').Router();
const db = require("./db")

router.get('/api/items', async (req, res) => { //async so the program doesn't move on until the request is complete
    let result = await db.search("SELECT * FROM `Products`", []) //select all the products
    res.send({result}) 
})

router.post('/api/item', async (req, res) => { //async so the program doesn't move on until the request is complete
    const name = req.body.name 
    const cost = req.body.cost 
    const description = req.body.description 
    const vendor = req.body.vendor 
    const count = req.body.count 
    if(name.length <= 0 || name.trim().length <= 0 
    || cost.length <= 0 || cost.trim().length <= 0 
    || description.length <= 0 || description.trim().length <= 0 
    || vendor.length <= 0 || vendor.trim().length <= 0
    || count.length <= 0 || count.trim().length <= 0)
    {
      return
    }
    let result = await db.insert("INSERT INTO Products (product_name, product_cost, product_description, product_vendor, product_count) VALUES (?,?,?,?,?)", [name,cost,description,vendor,count])
    res.send({id: result.lastInsertRowid})
  })

router.delete('/api/items/:id', async(req, res) => { //async so the program doesn't move on until the request is complete
    const id = req.params.id 
    let result = await db.delete("DELETE FROM Products WHERE product_id=?", [id]) 
    res.send({affectedRows: result.affectedRows}) 
  })

module.exports = router //export routers