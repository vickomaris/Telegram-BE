const userModel = require('../model/user.model')
const { success, failed } = require('../helper/response')

const userController = {
  list: (req, res) => {
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 5
    const offset = (page - 1) * limit
    userModel.selectAll(limit, offset)
      .then((result) => {
        success(res, result, 'success', 'get all user success')
      }).catch((err) => {
        failed(res, err.message, 'failed', 'get all user failed')
      })
  },
  detail: (req, res) => {
    const id = req.params.id
    userModel.selectDetail(id).then((result) => {
      res.json(result.rows)
    }).catch((err) => {
      res.json(err)
    })
  },
  insert: (req, res) => {
    const { username, email, password, phone, photo, level } = req.body
    userModel.store(username, email, password, phone, photo, level).then((result) => {
      success(res, null, 'success', 'insert user success')
    }).catch((err) => {
      failed(res, err.message, 'failed', 'insert user failed')
    })
  },
  update: (req, res) => {
    const { username, email, password, phone, photo, level } = req.body
    const id = req.params.id
    userModel.update(id, username, email, password, phone, photo, level).then((result) => {
      res.json(result)
    }).catch((err) => {
      res.json(err)
    })
  },
  destroy: (req, res) => {
    const { id } = req.params
    userModel
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

module.exports = userController
