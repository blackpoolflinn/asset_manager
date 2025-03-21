const router = require('express').Router();
const db = require("./db")

router.get('/api/items', async (req, res) => { //async so the program doesn't move on until the request is complete
    let result = await db.search("SELECT * FROM `Products` WHERE user_id = ?", [req.session.user.id]) //select all the products
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
    || count.length <= 0 || count.trim().length <= 0){
      return
    }
    let result = await db.insert("INSERT INTO Products (product_name, product_cost, product_description, product_vendor, product_count, user_id) VALUES (?,?,?,?,?,?)", [name,cost,description,vendor,count, req.session.user.id])
    res.send({id: result.lastInsertRowid})
  })

router.delete('/api/items/:id', async(req, res) => { //async so the program doesn't move on until the request is complete
    const id = req.params.id 
    let result = await db.delete("DELETE FROM Products WHERE product_id=?", [id]) 
    res.send({affectedRows: result.affectedRows}) 
  })

router.patch('/api/items/:type/:product_id', async(req, res) => {
  const type = req.params.type
  const id = req.params.product_id
  const data = req.body.data
  if(data.length <= 0 || data.trim().length <= 0){
    return //Check that new name isn't empty
  }
  if (type == "product_name" | type == "product_cost" | type == "product_description" | type == "product_vendor" | type == "product_count"){
    let result = await db.insert(`UPDATE Products SET ${type} = ? WHERE  product_id=?`, [data, id])
    res.send({id: result.lastInsertRowid})
  } else {
    return
  }
})

module.exports = router //export routers