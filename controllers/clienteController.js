const Clientes = require('../models/Clientes')

exports.nuevoCliente = async (req, res, next) => {
	try {
		const clienteDuplicado = await Clientes.findOne({
			email: req.body.email
		})
		if(clienteDuplicado) {
			return res.status(401).json({
				mensaje: 'Este email ya pertenece a otra cuenta'
			})
		}
		const cliente = new Clientes(req.body)
		await cliente.save()
		return res.status(200).json({
			mensaje: 'Nuevo cliente agregado'
		})
	} catch(err) {
		res.status(500).json({
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
				mensaje: 'No hay clientes'
			})
			return next()
		}
		return res.status(200).json({
			mensaje: 'Clientes encontrados',
			datos: clientes
		})
	} catch(err) {
		res.status(500).json({
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
				mensaje: 'Este cliente no existe'
			})
			return next()
		}
		return res.status(200).json({
			mensaje: 'Datos del cliente',
			datos: cliente
		})
	} catch(err) {
		res.status(500).json({
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
			}
		)
		if(!cliente) {
			res.status(404).json({
				mensaje: 'No se ha podido actualizar'
			})
			return next()
		}
		return res.status(200).json({
			mensaje: 'El cliente fue actualizado'
		})
	} catch(err) {
		res.status(500).json({
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
			mensaje: 'El cliente se ha eliminado'
		})
	} catch(err) {
		res.status(500).json({
			mensaje: 'Ha ocurrido un error'
		})
		next()
	}
}
