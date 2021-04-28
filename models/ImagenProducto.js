const { Schema, model } = require('mongoose')

/**
 * Modulo que contiene el esquema/modelo
 * de la imagen de un producto
 *
 * @module models/ImagenProducto
*/

const ImagenProductoSchema = new Schema({
	secure_url: String,
	public_id: String,
	created_at: {
		type: Date,
		default: new Date()
	},
	owner: {
		type: Schema.ObjectId,
		ref: 'Productos'
	}
})

module.exports = model('ImagenProducto', ImagenProductoSchema)
