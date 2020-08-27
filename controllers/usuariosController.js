const Usuarios = require('../models/Usuarios')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.registrarUsuario = async (req, res, next) => {
	try {
		const usuario = new Usuarios(req.body)
		usuario.password = await bcrypt.hash(req.body.password, 12)
		await usuario.save()
		return res.status(200).json({
			error: false,
			mensaje: 'Usuario creado'
		})
	} catch(err) {
		res.status(500).json({
			error: true,
			mensaje: 'Ha ocurrido un error al crear el usuario'
		})
		next()
	}
}

exports.autenticarUsuario = async (req, res, next) => {
	const { email, password } = req.body
	const usuario = await Usuarios.findOne({
		email
	})
	if(!usuario) {
		await res.status(401).json({
			error: true,
			mensaje: 'Este email no pertenece a ninguna cuenta'
		})
		return next()
	} else {
		if(!bcrypt.compareSync(password, usuario.password)) {
			await res.status(401).json({
				error: true,
				mensaje: 'Credenciales incorrectas. Revisa los datos'
			})
			return next()
		} else {
			const token = jwt.sign({
				email: usuario.email,
				nombre: usuario.nombre,
				id: usuario._id
			},
			'LLAVESECRETA',
			{
				expiresIn: '1h'
			})
			return res.json({
				token
			})
		}
	}
}
