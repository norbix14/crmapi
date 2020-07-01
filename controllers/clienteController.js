const Clientes = require('../models/Clientes')

exports.nuevoCliente = async (req, res, next) => {
	try {
		const cliente = new Clientes(req.body)
		await cliente.save()
		return res.json({
			mensaje: 'Nuevo cliente agregado'
		})
	} catch(err) {
		res.json({
			mensaje: 'Ha ocurrido un error',
			error: true
		})
		next()
	}
}

exports.mostrarClientes = async (req, res, next) => {
	try {
		const clientes = await Clientes.find({})
		if(!clientes) {
			res.json({
				mensaje: 'No hay clientes'
			})
			return next()
		}
		return res.json(clientes)
	} catch(err) {
		res.json({
			mensaje: 'Ha ocurrido un error',
			error: true
		})
		next()
	}
}

exports.mostrarCliente = async (req, res, next) => {
	try {
		const cliente = await Clientes.findById(req.params.idCliente)
		if(!cliente) {
			res.json({
				mensaje: 'Este cliente no existe'
			})
			return next()
		}
		return res.json(cliente)
	} catch(err) {
		res.json({
			mensaje: 'Ha ocurrido un error',
			error: true
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
			res.json({
				mensaje: 'No se ha podido actualizar'
			})
			return next()
		}
		return res.json({
			mensaje: 'El cliente fue actualizado'
		})
	} catch(err) {
		res.json({
			mensaje: 'Ha ocurrido un error',
			error: true
		})
		next()
	}
}

exports.eliminarCliente = async (req, res, next) => {
	try {
		await Clientes.findOneAndDelete({
			_id: req.params.idCliente
		})
		return res.json({
			mensaje: 'El cliente se ha eliminado'
		})
	} catch(err) {
		res.json({
			mensaje: 'Ha ocurrido un error',
			error: true
		})
		next()
	}
}

