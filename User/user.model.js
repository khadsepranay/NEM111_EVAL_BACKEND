let mongoose = require('mongoose')

let UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    gender:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

let UserModel = mongoose.model('Users',UserSchema)

module.exports = UserModel