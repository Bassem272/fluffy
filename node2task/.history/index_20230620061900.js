import express from 'express'
 

const  app = express()

app.get('/products', async (req, res) => {
    try{             
   const dd= await fetch('https://fakestoreapi.com/products')
  const ttt = await  dd.json()

     //console.log(ttt)
     res.json(ttt)
    // res.send ('Hello world')
    }catch(error){
        console.log(error)
        res.status(500).send('error')
    }

})
app.post('/products/:', async (req, res) => {
    try{             
   const dd= await fetch('https://fakestoreapi.com/products')
  const ttt = await  dd.json()

     //console.log(ttt)
     res.json(ttt)
    // res.send ('Hello world')
    }catch(error){
        console.log(error)
        res.status(500).send('error')
    }

})
 app . listen(8080 , () => {
    console.log(' server is listening on port 8080')
 })
