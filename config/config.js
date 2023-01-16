let mongoose = require('mongoose')

let connect = (DB_URL) =>{
   return mongoose.connect(DB_URL)
}

module.exports = connect