require('dotenv').config()
let express = require('express')
let mongoose = require('mongoose')
let cors = require('cors')
let Port = process.env.Port
let DB_URL = process.env.DB_URL
let app = express()
app.use(express.json())
app.use(cors())
let connect = require('./config/config')
let UserModel = require('./User/user.model')
let PostModel = require('./Post/post.model')
let jwt = require('jsonwebtoken')
let bcrypt = require('bcrypt')
let UserRoute = require('./User/user.routes')
let PostRoute = require('./Post/post.routes')
let AuthMiddleware = require('./Middlewares/auth_middleware')

app.use('/users',UserRoute)
app.use('/posts',PostRoute)


app.listen(Port,async()=>{
    await connect(DB_URL)
    console.log(`Listening to the Port ${Port}`)
})


/*
"name":"Pranay Khadse",
"age":28,
"email":"pranitkhadse20@gmail.com",
"password":"123",
"gender":"Male"

 
 "title":"Post1",
 "body":"A",
 "device":"PC"

*/