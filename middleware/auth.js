const { jwtVerify } = require('../handlers/jwt-handler')

/**
 * Modulo encargado de la validacion del JWT
 * 
 * @module middleware/auth
*/

/**
 * Middleware que verifica la existencia de la cabecera
 * de autorizacion
 *
 * @param {object} req - user request
 * @param {object} res - server response
 * @param {function} next - continue to the next middleware
*/
exports.checkAuthorizationHeader = (req, res, next) => {
	const authorizationHeader = req.get('Authorization')
	if (!authorizationHeader) {
		return res.status(403).json({
			message: 'Permiso denegado',
			explanation: `Missing Authorization Header`,
			details: {}
		})
	}
	const token = authorizationHeader.split(' ')
	req.token = token[1]
	next()
}

/**
 * Middleware que verifica si el token en la peticion
 * es valido
 * 
 * @param {object} req - user request
 * @param {object} res - server response
 * @param {function} next - continue to the next middleware
*/
exports.verifyToken = (req, res, next) => {
	const { token } = req
	try {
		const verifyToken = jwtVerify(token)
		if (verifyToken) {
			// do something if token es valid
		}
		next()
	} catch (error) {
		return res.status(500).json({
			message: 'Error con el JWT',
			explanation: `Hubo un problema con el token`,
			details: {
				errors: [ error ]
			}
		})
	}	
}
