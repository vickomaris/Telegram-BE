/* eslint-disable camelcase */

const recipeModel = require('../model/recipe.model')
const { success, failed } = require('../helper/response')

const recipeController = {
  list: (req, res) => {
    recipeModel.selectAll()
      .then((result) => {
        res.json(result)
      }).catch((err) => {
        res.json(err)
      })
  },
  detail: (req, res) => {
    const id = req.params.id
    recipeModel.selectDetail(id).then((result) => {
      res.json(result.rows)
    }).catch((err) => {
      res.json(err)
    })
  },
  detailTitle: (req, res) => {
    const title = req.params.title
    recipeModel.selectDetailTitle(title).then((result) => {
      res.json(result.rows)
    }).catch((err) => {
      res.json(err)
    })
  },
  // insert: (req, res) => {
  //   const { title, ingredients, photo, video, created_at } = req.body
  //   recipeModel.store(title, ingredients, photo, video, created_at).then((result) => {
  //     res.json(result)
  //   }).catch((err) => {
  //     res.json(err)
  //   })
  // },

  // insert photo
  insert: (req, res) => {
    try {
      // image
      const photo = req.file.filename
      // tangkap data dari body
      const { title, ingredients, video } = req.body

      const data = {
        title, ingredients, photo, video
      }
      recipeModel.store(data).then((result) => {
        success(res, result, 'success', ' success add recipe')
      }).catch((err) => {
        failed(res, err.message, 'failed', 'failed add recipe')
      })
    } catch (err) {
      failed(res, err.message, 'failed', 'internal server error')
    }
  },

  // insert: (req, res) => {
  //   try {
  //     // image
  //     const photo = req.files.filename
  //     // tangkap data dari body
  //     const { title, ingredients, video, created_at } = req.body

  //     const data = {
  //       title, ingredients, photo, video, created_at
  //     }

  //     recipeModel.insert(data).then((result) => {
  //       success(res, result, 'success', 'upload recipe success')
  //     }).catch((err) => {
  //       failed(res, err.message, 'failed', 'upload recipe failed')
  //     })
  //   } catch (err) {
  //     failed(res, err.message, 'failed', 'internal server error')
  //   }
  // },

  update: (req, res) => {
    const { title, ingredients, video, created_at } = req.body
    const id = req.params.id
    const photo = req.file.filename
    recipeModel.update(id, title, ingredients, photo, video, created_at).then((result) => {
      res.json(result)
    }).catch((err) => {
      res.json(err)
    })
  },
  destroy: (req, res) => {
    const { id } = req.params
    recipeModel
      .destroy(id)
      .then((result) => {
        res.json({
          message: 'success delete data',
          data: result
        })
      }).catch((err) => {
        res.json(err)
      })
  }
}

module.exports = recipeController
