const express = require('express')
const { list, detail, insert, update, destroy } = require('../controller/perekrut.controler')
const { register, login } = require('../controller/authrekruter.controller')
const router = express.Router()

const jwtAuth = require('../middleware/jwtAuth')
// const { isAdmin } = require('../middleware/authorization')
const upload = require('../middleware/photo_perekrut')
const deleteFile = require('../middleware/delete_perekrut')

router
  .get('/perekrut', list)
  .get('/perekrut/:id', detail)
  .post('/perekrut/', insert)
  .put('/perekrut/:id_perekrut', update)
  .delete('/perekrut/:id_perekrut', destroy)

  // register
  .post('/registerper', register)
  // login
  .post('/loginper', login)

module.exports = router
