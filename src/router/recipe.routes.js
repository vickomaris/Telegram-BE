const express = require('express')
const { list, detail, insert, destroy, update, detailTitle } = require('../controller/recipe.controller')
const router = express.Router()

router
  .get('/recipe', list)
  .get('/recipe/:id', detail)
  .post('/recipe/:title', detailTitle)
  .post('/recipe/', insert)
  .put('/recipe/:id', update)
  .delete('/recipe/:id', destroy)

module.exports = router
