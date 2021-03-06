const { hash } = require('bcrypt')
const express = require('express')
const app = express.Router()
const db = require('../controller/dbController')
const { salt } = require('../helper/bcryptHelper')
const routeErrorHandler = require('../middleware/errorMiddleware')

app.post('/register', (req, res, next) => {
  const username = req.body.username
  const password = req.body.password
  salt(password)
    .then(hashedPassword => {
      const user = {
        username,
        password: hashedPassword
      }
      return db.add('users', user)
    })
    .then(addUserResult => {
      if (!addUserResult) {
        res.status(400).send('bad format')
      } else {
        res.send(addUserResult)
      }
    })
    .catch(err => {
      next(err)
    })
})

app.use(routeErrorHandler)

module.exports = app