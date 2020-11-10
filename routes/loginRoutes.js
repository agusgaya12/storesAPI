const express = require('express')
const app = express.Router()
const db = require('../controller/dbController')
const jwt = require('jsonwebtoken')
const routeErrorHandler = require('../middleware/errorMiddleware')
const secret = 'ini kode rahasia saya'

app.post('/login', (req, res, next) => {
  db.get('users', req.body)
    .then(result => {
      if (result.length) {
        const user = result[0]
        const token = jwt.sign(user, secret, {
          expiresIn: '6h'
        })
        user.token = token
        res.send(user)
      } else {
        res.status(401).send('Unauthorized')
      }
    })
    .catch((err) => {
      next(err)
    })
})

app.use(routeErrorHandler)

module.exports = app