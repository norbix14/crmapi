require('dotenv').config({ path: 'variables.env' })
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const app = express()
const routes = require('./routes/index')
const Whitelist = require('./config/URLWhitelist')

const port = process.env.PORT || 4000
const host = process.env.HOST || '0.0.0.0'

mongoose.Promise = global.Promise

mongoose.connect(process.env.MONGODB_URL_REMOTE, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true,
	useFindAndModify: false
})
.then(() => console.log('MongoDB conectado'))
.catch(err => console.log('Error al conectar con MongoDB'))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

/*const corsOptions = {
	origin: (origin, callback) => {
		const dominioOk = Whitelist.some(dominio => dominio === origin)
		if(dominioOk) {
			callback(null, true)
		} else {
			callback(new Error('Dominio no permitido por CORS'))
		}
	}
}

app.use(cors(corsOptions))
*/

app.use(cors())

app.use('/', routes())

app.listen(port, host, () => console.log(`Servidor en puerto ${port}`))
