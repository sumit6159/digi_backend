const mongoose = require('mongoose')

const accessorySchema = new mongoose.Schema({
    title:{type:String, required:true},
    price:{type:Number, required:true},
    color:{type:String, required:true},
    brand:{type:String, required:true},
    img:{type:String, required:true},
},
{
    versionKey:false
})
   
   
const Accessory = mongoose.model("Accessory", accessorySchema)
module.exports = Accessory
    
