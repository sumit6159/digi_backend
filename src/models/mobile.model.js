const mongoose = require('mongoose')

const mobileSchema = new mongoose.Schema({
    title:{type:String, required:true},
    price:{type:Number, required:true},
    color:{type:String, required:true},
    brand:{type:String, required:true},
    memory:{type:String, required:true},
    model:{type:String, required:true},
    img:{type:String, required:true},
    
},
{
    versionKey:false
})

const Mobile = mongoose.model("Mobile", mobileSchema)
module.exports = Mobile