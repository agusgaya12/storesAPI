const express = require('express')
const app = express.Router()
const db = require('../../controller/dbController')
const passport = require('../../middleware/authenticationMiddleware')
const routeErrorHandler = require('../../middleware/errorMiddleware')

app.use(passport.authenticate('bearer', { session: false }))

app.post('/stores', (req, res, next) => {
    req.body.userId = req.user.id
    db.add('stores', req.body)
        .then(result => {
            res.send(result)
        })
        .catch(err => {
            next(err)
        })
})

app.use(routeErrorHandler)

module.exports = app