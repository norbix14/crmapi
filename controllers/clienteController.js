const Clientes = require('../models/Clientes')
const {
	newClientResponse,
	showClientResponse,
	showClientsResponse,
	updateClientResponse,
	deleteClientResponse
} = require('../responses/clients')
const internalError = require('../responses/internalError')

/**
 * Modulo encargado del manejo de los clientes
 * 
 * @module controllers/clienteController
*/

/**
 * Funcion para verificar si un cliente existe
 *
 * @param {object} req - user request
 * @param {object} res - server response
 * @param {function} next - continue to the next middleware
 * @returns {Promise}
*/
exports.verificarCliente = async (req, res, next) => {
	const { body } = req
	try {
		const { email } = body
		const client = await Clientes.findOne({ email })
		req.client = client
		next()
	} catch (error) {
		req.client = null
		next()
	}
}

/**
 * Funcion para verificar si un cliente existe segun su `_id`
 *
 * @param {object} req - user request
 * @param {object} res - server response
 * @param {function} next - continue to the next middleware
 * @returns {Promise}
*/
exports.verificarClientePorID = async (req, res, next) => {
	const { params } = req
	try {
		const { idCliente } = params
		const client = await Clientes.findById(idCliente)
		req.client = client
		next()
	} catch (error) {
		req.client = null
		next()
	}
}

/**
 * Funcion para agregar a un nuevo cliente
 *
 * @param {object} req - user request
 * @param {object} res - server response
 * @returns {Promise}
*/
exports.nuevoCliente = async (req, res) => {
	const { body, client } = req
	try {
		if(client) {
			return res.status(403).json(newClientResponse(403))
		}
		const newClient = new Clientes(body)
		await newClient.save()
		return res.status(200).json(newClientResponse(200))
	} catch(error) {
		return res.status(500).json(internalError({ errors: [ error ] }))
	}
}

/**
 * Funcion para obtener todos los clientes registrados
 *
 * @param {object} req - user request
 * @param {object} res - server response
 * @returns {Promise}
*/
exports.mostrarClientes = async (req, res) => {
	try {
		const clients = await Clientes.find({})
		return res.status(200).json(showClientsResponse(200, { clients }))
	} catch(error) {
		return res.status(500).json(internalError({ errors: [ error ] }))
	}
}

/**
 * Funcion para obtener los datos de un cliente registrado
 *
 * @param {object} req - user request
 * @param {object} res - server response
 * @returns {Promise}
*/
exports.mostrarCliente = async (req, res) => {
	const { params } = req
	try {
		const { idCliente } = params
		const client = await Clientes.findById(idCliente)
		return res.status(200).json(showClientResponse(200, { client }))
	} catch(error) {
		return res.status(500).json(internalError({ errors: [ error ] }))
	}
}

/**
 * Funcion para actualizar los datos de un cliente registrado
 *
 * @param {object} req - user request
 * @param {object} res - server response
 * @returns {Promise}
*/
exports.actualizarCliente = async (req, res) => {
	const { body, params } = req
	try {
		const { idCliente } = params
		await Clientes.findOneAndUpdate(
			{
				_id: idCliente
			},
			body,
			{
				new: true
			}
		)
		return res.status(200).json(updateClientResponse(200))
	} catch(error) {
		return res.status(500).json(internalError({ errors: [ error ] }))
	}
}

/**
 * Funcion para eliminar un cliente registrado
 *
 * @param {object} req - user request
 * @param {object} res - server response
 * @returns {Promise}
*/
exports.eliminarCliente = async (req, res) => {
	const { client } = req
	try {
		if (!client) {
			return res.status(404).json(deleteClientResponse(404))
		}
		const { _id } = client
		await Clientes.findOneAndDelete({ _id })
		return res.status(200).json(deleteClientResponse(200))
	} catch(error) {
		return res.status(500).json(internalError({ errors: [ error ] }))
	}
}
