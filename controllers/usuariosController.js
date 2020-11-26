require('dotenv').config({ path: 'variables.env' })
const Usuarios = require('../models/Usuarios')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

exports.registrarUsuario = async (req, res, next) => {
	try {
		const { email, password } = req.body
		const usuarioDuplicado = await Usuarios.findOne({ email })
		if(usuarioDuplicado) {
			return res.status(403).json({
				mensaje: 'Este email no puede utilizarse'
			})
		}
		const usuario = new Usuarios(req.body)
		const salt = bcrypt.genSaltSync()
		usuario.password = bcrypt.hashSync(password, salt)
		await usuario.save()
		return res.status(200).json({
			mensaje: 'Usuario creado'
		})
	} catch(err) {
		res.status(500).json({
			mensaje: 'Ha ocurrido un error al crear el usuario'
		})
		next()
	}
}

exports.autenticarUsuario = async (req, res, next) => {
	const { email, password } = req.body
	const usuario = await Usuarios.findOne({ email })
	if(!usuario) {
		await res.status(401).json({
			mensaje: 'Este email no pertenece a ninguna cuenta'
		})
		return next()
	}
	if(!bcrypt.compareSync(password, usuario.password)) {
		await res.status(401).json({
			mensaje: 'Credenciales incorrectas. Revisa los datos'
		})
		return next()
	}
	const token = jwt.sign(
		{
			email: usuario.email,
			nombre: usuario.nombre,
			id: usuario._id
		},
		process.env.JWT_SECRET,
		{
			expiresIn: '1h'
		}
	)
	return res.json({ mensaje: token })
}
