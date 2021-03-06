const express = require('express')
const app = express.Router()
const db = require('../controller/dbController')
const jwt = require('jsonwebtoken')
const routeErrorHandler = require('../middleware/errorMiddleware')
const { checkPassword } = require('../helper/bcryptHelper')
const secret = 'ini kode rahasia saya'

app.post('/login', (req, res, next) => {
  const username = req.body.username
  const password = req.body.password
  let user;
  db.get('users', { username })

    .then(getUserResult => {
      if (getUserResult.length) {
        user = getUserResult[0]
        return checkPassword(password, user.password)
      } else {
        res.status(401).send('Unauthorized')
      }
    })

    .then(checkPasswordResult => {
      if (checkPasswordResult) {
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