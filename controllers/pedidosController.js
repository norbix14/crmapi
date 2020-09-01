const Clientes = require('../models/Clientes')
const Pedidos = require('../models/Pedidos')
const Productos = require('../models/Productos')

exports.nuevoPedido = async (req, res, next) => {
	try {
		const pedido = new Pedidos(req.body)
		await pedido.save()
		return res.status(200).json({
			mensaje: 'Nuevo pedido agregado'
		})
	} catch(err) {
		res.status(500).json({
			mensaje: 'Ha ocurrido un error'
		})
		next()
	}
}

exports.mostrarPedidos = async (req, res, next) => {
	try {
		const pedidos = await Pedidos.find({})
		.populate('cliente')
		.populate({
			path: 'pedido.producto',
			model: 'Productos'
		})
		if(!pedidos) {
			res.status(404).json({
				mensaje: 'No hay pedidos'
			})
			return next()
		}
		return res.status(200).json({
			mensaje: 'Pedidos encontrados',
			datos: pedidos
		})
	} catch(err) {
		res.status(500).json({
			mensaje: 'Ha ocurrido un error'
		})
		next()
	}
}

exports.eliminarPedido = async (req, res, next) => {
	try {
		await Pedidos.findOneAndDelete({
			_id: req.params.idPedido
		})
		return res.status(200).json({
			mensaje: 'Pedido eliminado'
		})
	} catch(err) {
		res.status(500).json({
			mensaje: 'Ha ocurrido un error'
		})
		next()
	}
}
