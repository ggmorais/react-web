const cors = require('cors')
const express = require('express')
const bodyParser = require('body-parser')
const fs = require('fs')

const db = require('./db.js')


const app = express()
const port = 3001

app.use(cors())
app.use(bodyParser.urlencoded({extended: false}))

app.get('/sayHello', (req, res) => {
    res.json({message: `Hello ${req.query.name}!`})
})

app.get('/getPosts', (req, res) => {
    fs.readFile('db.json', (err, data) => {
        res.json(JSON.parse(String(data)).posts)
    })
})

app.post('/insertPost', (req, res) => {
    fs.readFile('db.json', (err, data) => {
        var db = JSON.parse(String(data))
        db.posts.push(JSON.parse(JSON.stringify(req.body)))
        fs.writeFile('db.json', JSON.stringify(db), r => {
            console.log(r)
        })
    })
})

app.listen(port)
