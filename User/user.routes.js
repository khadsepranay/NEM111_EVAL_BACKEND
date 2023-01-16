let express = require('express')
let UserRoute = express.Router()
const UserModel = require("./user.model")
let bcrypt = require('bcrypt')
let jwt = require('jsonwebtoken')




UserRoute.post('/register',async(req,res)=>{
    let {name,email,gender,password} = req.body
    bcrypt.hash(password,5,async(err,hash)=>{
        try{
            if(hash){
               await UserModel.create({name,email,password:hash,gender})
                res.send('User has been created')
            }
        }catch(err){
            res.send(err)
        }
    })
})

UserRoute.post('/login',async(req,res)=>{
    let {email,password} = req.body
    let user = await UserModel.findOne({email})
    bcrypt.compare(password,user.password,(err,succ)=>{
        try{
            if(succ){
                let token = jwt.sign({...user},'access_token')
                res.send({msg:"Login Successful",token})
            }else{
                res.send('Password is wrong')
            }
        }catch(err){
            res.send(err)
        }
    })
})

module.exports = UserRoute