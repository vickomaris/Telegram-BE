require('dotenv').config()
// DEKLARE LIBRARY
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

// BUAT ROUTE
const userRouter = require('./src/router/user.routes')
const recipeRouter = require('./src/router/recipe.routes')

const app = express()
app.use(bodyParser.json())
app.use(cors())
app.use(userRouter)
app.use(recipeRouter)

// jalankan express

app.listen(process.env.PORT, () => {
  console.log('SERVICE RUNNING ON PORT 3001')
})
