import express from 'express'
 

const  app = express()

app.get('/', async (req, res) => {
    try{             
   const dd= await fetch('https://fakestoreapi.com/products')
  const ttt = await  dd.json()

     console.log(ttt)
     res.send(t)
    res.send ('Hello world')
    }catch(error){
        console.log(error)
        res.send('error').status(500)
    }

})
 app . listen(8080 , () => {
    console.log(' server is listening on port 8080')
 })
