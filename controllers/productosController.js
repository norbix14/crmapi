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
				error: true,
				mensaje: 'No hay resultados para la búsqueda'
			})
			return next()
		}
		return res.json({
			error: false,
			datos: producto
		})
	} catch(err) {
		res.status(500).json({
			error: true,
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
				error: true,
				mensaje: 'No hay productos disponibles'
			})
			return next()
		}
		return res.status(200).json({
			error: false,
			datos: productos
		})
	} catch(err) {
		res.status(500).json({
			error: true,
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
				error: true,
				mensaje: 'No hay ningún producto disponible con este ID'
			})
			return next()
		}
		return res.json({
			error: false,
			datos: producto
		})
	} catch(err) {
		res.status(500).json({
			error: true,
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
			error: false,
			mensaje: 'Nuevo producto agregado'
		})
	} catch(err) {
		res.status(500).json({
			error: true,
			mensaje: 'Ha ocurrido un error'
		})
		next()
	}
}

exports.actualizarProducto = async (req, res, next) => {
	// actualizar producto y/o su imagen tambien. arduo trabajo. tratar de optimizar
	try {
		// let productoAnterior = await Productos.findById(req.params.idProducto)
		let nuevoProducto = req.body
		let productoActualizado = await Productos.findOneAndUpdate(
		{
			_id: req.params.idProducto
		},
		nuevoProducto,
		{
			new: true
		}
		)
		if(!productoActualizado) {
			res.status(404).json({
				error: true,
				mensaje: 'Ha ocurrido un error al actualizar el producto'
			})
			return next()
		}
		return res.status(200).json({
			error: false,
			mensaje: 'Producto actualizado'
		})
	} catch(err) {
		res.status(500).json({
			error: true,
			mensaje: 'Ha ocurrido un error'
		})
		next()
	}
}

exports.eliminarProducto = async (req, res, next) => {
	// eliminar imagen de CLoudinary y de la base de datos
	try {
		const producto = await Productos.findById(req.params.idProducto)
		if(!producto) {
			res.status(404).json({
				error: true,
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
			error: false,
			mensaje: 'Producto eliminado'
		})
	} catch(err) {
		res.status(500).json({
			error: true,
			mensaje: 'Ha ocurrido un error'
		})
		next()
	}
}

exports.imagenProducto = async (req, res, next) => {
	try {
		// subir datos de la imagen a la base de datos
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
			error: false,
			mensaje: 'Imagen de producto agregada'
		})
	} catch(err) {
		res.status(500).json({
			error: true,
			mensaje: 'Ha ocurrido un error'
		})
		next()
	}
}

exports.actualizarImagenProducto = async (req, res, next) => {
	try {
		// revisar si existe imagen previa y borrarla
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
			error: false,
			mensaje: 'Imagen de producto editada'
		})
	} catch(err) {
		res.status(500).json({
			error: true,
			mensaje: 'Ha ocurrido un error'
		})
		next()
	}
}
