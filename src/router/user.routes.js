const express = require('express')
const { list, detail, insert, update, destroy } = require('../controller/user.controller')
const { register, login } = require('../controller/auth.controller')
const router = express.Router()

const jwtAuth = require('../middleware/jwtAuth')
const { isAdmin } = require('../middleware/authorization')
const upload = require('../middleware/upload')

router
  .get('/user', jwtAuth, isAdmin, list)
  .get('/user/:id', detail)
  .post('/user/', insert)
  .put('/user/:id', update)
  .delete('/user/:id', destroy)

  // register
  .post('/register', upload, register)
  // login
  .post('/login', login)

module.exports = router
