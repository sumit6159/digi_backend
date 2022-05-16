const express = require('express')
const app = express()
const cors = require("cors")
require("dotenv").config()
const connect = require('./db/db')
app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 5004
const { authenticate } = require("./middlewares/authenticate");

const {newToken, router} = require("./controllers/user.controller")
const mobileController = require('./controllers/mobile.controller')
const accessoryController = require('./controllers/accessory.controller')

app.use(express.static('public'));
app.use('/user', router)
app.use('/mobile', mobileController)
app.use('/accessory',accessoryController)
app.get("/signOut", authenticate, async (req, res) => {
    try {
      res.clearCookie("Bearer");
      res.status(200).json({ message: "sign out success" });
    } catch (error) {
      return res.status(500).send({ message: "sign out error" });
    }
  });

app.listen(PORT, async()=>{
    try{
        await connect()
        console.log(`listening on ${PORT}`)
    }
    catch(e){
        console.log("error:", e)
    }
})