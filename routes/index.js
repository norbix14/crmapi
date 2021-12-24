const express = require('express')

const signup = require('./signup')
const login = require('./login')
const cloudinary = require('./cloudinary')
const clients = require('./clients')
const products = require('./products')
const orders = require('./orders')
const users = require('./users')
const home = require('./home')

const app = express()

/**
 * Modulo encargado del enrutamiento general
 * 
 * @module routes/index
*/

/**
 * Funcion para manejar las rutas
*/
module.exports = function () {
	app.use('/', home())
	app.use('/crear-cuenta', signup())
	app.use('/iniciar-sesion', login())
	app.use('/cloud-cred', cloudinary())
	app.use('/clientes', clients())
	app.use('/productos', products())
	app.use('/pedidos', orders())
	app.use('/usuarios', users())
	return app
}
