/* eslint-disable no-template-curly-in-string */

const db = require('../config/db')

const userModel = {
  // router list
  selectAll: (_limit, _offset) => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM tb_users LIMIT ${limit} OFFSET ${offset}', (err, res) => {
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
  update: (id, name, email, phone, password) => new Promise((resolve, reject) => {
    db.query(`UPDATE tb_users SET name = '${name}', email = '${email}', phone = '${phone}', password = '${password}' WHERE id = ${id}`, (err, result) => {
      if (err) {
        reject(err)
      } else {
        resolve(result)
      }
    })
  }),

  // router insert
  store: (id, name, email, phone, password) => {
    return new Promise((resolve, reject) => {
      db.query(`INSERT INTO tb_users (id, name, email, phone, password) VALUES (${id}, '${name}', '${email}', '${phone}', '${password}')`,
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
  }
}

module.exports = userModel
