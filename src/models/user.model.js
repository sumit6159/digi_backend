const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    firstName:{type:String, required:true},
    lastName:{type:String, required:true},
    email:{type:email, required:true, unique:true},
    password:{type:String, required:true, minlength:8}
},
{
    versionKey:false
})

const User = mongoose.model("User", userSchema)
module.exports= User