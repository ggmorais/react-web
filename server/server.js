const cors = require('cors')
const express = require('express')
const bodyParser = require('body-parser')
const fs = require('fs')
const path = require('path')
const multer = require('multer')
const MG = require('mongodb').MongoClient
const ObjectID = require('mongodb').ObjectID


const app = express()
const port = 3001

const upload = multer({dest: '/uploads/images'});
const router = express.Router();

// Express configurations
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ limit: '50mb', extended: false, parameterLimit: 1000000}))


// Url acessible folder
app.use('/public', express.static('public'))


// Database settings
const dbs = {
  host: 'mongodb+srv://root:gm14022001@mongo-db-cekcg.mongodb.net/test?retryWrites=true&w=majority',
  main: 'react',
  users: 'users',
  posts: 'posts'
}


// Init MongoDB
MG.connect(dbs.host, (err, database) => {
  if (err) throw err
  db = database.db(dbs.main)

  // Init server
  app.listen(port)
})

app.get('/getCommentaries', (req, res) => {
  db.collection(dbs.posts).findOne({_id: ObjectID(req.query._id)}, (e, r) => {
    res.send(Array(r.commentaries)[0])
  })
  /*db.collection(dbs.posts).findOne({_id: ObjectID(req.query._id)}).toArray((e, r) => {
    res.send({ e, r })
  })*/
})

app.post('/insertCommentary', (req, res) => {
  var userInfos = JSON.parse(req.body.userInfos)
  db.collection(dbs.posts).updateOne({_id: ObjectID(req.body._id)}, {$push: { commentaries: {_id: new ObjectID(), fullName: userInfos.firstName + ' ' + userInfos.lastName, username: userInfos.username, body: req.body.body, date: req.body.date} }})
  res.send({done: true})
  /*db.collection(dbs.posts).find({_id: ObjectID(req.body._id)}).toArray((e, r) => {
    console.log(r)
  })*/
})

app.get('/getPosts', (req, res) => {
  db.collection(dbs.posts).find(req.query).sort({date: -1}).toArray((e, r) => {
    res.send({ e, r })
  })
})

app.post('/insertPost', upload.single('image'), (req, res) => {
  try {
    if (req.file) {
      var fileName = req.file.filename + '.png'
      var pathName = './public/images/' + fileName
      fs.rename(req.file.path, pathName, err => {
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

