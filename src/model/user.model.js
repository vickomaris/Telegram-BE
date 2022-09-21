
const db = require('../config/db')

const userModel = {
  // router list
  selectAll: (limit, offset) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM tb_users LIMIT ${limit} OFFSET ${offset}`, (err, res) => {
        if (err) {
          reject(err)
        }
        resolve(res)
      })
    })
  },
  // lihat data by id
  selectDetail: (id) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM tb_users WHERE id=${id}`, (err, res) => {
        if (err) {
          reject(err)
        }
        resolve(res)
      })
    })
  },
  // update
  update: (id, username, email, password, phone, photo, level) => new Promise((resolve, reject) => {
    db.query(`UPDATE tb_users SET username = '${username}', email = '${email}', password = '${password}', phone = '${phone}', photo = '${photo}', level = ${level} WHERE id = ${id}`, (err, result) => {
      if (err) {
        reject(err)
      } else {
        resolve(result)
      }
    })
  }),

  // router insert
  store: (username, email, password, phone, photo, level) => {
    return new Promise((resolve, reject) => {
      db.query(`INSERT INTO tb_users (username, email, password, phone, photo, level) VALUES ('${username}', '${email}', '${password}', '${phone}', '${photo}', ${level})`,
        (err, res) => {
          if (err) {
            reject(err)
          }
          resolve(res)
        })
    })
  },
  // model register
  register: ({ username, email, password, phone, photo, level }) => {
    return new Promise((resolve, reject) => {
      db.query(`INSERT INTO tb_users(username, email, password, phone, photo, level) VALUES ('${username}', '${email}', '${password}', '${phone}', '${photo}', ${level})`,
        (err, res) => {
          if (err) {
            reject(err)
          }
          resolve(res)
        })
    })
  },

  // delete by id
  destroy: (id) => {
    return new Promise((resolve, reject) => {
      db.query(`DELETE FROM tb_users WHERE id=${id}`, (err, res) => {
        if (err) {
          reject(err)
        }
        resolve(res)
      })
    })
  },

  // model login
  checkUsername: (username) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM tb_users WHERE username='${username}'`, (err, res) => {
        if (err) {
          reject(err)
        }
        resolve(res)
      })
    })
  }
}

module.exports = userModel
