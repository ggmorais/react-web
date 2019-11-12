const MongoClient = require('mongodb').MongoClient


module.exports = (url, dbname) => MongoClient.connect(url, (err, db) => {
    return db.db(dbname)
})

