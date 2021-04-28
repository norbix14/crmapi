const { Schema, model } = require('mongoose')

/**
 * Modulo que contiene el esquema/modelo
 * de los productos
 *
 * @module models/Productos
*/

const ProductosSchema = new Schema({
	nombre: {
		type: String,
		trim: true
	},
	precio: {
		type: Number
	},
	imagen: {
		type: String
	}
})

module.exports = model('Productos', ProductosSchema)
