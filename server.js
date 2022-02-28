//object： build own API and allow myself to call database data to get full stack
//install express first by type in terminal : npm i express
//install npm i nodemon (and add "start": "nodemon server.js" at the script part of "package.json") and "npn start" at terminal
//node server.js, then use browser to connect if no nodemon installed
const Product = require('./models/product')
const express = require('express');
const PORT = process.env.PORT || 3000;
const db = require("./db/index")

const app = express()

db.on('error', console.error.bind(console, 'MongoDB connection error:'))


app.listen(PORT, () => {
  console.log(`Express server listening on port ${PORT}`);
})

app.get('/', (req, res) => {
  res.send("This is the root")
})
//route that shows all products
app.get('/products', async (req, res) => {
  const products = await Product.find()
  res.json(products)
})
//if there is an error, we will not
// see it 
//unless we use a try catch
app.get('/products/:id', async (req, res) => {
  try {
    const { id } = req.params
    const product = await Product.findById(id)
    if(!product) 
        throw Error ('Product not found')
    res.json(product)

  } catch (e) {
    console.log(e)
    res.send('Product not found!')
  }
})