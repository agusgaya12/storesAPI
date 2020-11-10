const express = require('express')
const app = express.Router()
const db = require('../../controller/dbController')

app.get('/goods', (req, res) => {
    const result = db.get('goods', req.query)
    res.send(result)
})

module.exports = app