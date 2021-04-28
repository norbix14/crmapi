const Pedidos = require('../models/Pedidos')
const {
	newOrderResponse,
	showOrdersResponse,
	deleteOrderResponse
} = require('../responses/orders')
const internalError = require('../responses/internalError')

/**
 * Modulo encargado del manejo de los pedidos
 *
 * @module controllers/pedidosController
*/

/**
 * Funcion para verificar si un pedido existe
 * 
 * @param {object} req - user request
 * @param {object} res - server response
 * @param {function} next - continue to the next middleware
 * @returns {Promise}
*/
exports.verificarPedido = async (req, res, next) => {
	const { params } = req
	try {
		const { idPedido } = params
		const order = await Pedidos.findById({ _id: idPedido })
		req.order = order
		next()
	} catch (error) {
		req.order = null
		next()
	}
}

/**
 * Funcion para agregar un nuevo pedido
 * @param {object} req - user request
 * @param {object} res - server response
 * @returns {Promise}
*/
exports.nuevoPedido = async (req, res) => {
	const { body } = req
	try {
		const newOrder = new Pedidos(body)
		await newOrder.save()
		return res.status(200).json(newOrderResponse(200))
	} catch(error) {
		return res.status(500).json(internalError({ errors: [ error ] }))
	}
}

/**
 * Funcion para obtener todos los pedidos
 * 
 * @param {object} req - user request
 * @param {object} res - server response
 * @returns {Promise}
*/
exports.mostrarPedidos = async (req, res) => {
	try {
		const orders = await Pedidos.find({}).populate('cliente').populate(
			{
				path: 'pedido.producto',
				model: 'Productos'
			}
		)
		return res.status(200).json(showOrdersResponse(200, { orders }))
	} catch(error) {
		return res.status(500).json(internalError({ errors: [ error ] }))
	}
}

/**
 * Funcion para eliminar un pedido
 * @param {object} req - user request
 * @param {object} res - server response
 * @returns {Promise}
*/
exports.eliminarPedido = async (req, res) => {
	const { order } = req
	try {
		if (!order) {
			return res.status(404).json(deleteOrderResponse(404))
		}
		const { _id } = order
		await Pedidos.findOneAndDelete({ _id })
		return res.status(200).json(deleteOrderResponse(200))
	} catch(error) {
		return res.status(500).json(internalError({ errors: [ error ] }))
	}
}
