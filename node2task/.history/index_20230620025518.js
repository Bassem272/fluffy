import express from 'express'
 

const  app = express()

app.get('/', (req, res) => {
    fetch('https://api.escueldjs.co/api/v1/products').then(response=> response.json()()
    .then(cats=> console.log(cats)))
    res.send(cats)
    res.send ('Hello world')


})
 app . listen(8080 , () => {
    console.log(' server is listening on port 8080')
 })
