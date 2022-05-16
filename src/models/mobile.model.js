const mongoose = require('mongoose')

const mobileSchema = new mongoose.Schema({
    titles:{type:String, required:true},
    price:{type:Number, required:true},
    color:{type:String, required:true},
    brand:{type:String, required:true},
    memory:{type:String, required:true},
    model:{type:String, required:true},
    img:{type:String, required:true},
    userId:{type:mongoose.Types.ObjectId, ref:'user', required:true}
    
},
{
    versionKey:false
})

const Mobile = mongoose.model("mobile", mobileSchema)
module.exports = Mobile