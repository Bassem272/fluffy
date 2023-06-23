import express from 'express'
 

const  app = express()

app.get('/', async (req, res) => {
   const dd= await fetch('https://fakestoreapi.com/products')
  const ttt = await  dd.json())
    .then(cats=> console.log(cats))
    res.send(cats)
    res.send ('Hello world')


})
 app . listen(8080 , () => {
    console.log(' server is listening on port 8080')
 })
