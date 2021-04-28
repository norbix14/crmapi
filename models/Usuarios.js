const { Schema, model } = require('mongoose')

/**
 * Modulo que contiene el esquema/modelo
 * de los usuarios
 *
 * @module models/Usuarios
*/

const UsuariosSchema = new Schema({
	email: {
		type: String,
		unique: true,
		lowercase: true,
		trim: true,
		required: true
	},
	nombre: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	}
})

module.exports = model('Usuarios', UsuariosSchema)
