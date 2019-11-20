const cors = require('cors')
const express = require('express')
const bodyParser = require('body-parser')
const fs = require('fs')
const path = require('path')
const multer = require('multer')
const MG = require('mongodb').MongoClient


const app = express()
const port = 3001

const upload = multer({dest: '/uploads/images'});
const router = express.Router();

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ limit: '50mb', extended: false, parameterLimit: 1000000}))

const dbs = {
  //host: 'mongodb://localhost:27017',
  host: 'mongodb+srv://root:gm14022001@mongo-db-cekcg.mongodb.net/test?retryWrites=true&w=majority',
  main: 'react',
  users: 'users',
  posts: 'posts'
}


/*const storage = multer.diskStorage({
  destination: "./public/uploads/",
  filename: function(req, file, cb){
     cb(null,"IMAGE-" + Date.now() + path.extname(file.originalname));
  }
});
*/

// Init MongoDB then init server
MG.connect(dbs.host, (err, database) => {
  if (err) throw err
  db = database.db(dbs.main)

  app.listen(port)
})

app.get('/getPosts', (req, res) => {
  db.collection(dbs.posts).find(req.query).sort({date: -1}).toArray((e, r) => {
    res.send({ e, r })
  })
})

app.post('/insertPost', upload.single('image'), (req, res) => {
  try {
    if (req.file) {
      var fileName = './public/images/' + req.file.filename + '.png'
      fs.rename(req.file.path, fileName, err => {
        if (err) res.send({err: err})
        db.collection(dbs.posts).insertOne({...req.body, image: fileName})
      })
    } else {
      db.collection(dbs.posts).insertOne({...req.body})
    }
    res.send({done: true})
  } catch (e) {
    res.send({err: e})
  }

})

app.get('/getUsers', (req, res) => {
  db.collection(dbs.users).find(req.query).toArray((e, r) => {
    res.send(r)
  })
})

app.post('/insertUser', (req, res) => {
  db.collection(dbs.users).find({ $or: [{ email: req.body.email }, { username: req.body.username }] }).toArray((e, r) => {
    if (r.length > 0)
      res.send({ err: 'Email or username already in use.' })
    else
      db.collection(dbs.users).insertOne(req.body)
  })

})

app.post('/login', (req, res) => {
  db.collection(dbs.users).find(req.body).toArray((e, r) => {
    res.send({e, r})
  })
})

