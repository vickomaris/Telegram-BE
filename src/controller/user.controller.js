const userModel = require('../model/user.model')
const { success, failed } = require('../helper/response')

const userController = {
  // listLimit: (req, res) => {
  //   const sort = req.query.sort
  //   const asc = req.query.asc
  //   const page = parseInt(req.query.page) || 1
  //   const limit = parseInt(req.query.limit) || 5
  //   const offset = (page - 1) * limit
  //   userModel.selectAll(sort, asc, limit, offset)
  //     .then((result) => {
  //       success(res, result, 'success', 'get all user success')
  //     }).catch((err) => {
  //       failed(res, err.message, 'failed', 'get all user failed')
  //     })
  // },

  list: (req, res) => {
    userModel
      .selectAll()
      .then((result) => {
        success(res, result, 'success', 'get all user succes')
      })
      .catch((err) => {
        // res.json(err)
        failed(res, err.message, 'failed', 'get all user failed')
      })
  },

  detail: (req, res) => {
    const id_user = req.params.id
    userModel.selectDetail(id_user).then((result) => {
      res.json(result.rows)
    }).catch((err) => {
      res.json(err)
    })
  },
  insert: (req, res) => {
    const { username, email, phone, password, jobdesk, city, company, description, ig, github, gitlab, image } = req.body
    // const photo = req.file.filename
    userModel.store(username, email, phone, password, jobdesk, city, company, description, ig, github, gitlab, image).then((result) => {
      success(res, null, 'success', 'insert user success')
    }).catch((err) => {
      failed(res, err.message, 'failed', 'insert user failed')
    })
  },
  update: (req, res) => {
    const { username, email, password, nickname, phone, bio } = req.body
    const id_user = req.params.id_user
    // const image = req.file.filename
    userModel.update(id_user, username, email, password, nickname, phone, bio).then((result) => {
      success(res, result, 'success', 'update user success')
      // console.log(res)
    }).catch((err) => {
      failed(res, err.message, 'failed', 'update user failed')
    })
  },
  updatePhoto: (req, res) => {
    const id_user = req.params.id_user
    const image = req.file.filename
    userModel.updatePhoto(id_user, image).then((result) => {
      success(res, result, 'success', 'update user success')
      // console.log(res)
    }).catch((err) => {
      failed(res, err.message, 'failed', 'update user failed')
    })
  },
  destroy: (req, res) => {
    const { id_user } = req.params
    userModel
      .destroy(id_user)
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
