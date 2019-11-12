const cors = require('cors')
const express = require('express')
const bodyParser = require('body-parser')
const fs = require('fs')
const MG = require('mongodb').MongoClient


const app = express()
const port = 3001

const dbs = {
    host: 'mongodb://localhost:27017',
    main: 'react',
    users: 'users',
    posts: 'posts'
}

app.use(cors())
app.use(bodyParser.urlencoded({extended: false}))


app.get('/getPosts', (req, res) => {
    /*fs.readFile('db.json', (err, data) => {
        res.json(JSON.parse(String(data)).posts)
    })*/
    MG.connect(dbs.host, (err, db) => {
        db.db(dbs.main).collection(dbs.posts).find(req.query).toArray((err, r) => {
            if (err) res.send({error: err})
            res.send(r)
            db.close()
        })
    })
})

app.post('/insertPost', (req, res) => {
    console.log(req.body)
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
            if (err) res.send({error: err})
            res.send(r)
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



app.listen(port)
