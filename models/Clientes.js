const { Schema, model } = require('mongoose')

/**
 * Modulo que contiene el esquema/modelo
 * de los clientes
 * 
 * @module models/Clientes
*/

const ClientesSchema = new Schema({
	nombre: {
		type: String,
		trim: true,
		required: true
	},
	apellido: {
		type: String,
		trim: true,
		required: true
	},
	empresa: {
		type: String,
		trim: true
	},
	email: {
		type: String,
		unique: true,
		lowercase: true,
		trim: true,
		required: true
	},
	telefono: {
		type: String,
		trim: true
	}
})

module.exports = model('Clientes', ClientesSchema)
