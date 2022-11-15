const perekrutModel = require('../model/perekrut.model')
const { success, failed } = require('../helper/response')

const perekrutController = {
  list: (req, res) => {
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 100
    const offset = (page - 1) * limit
    perekrutModel.selectAll(limit, offset)
      .then((result) => {
        success(res, result, 'success', 'get all user success')
      }).catch((err) => {
        failed(res, err.message, 'failed', 'get all user failed')
      })
  },
  detail: (req, res) => {
    const id_perekrut = req.params.id
    perekrutModel.selectDetail(id_perekrut).then((result) => {
      res.json(result.rows)
    }).catch((err) => {
      res.json(err)
    })
  },
  insert: (req, res) => {
    const { username, email, perusahaan, jabatan, phone, password } = req.body
    // const photo = req.file.filename
    perekrutModel.store(username, email, perusahaan, jabatan, phone, password).then((result) => {
      success(res, null, 'success', 'insert user success')
    }).catch((err) => {
      failed(res, err.message, 'failed', 'insert user failed')
    })
  },
  update: (req, res) => {
    const { username, email, perusahaan, jabatan, phone, password, bidang, kota, deskripsi, instagram, linkedin } = req.body
    const id_perekrut = req.params.id_perekrut
    // const image = req.file.filename
    perekrutModel.update(id_perekrut, username, email, perusahaan, jabatan, phone, password, bidang, kota, deskripsi, instagram, linkedin).then((result) => {
      success(res, null, 'success', 'update user success')
      console.log(res)
      console.log(username)
    }).catch((err) => {
      failed(res, err.message, 'failed', 'update user failed')
    })
  },
  destroy: (req, res) => {
    const { id_perekrut } = req.params
    perekrutModel
      .destroy(id_perekrut)
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

module.exports = perekrutController
