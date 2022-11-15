
const db = require('../config/db')

const perekrutModel = {
  // router list
  selectAll: (limit, offset) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM perekrut LIMIT ${limit} OFFSET ${offset}`, (err, res) => {
        if (err) {
          reject(err)
        }
        resolve(res)
      })
    })
  },
  // lihat data by id
  selectDetail: (id_perekrut) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM perekrut WHERE id_perekrut=${id_perekrut}`, (err, res) => {
        if (err) {
          reject(err)
        }
        resolve(res)
      })
    })
  },
  // update
  update: (id_perekrut, username, email, perusahaan, jabatan, phone, password, bidang, kota, deskripsi, instagram, linkedin) => new Promise((resolve, reject) => {
    db.query(`UPDATE perekrut SET username = COALESCE ($1, username), 
    email = COALESCE ($2, email), 
    perusahaan = COALESCE ($3, perusahaan), 
    jabatan = COALESCE ($4, jabatan), 
    phone = COALESCE ($5, phone), 
    password = COALESCE ($6, password), 
    bidang = COALESCE ($7, bidang), 
    kota = COALESCE ($8, kota), 
    deskripsi = COALESCE ($9, deskripsi), 
    instagram = COALESCE ($10, instagram), 
    linkedin = COALESCE ($11, linkedin)
    WHERE id_perekrut = $12`,
    [username, email, perusahaan, jabatan, phone, password, bidang, kota, deskripsi, instagram, linkedin, id_perekrut],
    (err, result) => {
      if (err) {
        reject(err)
      } else {
        resolve(result)
      }
    })
  }),

  // router insert
  store: (username, email, phone, password) => {
    return new Promise((resolve, reject) => {
      db.query(`INSERT INTO perekrut (username, email, phone, password) VALUES ('${username}', '${email}', '${phone}', '${password}')`,
        (err, res) => {
          if (err) {
            reject(err)
          }
          resolve(res)
        })
    })
  },
  // model register
  register: ({ username, email, perusahaan, jabatan, phone, password, image }) => {
    return new Promise((resolve, reject) => {
      db.query(`INSERT INTO perekrut (username, email, perusahaan, jabatan, phone, password, image) VALUES ('${username}', '${email}', '${perusahaan}', '${jabatan}', '${phone}', '${password}', '${image}')`,
        (err, res) => {
          if (err) {
            reject(err)
          }
          resolve(res)
        })
    })
  },

  // delete by id
  destroy: (id_perekrut) => {
    return new Promise((resolve, reject) => {
      db.query(`DELETE FROM perekrut WHERE id_perekrut=${id_perekrut}`, (err, res) => {
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
      db.query(`SELECT * FROM perekrut WHERE email='${email}'`, (err, res) => {
        if (err) {
          reject(err)
        }
        resolve(res)
      })
    })
  }
}

module.exports = perekrutModel
