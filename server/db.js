var mongoose = require('mongoose')


const url = 'mongodb+srv://root:gm14022001@mongo-db-cekcg.mongodb.net/test?retryWrites=true&w=majority'

mongoose.connect(url)

var userSchema = new mongoose.Schema({
    username: String,
    email: String
}, { collection: 'usercollection' }
)
 
module.exports = { Mongoose: mongoose, UserSchema: userSchema }