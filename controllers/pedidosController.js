const Clientes = require('../models/Clientes')
const Pedidos = require('../models/Pedidos')
const Productos = require('../models/Productos')

exports.nuevoPedido = async (req, res, next) => {
	try {
		const pedido = new Pedidos(req.body)
		await pedido.save()
		return res.json({
			mensaje: 'Nuevo pedido agregado'
		})
	} catch(err) {
		res.json({
			mensaje: 'Ha ocurrido un error',
			error: true
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
			res.json({
				mensaje: 'No hay pedidos'
			})
			return next()
		}
		return res.json(pedidos)
	} catch(err) {
		res.json({
			mensaje: 'Ha ocurrido un error',
			error: true
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
			res.json({
				mensaje: 'El pedido no existe'
			})
			return next()
		}
		return res.json(pedido)
	} catch(err) {
		res.json({
			mensaje: 'Ha ocurrido un error',
			error: true
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
			res.json({
				mensaje: 'No se ha podido actualizar el pedido'
			})
			return next()
		}
		return res.json({
			mensaje: 'Pedido actualizado'
		})
	} catch(err) {
		res.json({
			mensaje: 'Ha ocurrido un error',
			error: true
		})
		next()
	}
}

exports.eliminarPedido = async (req, res, next) => {
	try {
		await Pedidos.findOneAndDelete({
			_id: req.params.idPedido
		})
		return res.json({
			mensaje: 'Pedido eliminado'
		})
	} catch(err) {
		res.json({
			mensaje: 'Ha ocurrido un error',
			error: true
		})
		next()
	}
}
