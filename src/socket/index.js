const { store, list } = require('../model/chat.model')

module.exports = (io, socket) => {
  socket.on('ping', (data) => {
    socket.emit('ping-response', data)
  })
  // private chat
  socket.on('join-room', (data) => {
    const { id_user, username, email, password, nickname, phone, bio } = data
    socket.join(id_user)
  })

  // send messages
  socket.on('send-message', (data) => {
    console.log(data)
    store(data).then(async () => {
      const listChats = await list(data.sender, data.receiver)
      io.to(data.receiver).emit('send-message-response', listChats.rows)
      console.log(listChats.rows)
    }).catch((err) => {
      console.log(err)
    })
  })

  // history chat
  socket.on('chat-history', async (data) => {
    console.log(data)
    try {
      const listChats = await list(data.sender, data.receiver)
      io.to(data.sender).emit('send-message-response', listChats.rows)
      console.log(listChats.rows)
    } catch (err) {
      console.log('Error chat-history')
    }
  })
}
