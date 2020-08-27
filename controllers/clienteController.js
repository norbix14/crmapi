const Clientes = require('../models/Clientes')

exports.nuevoCliente = async (req, res, next) => {
	try {
		const cliente = new Clientes(req.body)
		await cliente.save()
		return res.status(200).json({
			error: false,
			mensaje: 'Nuevo cliente agregado'
		})
	} catch(err) {
		res.status(500).json({
			error: true,
			mensaje: 'Ha ocurrido un error'
		})
		next()
	}
}

exports.mostrarClientes = async (req, res, next) => {
	try {
		const clientes = await Clientes.find({})
		if(!clientes) {
			res.status(404).json({
				error: true,
				mensaje: 'No hay clientes'
			})
			return next()
		}
		return res.status(200).json({
			error: false,
			datos: clientes
		})
	} catch(err) {
		res.status(500).json({
			error: true,
			mensaje: 'Ha ocurrido un error'
		})
		next()
	}
}

exports.mostrarCliente = async (req, res, next) => {
	try {
		const cliente = await Clientes.findById(req.params.idCliente)
		if(!cliente) {
			res.status(404).json({
				error: true,
				mensaje: 'Este cliente no existe'
			})
			return next()
		}
		return res.status(200).json({
			error: false,
			datos: cliente
		})
	} catch(err) {
		res.status(500).json({
			error: true,
			mensaje: 'Ha ocurrido un error'
		})
		next()
	}
}

exports.actualizarCliente = async (req, res, next) => {
	try {
		const cliente = await Clientes.findOneAndUpdate(
		{
			_id: req.params.idCliente
		},
		req.body,
		{
			new: true
		})
		if(!cliente) {
			res.status(404).json({
				error: true,
				mensaje: 'No se ha podido actualizar'
			})
			return next()
		}
		return res.status(200).json({
			error: false,
			mensaje: 'El cliente fue actualizado'
		})
	} catch(err) {
		res.status(500).json({
			error: true,
			mensaje: 'Ha ocurrido un error'
		})
		next()
	}
}

exports.eliminarCliente = async (req, res, next) => {
	try {
		await Clientes.findOneAndDelete({
			_id: req.params.idCliente
		})
		return res.status(200).json({
			error: false,
			mensaje: 'El cliente se ha eliminado'
		})
	} catch(err) {
		res.status(500).json({
			error: true,
			mensaje: 'Ha ocurrido un error'
		})
		next()
	}
}

