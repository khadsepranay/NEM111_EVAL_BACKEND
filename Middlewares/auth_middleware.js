let jwt = require('jsonwebtoken')

let AuthMiddleware = (req,res,next) =>{
    let token = req.headers.authorization
    if(!token){
        res.send('token is not provided')
    }
    let user = jwt.verify(token,'access_token')
    console.log(user)
    if(user){
        req.body.UserID = user._doc._id
        next()
    }else{
        res.send('token expired')
    }
}

module.exports = AuthMiddleware