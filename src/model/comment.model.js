/* eslint-disable camelcase */

const db = require('../config/db')

const commentModel = {
  // router list = liat is data di tb
  selectAll: () => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM tb_comment', (err, res) => {
        if (err) {
          reject(err)
        }
        resolve(res)
      })
    })
  },

  // router insert
  store: (id, id_user, id_recipe, comments) => {
    return new Promise((resolve, reject) => {
      db.query(`INSERT INTO tb_comment (id, id_user, id_recipe, comments) VALUES (${id}, '${id_user}', '${id_recipe}', '${comments}')`,
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
      db.query(`DELETE FROM tb_comment WHERE id=${id}`, (err, res) => {
        if (err) {
          reject(err)
        }
        resolve(res)
      })
    })
  }
}

module.exports = commentModel
