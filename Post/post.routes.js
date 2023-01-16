const PostModel = require("./post.model")
let express = require('express')
const AuthMiddleware = require("../Middlewares/auth_middleware")
let PostRoute = express.Router()




PostRoute.post('/create',AuthMiddleware,async(req,res)=>{
    try{
        let info = req.body
        let post = await PostModel.create({...info})
        res.send('Post has been created')
    }catch(err){
        res.send(err)
    }
})

PostRoute.get('/',AuthMiddleware,async(req,res)=>{
    try{
        let {UserID} = req.body
        let {device} = req.query
        if(device){
            let posts = await PostModel.find({UserID,device})
            res.send(posts)
        }else{
            let posts = await PostModel.find({UserID})
            res.send(posts)
        }
    }catch(err){
        res.send(err)
    }
})

PostRoute.patch('/update/:id',AuthMiddleware,async(req,res)=>{
    let info = req.body
    let UserID = req.body.UserID
    let id = req.params.id
    try{
        let post = await PostModel.findOne({_id:id})
        if(UserID==post.UserID){
            await PostModel.findByIdAndUpdate(id,{...info},{new:true})
            res.send('Post has been updated')
        }else{
            res.send('You are not authorized to update this post')
        }
    }catch(err){
        res.send(err)
    }
})

PostRoute.delete('/delete/:id',AuthMiddleware,async(req,res)=>{
    let UserID = req.body.UserID
    let id = req.params.id
    try{
        let post = await PostModel.findOne({_id:id})
        if(UserID==post.UserID){
            await PostModel.findByIdAndDelete(id)
            res.send('Post has been deleted')
        }else{
            res.send('You are not authorized to delete this post')
        }
    }catch(err){
        res.send(err)
    }
})

module.exports = PostRoute