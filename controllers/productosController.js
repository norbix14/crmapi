const cloudinary = require('cloudinary').v2
const ImagenProducto = require('../models/ImagenProducto')
const Productos = require('../models/Productos')

exports.buscarProducto = async (req, res, next) => {
	try {
		const { query } = req.params
		const producto = await Productos.find({
			nombre: new RegExp(query, 'i')
		})
		if(!producto) {
			res.status(404).json({
				mensaje: 'No hay resultados para la búsqueda'
			})
			return next()
		}
		return res.json({
			mensaje: 'Producto encontrado',
			datos: producto
		})
	} catch(err) {
		res.status(500).json({
			mensaje: 'Ha ocurrido un error'
		})
		next()
	}
}

exports.mostrarProductos = async (req, res, next) => {
	try {
		const productos = await Productos.find({})
		if(!productos) {
			res.status(404).json({
				mensaje: 'No hay productos disponibles'
			})
			return next()
		}
		return res.status(200).json({
			mensaje: 'Productos encontrados',
			datos: productos
		})
	} catch(err) {
		res.status(500).json({
			mensaje: 'Ha ocurrido un error'
		})
		next()
	}
}

exports.mostrarProducto = async (req, res, next) => {
	try {
		const producto = await Productos.findById(req.params.idProducto)
		if(!producto) {
			res.status(404).json({
				mensaje: 'No hay ningún producto disponible con este ID'
			})
			return next()
		}
		return res.json({
			mensaje: 'Producto encontrado',
			datos: producto
		})
	} catch(err) {
		res.status(500).json({
			mensaje: 'Ha ocurrido un error'
		})
		next()
	}
}

exports.nuevoProducto = async (req, res, next) => {
	try {
		const { nombre, precio } = req.body
		const producto = new Productos({
			nombre,
			precio
		})
		await producto.save()
		return res.status(200).json({
			mensaje: 'Nuevo producto agregado'
		})
	} catch(err) {
		res.status(500).json({
			mensaje: 'Ha ocurrido un error'
		})
		next()
	}
}

exports.actualizarProducto = async (req, res, next) => {
	try {
		let productoActualizado = await Productos.findOneAndUpdate(
			{
				_id: req.params.idProducto
			},
			req.body,
			{
				new: true
			}
		)
		if(!productoActualizado) {
			res.status(404).json({
				mensaje: 'Ha ocurrido un error al actualizar el producto'
			})
			return next()
		}
		return res.status(200).json({
			mensaje: 'Producto actualizado'
		})
	} catch(err) {
		res.status(500).json({
			mensaje: 'Ha ocurrido un error'
		})
		next()
	}
}

exports.eliminarProducto = async (req, res, next) => {
	try {
		const producto = await Productos.findById(req.params.idProducto)
		if(!producto) {
			res.status(404).json({
				mensaje: 'No hay ningún producto disponible con este ID'
			})
			return next()
		}
		const imagen = await ImagenProducto.findOne({
			owner: producto._id
		})
		if(imagen) {
			await cloudinary.uploader.destroy(imagen.public_id)
			await ImagenProducto.findByIdAndDelete(imagen._id)
		}
		await Productos.findByIdAndDelete(producto._id)
		return res.status(200).json({
			mensaje: 'Producto eliminado'
		})
	} catch(err) {
		res.status(500).json({
			mensaje: 'Ha ocurrido un error'
		})
		next()
	}
}

exports.imagenProducto = async (req, res, next) => {
	try {
		const { secure_url, public_id, created_at, owner } = req.body
		const imagenProducto = new ImagenProducto({
			secure_url,
			public_id,
			created_at,
			owner: owner ? owner : ''
		})
		const producto = await Productos.findById(owner)
		if(producto) {
			producto.imagen = secure_url
			await producto.save()
		}
		await imagenProducto.save()
		return res.status(200).json({
			mensaje: 'Imagen de producto agregada'
		})
	} catch(err) {
		res.status(500).json({
			mensaje: 'Ha ocurrido un error'
		})
		next()
	}
}

exports.eliminarImagenProducto = async (req, res, next) => {
	try {
		await cloudinary.uploader.destroy(req.params.id)
		return res.status(200).json({
			mensaje: 'Imagen de producto eliminada'
		})
	} catch(err) {
		res.status(500).json({
			mensaje: 'Ha ocurrido un error'
		})
		next()
	}
}
