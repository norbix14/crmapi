require('dotenv').config()
const express = require('express')
const cors = require('cors')
const { MongoConn } = require('./config/db')
const routes = require('./routes')
const {
  httpCreateError,
  httpErrorHandler
} = require('./handlers/http-error-handler')

const app = express()

const port = Number(process.env.PORT) || 4000
const host = process.env.HOST || '0.0.0.0'

const mongoURI = process.env.MONGODB_URI_REMOTE
MongoConn(mongoURI)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(cors())

app.use(routes())

app.use(httpCreateError)

app.use(httpErrorHandler)

app.listen(port, host, () => {
  console.log(`Servidor en puerto ${port}`)
})
