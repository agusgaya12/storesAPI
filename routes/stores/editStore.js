const express = require('express')
const app = express.Router()
const db = require('../../controller/dbController')
// const authentication = require('../../middleware/authenticationMiddleware')
const passport = require('passport')
const { result } = require('lodash')

// app.use(authentication)
app.use(passport.authenticate('bearer', { session: false }))

app.patch('/stores', (req, res) => {
    const id = req.query.id
    const body = req.body
    db.edit('stores', id, body)
        .then(result => {
            if (!result) {
                res.status(400).send("Wrong body")
            } else {
                res.send(result)
            }
        })
        .catch(err => {
            res.status(500).send(err)
        })

})

module.exports = app