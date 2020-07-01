const express = require('express')
const app = express()
const routes = require('./routes/index')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv').config({ path: 'variables.env' })

const port = process.env.PORT || 5000
const host = process.env.HOST || '0.0.0.0'

mongoose.Promise = global.Promise
mongoose.connect(process.env.MONGODB_URL_REMOTE, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true,
	useFindAndModify: true
})
.then(() => console.log('--> MongoDB conectado <--'))
.catch(err => console.log('--> Error al conectar con Mongodb <--'))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.static('uploads'))

// CORS permite el intercambio de recursos desde otro servidor
// Hay que establecer los dominios permitidos que pueden acceder a la API
const whitelist = [process.env.FRONTEND_URL]
const corsOptions = {
	origin: (origin, callback) => {
		const dominioExisteEnListaBlanca = whitelist.some(dominio => dominio === origin)
		if(dominioExisteEnListaBlanca) {
			callback(null, true)
		} else {
			callback(new Error('Dominio no permitido por CORS'))
		}
	}
}
app.use(cors(corsOptions))

app.use('/', routes())

app.listen(port, host, () => {
	console.log(`--> Servidor en puerto ${port} <--`)
})
