
const db = require('../config/db')

const userModel = {
  // router list
  // selectLimit: (sort, asc, limit, offset) => {
  //   return new Promise((resolve, reject) => {
  //     db.query(`SELECT * FROM users ORDER BY ${sort} ${asc} LIMIT ${limit} OFFSET ${offset}`, (err, res) => {
  //       if (err) {
  //         reject(err)
  //       }
  //       resolve(res)
  //     })
  //   })
  // },

  selectAll: () => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM users', (err, result) => {
        if (err) {
          reject(err)
        } else {
          resolve(result)
        }
      })
    })
  },
  // lihat data by id
  selectDetail: (id_user) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM users WHERE id_user=${id_user}`, (err, res) => {
        if (err) {
          reject(err)
        }
        resolve(res)
      })
    })
  },
  // update
  update: (id_user, username, email, password, nickname, phone, bio) => new Promise((resolve, reject) => {
    db.query(`UPDATE users SET username = COALESCE ($1, username), 
    email = COALESCE ($2, email),
    password = COALESCE ($3, password), 
    nickname = COALESCE ($4, nickname), 
    phone = COALESCE ($5, phone), 
    bio = COALESCE ($6, bio)
    WHERE id_user = $7`,
    [username, email, password, nickname, phone, bio, id_user],
    (err, result) => {
      if (err) {
        reject(err)
      } else {
        resolve(result)
      }
    })
  }),
  // update
  updatePhoto: (id_user, image) => new Promise((resolve, reject) => {
    db.query(`UPDATE users SET image = '${image}' where id_user = ${id_user}`, (err, result) => {
      if (err) {
        reject(err)
      } else {
        resolve(result)
      }
    })
  }),

  // router insert
  store: (username, email, password) => {
    return new Promise((resolve, reject) => {
      db.query(`INSERT INTO users (username, email,  password) VALUES ('${username}', '${email}', '${password}')`,
        (err, res) => {
          if (err) {
            reject(err)
          }
          resolve(res)
        })
    })
  },
  // model register
  register: ({ username, email, password, image }) => {
    return new Promise((resolve, reject) => {
      db.query(`INSERT INTO users (username, email, password, image) VALUES ('${username}', '${email}', '${password}', '${image}')`,
        (err, res) => {
          if (err) {
            reject(err)
          }
          resolve(res)
        })
    })
  },

  // delete by id
  destroy: (id_user) => {
    return new Promise((resolve, reject) => {
      db.query(`DELETE FROM users WHERE id_user=${id_user}`, (err, res) => {
        if (err) {
          reject(err)
        }
        resolve(res)
      })
    })
  },

  // model login
  checkUsername: (email) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM users WHERE email='${email}'`, (err, res) => {
        if (err) {
          reject(err)
        }
        resolve(res)
      })
    })
  }
}

module.exports = userModel
