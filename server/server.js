const cors = require('cors')
const express = require('express')
const bodyParser = require('body-parser')
const fs = require('fs')
const MG = require('mongodb').MongoClient


const app = express()
const port = 3001

const dbs = {
    //host: 'mongodb://localhost:27017',
    host: 'mongodb+srv://root:gm14022001@mongo-db-cekcg.mongodb.net/test?retryWrites=true&w=majority',
    main: 'react',
    users: 'users',
    posts: 'posts'
}


app.use(cors())
app.use(bodyParser.urlencoded({extended: false}))


app.get('/getPosts', (req, res) => {
    MG.connect(dbs.host, (err, db) => {
        if (err) res.send({error: err})
        db.db(dbs.main).collection(dbs.posts).find(req.query).toArray((err, r) => {
            res.send({err, r})
            db.close()
        })
    })
})

app.post('/insertPost', (req, res) => {
    MG.connect(dbs.host, (err, db) => {
        if (err) res.send({error: err})
        db.db(dbs.main).collection(dbs.posts).insertOne(req.body)
        db.close()
    })
})

app.get('/getUsers', (req, res) => {
    MG.connect(dbs.host, (err, db) => {
        if (err) res.send({error: err})
        db.db(dbs.main).collection(dbs.users).find().toArray((err, r) => {
            res.send({err, r})
        })
        db.close()
    })
})

app.post('/insertUser', (req, res) => {
    MG.connect(dbs.host, (err, db) => {
        if (err) res.send({error: err})
        db.db(dbs.main).collection(dbs.users).insertOne(req.body)
        db.close()
    })
})

app.post('/login', (req, res) => {
    MG.connect(dbs.host, (err, db) => {
        if (err) res.send(err)
        db.db(dbs.main).collection(dbs.users).find(req.body).toArray((err, r) => {
            res.send({err, r})
        })
    })
})



app.listen(port)
