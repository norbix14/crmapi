require('dotenv').config()
const Usuarios = require('../models/Usuarios')
const createResponse = require('../responses/response')
const internalError = require('../responses/internalError')

/**
 * Modulo encargado del manejo de los usuarios
 *
 * @module controllers/usuariosController
*/

/**
 * Funcion para verificar si un usuario existe
 *
 * @param {object} req - user request
 * @param {object} res - server response
 * @param {function} next - continue to the next middleware
 * @returns {Promise}
*/
exports.verificarUsuario = async (req, res, next) => {
	const { body } = req
	try {
		const { email } = body
		const user = await Usuarios.findOne({ email })
		req.user = user
		next()
	} catch (error) {
		req.user = null
		next()
	}
}

/**
 * Funcion para verificar la contraseña para eliminar a un usuario
 *
 * @param {object} req - user request
 * @param {object} res - server response
 * @param {function} next - continue to the next middleware
*/
exports.verificarPasswordParaEliminar = (req, res, next) => {
	const { body } = req
	try {
		const { email, password } = body
		const superUser = String(process.env.SUPER_USER)
		const authorization = String(process.env.DELETE_AUTHORIZATION_PASSWORD)
		const deleteOrder = `${superUser}${authorization}${email}`
		if (password !== deleteOrder) {
			return res.status(403).json(createResponse(
				'La contraseña es inválida',
				`La contraseña proporcionada no es válida`
			))
		}
		next()
	} catch (error) {
		return res.status(500).json(internalError({ errors: [ error ] }))
	}
}

/**
 * Funcion para eliminar un usuario registrado
 *
 * @param {object} req - user request
 * @param {object} res - server response
 * @returns {Promise}
*/
exports.eliminarUsuario = async (req, res) => {
	const { user } = req
	try {
		if (!user) {
			return res.status(404).json(createResponse(
				'El usuario no existe',
				`Este usuario no esta registrado`
			))
		}
		const { email } = user
		await Usuarios.findOneAndDelete({ email })
		return res.status(200).json(createResponse(
			'Usuario eliminado',
			`El usuario fue eliminado correctamente de la BBDD`
		))
	} catch (error) {
		return res.status(500).json(internalError({ errors: [ error ] }))
	}
}
