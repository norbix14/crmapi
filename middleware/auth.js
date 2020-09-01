require('dotenv').config({ path: 'variables.env' })
const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
	const authHeader = req.get('Authorization')
	if(!authHeader) {
		const error = new Error('No autenticado. No hay JWT')
		error.statusCode = 401
		throw error
	}
	const token = authHeader.split(' ')[1]
	let revisarToken
	try {
		revisarToken = jwt.verify(token, process.env.JWT_SECRET)
	} catch(error) {
		error.statusCode = 500
		throw error
	}
	if(!revisarToken) {
		const error = new Error('No autenticado')
		error.statusCode = 401
		throw error
	}
	next()
}
