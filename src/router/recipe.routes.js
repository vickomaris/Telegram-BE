/* eslint-disable camelcase */
const express = require('express')
const { list, detail, insert, destroy, update, detailTitle } = require('../controller/recipe.controller')
const router = express.Router()

const photo_foods = require('../middleware/photo_food')

router
  .get('/recipe/', list)
  .get('/recipe/:id', detail)
  .post('/recipe/:title', detailTitle)
  .post('/recipe/', insert)
  .post('/recipe/upload', photo_foods, insert)
  .put('/recipe/:id', update)
  .delete('/recipe/:id', destroy)

module.exports = router
