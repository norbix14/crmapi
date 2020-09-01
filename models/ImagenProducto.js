const mongoose = require('mongoose')

const Schema = mongoose.Schema

const imagenProductoSchema = new Schema({
	secure_url: String,
	public_id: String,
	created_at: Date,
	owner: {
		type: Schema.ObjectId,
		ref: 'Productos'
	}
})

module.exports = mongoose.model('ImagenProducto', imagenProductoSchema)
