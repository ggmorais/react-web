const MG = require('mongodb').MongoClient


module.exports = class db {

    constructor(infos) {
        this.infos = infos
    }

    call(method) {
        MG.connect(this.infos.host, (err, db) => {
            if (err) return false
            this.db = db
            eval('this.' + method + '()')
        })
    }

    listUsers(where = {}) {
        this.db.db(this.infos.main)
            .collection(this.infos.posts)
            .find(where)
            .toArray((err, r) => {
                new Promise((resolve, reject) => {
                    if (r) resolve(r)
                    if (err) reject(err)
                })
        })
    }

    insertPost() {
        db.db(dbs.main).collection(dbs.posts).find(req.query).toArray((err, r) => {
            if (err) res.send({error: err})
            res.send(r)
            db.close()
        })
    }

}
