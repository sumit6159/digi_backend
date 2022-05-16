const express = require('express')
const app = express()

require("dotenv").config()
const connect = require('./db/db')

app.use(express.json())

const PORT = process.env.PORT || 5002


app.listen(PORT, async()=>{
    try{
        await connect()
        console.log(`listening on ${PORT}`)
    }
    catch(e){
        console.log("error:", e)
    }
})