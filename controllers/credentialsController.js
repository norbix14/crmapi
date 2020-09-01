require('dotenv').config({ path: 'variables.env' })
const sha1 = require('sha1')

exports.obtenerCloudCred = (req, res, next) => {
	try {
		const fileInfo = req.params.fileinfo
		const url = process.env.CLOUDINARY_URL_FRONTEND
		const secret = process.env.CLOUDINARY_API_SECRET
		const key = process.env.CLOUDINARY_API_KEY
		const signature = sha1(fileInfo + secret)
		return res.status(200).json({
			mensaje: 'Datos solicitados',
			datos: { key, url, signature }
		})
	} catch(err) {
		res.status(500).json({
			mensaje: 'Ha ocurrido un error'
		})
		next()
	}
}
