const { Schema, model } = require('mongoose')

/**
 * Modulo que contiene el esquema/modelo
 * de los pedidos
 *
 * @module models/Pedidos
*/

const PedidosSchema = new Schema({
	cliente: {
		type: Schema.ObjectId,
		ref: 'Clientes'
	},
	pedido: [
		{
			producto: {
				type: Schema.ObjectId,
				ref: 'Productos'
			},
			cantidad: {
				type: Number
			}
		}
	],
	total: {
		type: Number
	}
})

module.exports = model('Pedidos', PedidosSchema)
