const userModel = require('../model/perekrut.model')
const { success, failed, successWithToken } = require('../helper/response')

const bcyrpt = require('bcrypt')
const jwtToken = require('../helper/generateJWT')
module.exports = {
  register: (req, res) => {
    try {
      // image
      // const image = req.file.filename
      // tangkap data dari body
      const { username, email, perusahaan, jabatan, phone, password } = req.body
      bcyrpt.hash(password, 10, (err, hash) => {
        if (err) {
          failed(res, err.message, 'failed', 'fail hash password')
        }
        // console.log(hash)
        const data = {
          username,
          email,
          perusahaan,
          jabatan,
          phone,
          password: hash,
          image: req.file ? req.file.filename : 'default.png'
        }
        userModel.register(data).then((result) => {
          success(res, result, 'success', 'register success')
        }).catch((err) => {
          failed(res, err.message, 'failed', 'register failed')
        })
      })
    } catch (err) {
      failed(res, err.message, 'failed', 'internal server error')
    }
  },

  login: async (req, res) => {
    const { email, password } = req.body
    userModel.checkUsername(email).then((result) => {
      // console.log(result.rows)
      const user = result.rows[0]
      // console.log(user)
      if (result.rowCount > 0) {
        bcyrpt.compare(password, result.rows[0].password).then(async (result) => {
          if (result) {
            const token = await jwtToken({
              email: user.email
              // level: user.level
            })
            // console.log(email)
            successWithToken(res, { token, data: user }, 'success', 'login success')
          } else {
            // ketika password salah
            failed(res, null, 'failed', 'password dan email salah')
          }
        })
      } else {
        // ketika username salah
        failed(res, null, 'failed', 'password dan email salah')
      }
    }).catch((err) => {
      failed(res, err.message, 'failed', 'internal server error')
    })
  }
}
