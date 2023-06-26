import express from 'express'
 

const  app = express()

app.get('/', (req, res) => {
    fetch('httos://api.ex')
    res.send ('Hello world')


})
 app . listen(8080 , () => {
    console.log(' server is listening on port 8080')
 })
