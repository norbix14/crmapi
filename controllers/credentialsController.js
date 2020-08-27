require('dotenv').config({ path: 'variables.env' })
const sha1 = require('sha1')

exports.obtenerCloudCred = (req, res, next) => {
	try {
		if(req.params) {
			if(req.params.fileinfo) {
				let data = {
					key: process.env.CLOUDINARY_API_KEY,
					url: process.env.CLOUDINARY_URL_FRONTEND,
					signature: sha1(req.params.fileinfo + process.env.CLOUDINARY_API_SECRET)
				}
				return res.status(200).json({
					error: false,
					datos: data
				})
			} else {
				return res.status(404).json({
					error: true,
					mensaje: 'No se han proporcionado datos de la imagen'
				})
			}
		} else {
			return res.status(404).json({
				error: true,
				mensaje: 'Debes proporcionar parametros'
			})
		}
	} catch(err) {
		res.status(500).json({
			error: true,
			mensaje: 'Ha ocurrido un error'
		})
		next()
	}
}
