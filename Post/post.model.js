let mongoose = require('mongoose')

let PostSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    body:{
        type:String,
        required:true
    },
    device:{
        type:String,
        required:true,
        enum:["PC", "TABLET", "MOBILE"]
    },
    UserID:{
        type:String,
        required:true
    }
})

let PostModel = mongoose.model('Posts',PostSchema)

module.exports = PostModel