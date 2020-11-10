const express = require('express')
const app = express.Router()
const db = require('../../controller/dbController')

app.patch("/inventory", function (req, res) {
    const body = req.body
    let id = req.query.id
    const getQuery = db.get('inventories', id, body)

    if (getQuery) {
        res.send(db.edit('inventories', body))
    } else {
        res.status(404).send("Not found")
    }
    return
})

module.exports = app