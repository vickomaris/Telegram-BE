/* eslint-disable camelcase */

const db = require('../config/db')

const recipeModel = {
  // router list
  selectAll: () => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM tb_recipes ORDER BY title ASC', (err, res) => {
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
      db.query(`SELECT * FROM tb_recipes WHERE id=${id}`, (err, res) => {
        if (err) {
          reject(err)
        }
        resolve(res)
      })
    })
  },
  // lihat data by title
  selectDetailTitle: (title) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM tb_recipes WHERE title LIKE '%${title}%'`, (err, res) => {
        if (err) {
          reject(err)
        }
        resolve(res)
      })
    })
  },
  // update
  update: (id, title, ingredients, photo, video, created_at) => new Promise((resolve, reject) => {
    db.query(`UPDATE tb_recipes SET  title = '${title}', ingredients = '${ingredients}', photo = '${photo}', video = '${video}', created_at = '${created_at}' WHERE id = ${id}`, (err, result) => {
      if (err) {
        reject(err)
      } else {
        resolve(result)
      }
    })
  }),

  // router insert
  store: (title, ingredients, photo, video, created_at) => {
    return new Promise((resolve, reject) => {
      db.query(`INSERT INTO tb_recipes ( title, ingredients, photo, video, created_at) VALUES ( '${title}', '${ingredients}', '${photo}', '${video}', '${created_at}')`,
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
      db.query(`DELETE FROM tb_recipes WHERE id=${id}`, (err, res) => {
        if (err) {
          reject(err)
        }
        resolve(res)
      })
    })
  }
}

module.exports = recipeModel
