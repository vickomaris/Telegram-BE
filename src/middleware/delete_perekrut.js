const fs = require('fs')
const userModel = require('../model/user.model')

const remove = async (req, res, next) => {
  const id_perekrut = req.params.id_perekrut
  const data = await userModel.selectDetail(id_perekrut)
  if (data) {
    if (data.rows[0].image) {
      const img = data.rows[0].image
      if (img !== 'default.png') {
        fs.unlink(`./public/photo_perekrut/${img}`, (err) => {
          if (err) {
            res.json({
              message: 'delete failed',
              error: err
            })
          }
        })
      }
      next()
    } else {
      res.json('There is no profile picture')
    }
  } else {
    res.json('Profile is not found')
  }
  // if (data.rows[0].photo) {
  //   const photo = data.rows[0].photo;
  //   fs.unlink(`./public/foto user/${photo}`, (err) => {
  //     if (err) {
  //       console.log(err);
  //       next();
  //     }
  //   });
  //   next();
  // } else {
  //   res.json("Not found image");
  // }
}

module.exports = remove
