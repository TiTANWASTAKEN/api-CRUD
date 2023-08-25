const express = require('express')
const app = express()

app.get('/', (req, res) => {
    res.send('hello api' )
})

app.listen(5000, ()=>{
    console.log('aaapp is running')
})