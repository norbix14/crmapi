require('dotenv').config()
const sha1 = require('sha1')
const createResponse = require('../responses/response')
const internalError = require('../responses/InternalError')

/**
 * Modulo encargado de la obtencion de credenciales
 * de Cloudinary
 *
 * @module controllers/credentialsController
*/

/**
 * Funcion para obtener credenciales de Cloudinary
 * y que retorna los datos necesarios para luego
 * poder subirlos a la nube de Cloudinary
 * 
 * @param {object} req - user request
 * @param {object} res - server response
*/
exports.obtenerCloudCred = (req, res) => {
	const { params } = req
	try {
		const { fileinfo } = params

		const secret = process.env.CLOUDINARY_API_SECRET
		const url = process.env.CLOUDINARY_URL_FRONTEND
		const key = process.env.CLOUDINARY_API_KEY
		const signature = sha1(fileinfo + secret)
		
		return res.status(200).json(createResponse(
			'Datos',
			'Credenciales para la carga de imagenes a Cloudinary',
			{ credentials: { key, url, signature } }
		))
	} catch(error) {
		return res.status(500).json(internalError({ errors: [ error ] }))
	}
}
