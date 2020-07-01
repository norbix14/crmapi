const Productos = require('../models/Productos')
const multer = require('multer')
const shortid = require('shortid')
const path = require('path')
const fs = require('fs')

const configuracionMulter = {
	fileFilter: (req, file, callback) => {
		let mimetype = file.mimetype
		if(mimetype === 'image/jpeg' || mimetype === 'imagen/png') {
			callback(null, true)
		} else {
			callback(new Error('Formato de imagen no válido'))
		}
	},
	storage: fileStorage = multer.diskStorage({
		destination: (req, file, callback) => {
			callback(null, path.join(__dirname, '../uploads/'))
		},
		filename: (req, file, callback) => {
			const fileParts = file.mimetype.split('/')
			const fileExt = fileParts[1]
			callback(null, `${shortid.generate()}.${fileExt}`)
		}
	})
}
const upload = multer(configuracionMulter).single('imagen')

exports.subirArchivo = async (req, res, next) => {
	upload(req, res, function(err) {
		if(err) {
			return res.json({
				mensaje: err
			})
		}
		return next()
	})
}

exports.nuevoProducto = async (req, res, next) => {
	try {
		const producto = new Productos(req.body)
		let file = req.file
		if(file) {
			producto.imagen = file.filename
		}
		await producto.save()
		return res.json({
			mensaje: 'Nuevo producto agregado'
		})
	} catch(err) {
		res.json({
			mensaje: 'Ha ocurrido un error',
			error: true
		})
		next()
	}
}

exports.mostrarProductos = async (req, res, next) => {
	try {
		const productos = await Productos.find({})
		if(!productos) {
			res.json({
				mensaje: 'No hay productos disponibles'
			})
			return next()
		}
		return res.json(productos)
	} catch(err) {
		res.json({
			mensaje: 'Ha ocurrido un error',
			error: true
		})
		next()
	}
}

exports.mostrarProducto = async (req, res, next) => {
	try {
		const producto = await Productos.findById(req.params.idProducto)
		if(!producto) {
			res.json({
				mensaje: 'No hay ningún producto disponible con este ID'
			})
			return next()
		}
		return res.json(producto)
	} catch(err) {
		res.json({
			mensaje: 'Ha ocurrido un error',
			error: true
		})
		next()
	}
}

exports.actualizarProducto = async (req, res, next) => {
	try {
		let nuevoProducto = req.body
		let productoAnterior = await Productos.findById(req.params.idProducto)
		let file = req.file
		if(file) {
			if(productoAnterior.imagen) {
				fs.unlink(path.join(__dirname, `../uploads/${productoAnterior.imagen}`), err => {
					if(err) {
						throw err
					}
					// console.log('Imagen de producto anterior borrada')
				})
			}
			nuevoProducto.imagen = file.filename
		} else {
			nuevoProducto.imagen = productoAnterior.imagen
		}
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
			res.json({
				mensaje: 'Ha ocurrido un error al actualizar el producto'
			})
			return next()
		}
		return res.json({
			mensaje: 'Producto actualizado'
		})
	} catch(err) {
		res.json({
			mensaje: 'Ha ocurrido un error',
			error: true
		})
		next()
	}
}

exports.eliminarProducto = async (req, res, next) => {
	try {
		const producto = await Productos.findById(req.params.idProducto)
		if(!producto) {
			res.json({
				mensaje: 'No hay ningún producto disponible con este ID'
			})
			return next()
		}
		if(producto.imagen) {
			fs.unlink(path.join(__dirname, `../uploads/${producto.imagen}`), err => {
				if(err) {
					throw err
				}
				// console.log('Imagen de producto borrada')
			})
		}
		await Productos.findByIdAndDelete(producto._id)
		return res.json({
			mensaje: 'Producto eliminado'
		})
	} catch(err) {
		res.json({
			mensaje: 'Ha ocurrido un error',
			error: true
		})
		next()
	}
}

exports.buscarProducto = async (req, res, next) => {
	try {
		const { query } = req.params
		const producto = await Productos.find({
			nombre: new RegExp(query, 'i')
		})
		if(!producto) {
			res.json({
				mensaje: 'No hay resultados para la búsqueda'
			})
			return next()
		}
		return res.json(producto)
	} catch(err) {
		res.json({
			mensaje: 'Ha ocurrido un error',
			error: true
		})
		next()
	}
}
