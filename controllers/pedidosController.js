const Clientes = require('../models/Clientes')
const Pedidos = require('../models/Pedidos')
const Productos = require('../models/Productos')

exports.nuevoPedido = async (req, res, next) => {
	try {
		const pedido = new Pedidos(req.body)
		await pedido.save()
		return res.status(200).json({
			error: false,
			mensaje: 'Nuevo pedido agregado'
		})
	} catch(err) {
		res.status(500).json({
			error: true,
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
				error: true,
				mensaje: 'No hay pedidos'
			})
			return next()
		}
		return res.status(200).json({
			error: false,
			datos: pedidos
		})
	} catch(err) {
		res.status(500).json({
			error: true,
			mensaje: 'Ha ocurrido un error'
		})
		next()
	}
}

exports.mostrarPedido = async (req, res, next) => {
	try {
		const pedido = await Pedidos.findById(req.params.idPedido)
		.populate('cliente')
		.populate({
			path: 'pedido.producto',
			model: 'Productos'
		})
		if(!pedido) {
			res.status(404).json({
				error: true,
				mensaje: 'El pedido no existe'
			})
			return next()
		}
		return res.status(200).json({
			error: false,
			datos: pedido
		})
	} catch(err) {
		res.status(500).json({
			error: true,
			mensaje: 'Ha ocurrido un error'
		})
		next()
	}
}

exports.actualizarPedido = async (req, res, next) => {
	try {
		let pedido = await Pedidos.findOneAndUpdate(
			{
				_id: req.params.idPedido
			},
			req.body,
			{
				new: true
			}
		)
		.populate('cliente')
		.populate({
			path: 'pedido.producto',
			model: 'Productos'
		})
		if(!pedido) {
			res.status(404).json({
				error: true,
				mensaje: 'No se ha podido actualizar el pedido'
			})
			return next()
		}
		return res.status(200).json({
			error: false,
			mensaje: 'Pedido actualizado'
		})
	} catch(err) {
		res.status(500).json({
			error: true,
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
			error: false,
			mensaje: 'Pedido eliminado'
		})
	} catch(err) {
		res.status(500).json({
			error: true,
			mensaje: 'Ha ocurrido un error'
		})
		next()
	}
}
