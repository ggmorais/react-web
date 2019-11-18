const cors = require('cors')
const express = require('express')
const bodyParser = require('body-parser')
const fs = require('fs')
const MG = require('mongodb').MongoClient


const app = express()
const port = 3001

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))

const dbs = {
  //host: 'mongodb://localhost:27017',
  host: 'mongodb+srv://root:gm14022001@mongo-db-cekcg.mongodb.net/test?retryWrites=true&w=majority',
  main: 'react',
  users: 'users',
  posts: 'posts'
}

// Init MongoDB then init server
MG.connect(dbs.host, (err, database) => {
  if (err) throw err
  db = database.db(dbs.main)

  app.listen(port)
})


app.get('/getPosts', (req, res) => {
  db.collection(dbs.posts).find(req.query).toArray((e, r) => {
    res.send({ e, r })
  })
})

app.post('/insertPost', (req, res) => {
  console.log(req.body)
  fs.writeFile('test.png', req.body.image, (err, r) => {
    console.log(err, r)
  })
  /*db.collection(dbs.posts).insertOne(req.body).toArray((e, r) => {
      res.send({e, r})
  })*/
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
    res.send({ e, r })
  })
})

