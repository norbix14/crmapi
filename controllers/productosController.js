const ImagenProducto = require('../models/ImagenProducto')
const Productos = require('../models/Productos')
const {
	deleteImageByPublicId
} = require('../handlers/cloudinary-handler')
const {
	searchProductResponse,
	showProductsResponse,
	showProductResponse,
	newProductResponse,
	updateProductResponse,
	deleteProductResponse
} = require('../responses/products')
const internalError = require('../responses/internalError')

/**
 * Modulo encargado del manejo de los productos
 *
 * @module controllers/productosController
*/

/**
 * Funcion para verificar si un producto existe
 *
 * @param {object} req - user request
 * @param {object} res - server response
 * @param {function} next - continue to the next middleware
 * @returns {Promise}
*/
exports.verificarProducto = async (req, res, next) => {
	const { params } = req
	try {
		const { idProducto } = params
		const product = await Productos.findById(idProducto)
		req.product = product
		next()
	} catch (error) {
		req.product = null
		next()
	}
}

/**
 * Funcion para verificar si la imagen de un producto existe
 *
 * @param {object} req - user request
 * @param {object} res - server response
 * @param {function} next - continue to the next middleware
 * @returns {Promise}
*/
exports.verificarImagenProducto = async (req, res, next) => {
	const { params } = req
	try {
		const { publicid } = params
		const image = await ImagenProducto.findOne({ public_id: publicid })
		req.image = image
		next()
	} catch (error) {
		req.image = null
		next()
	}
}

/**
 * Funcion para buscar un producto
 * 
 * @param {object} req - user request
 * @param {object} res - server response
 * @returns {Promise}
*/
exports.buscarProducto = async (req, res) => {
	const { params } = req
	try {
		const { query } = params
		const product = await Productos.find({
			nombre: new RegExp(query, 'i')
		})
		return res.status(200).json(searchProductResponse(200, { product }))
	} catch(error) {
		return res.status(500).json(internalError({ errors: [ error ] }))
	}
}

/**
 * Funcion para obtener todos los productos
 * 
 * @param {object} req - user request
 * @param {object} res - server response
 * @returns {Promise}
*/
exports.mostrarProductos = async (req, res) => {
	try {
		const products = await Productos.find({})
		return res.status(200).json(showProductsResponse(200, { products }))
	} catch(error) {
		return res.status(500).json(internalError({ errors: [ error ] }))
	}
}

/**
 * Funcion para obtener todos los productos
 * 
 * @param {object} req - user request
 * @param {object} res - server response
 * @returns {Promise}
*/
exports.mostrarProducto = async (req, res) => {
	const { params } = req
	try {
		const { idProducto } = params
		const product = await Productos.findById(idProducto)
		return res.status(200).json(showProductResponse(200, { product }))
	} catch(error) {
		return res.status(500).json(internalError({ errors: [ error ] }))
	}
}

/**
 * Funcion para agregar un nuevo producto
 * 
 * @param {object} req - user request
 * @param {object} res - server response
 * @returns {Promise}
*/
exports.nuevoProducto = async (req, res) => {
	const { body } = req
	try {
		const { nombre, precio } = body
		const newProduct = new Productos({
			nombre,
			precio
		})
		await newProduct.save()
		return res.status(200).json(newProductResponse(200))
	} catch(error) {
		return res.status(500).json(internalError({ errors: [ error ] }))
	}
}

/**
 * Funcion para actualizar un producto
 * @param {object} req - user request
 * @param {object} res - server response
 * @returns {Promise}
*/
exports.actualizarProducto = async (req, res) => {
	const { body, params } = req
	try {
		const { idProducto } = params
		await Productos.findOneAndUpdate(
			{
				_id: idProducto
			},
			body,
			{
				new: true
			}
		)
		return res.status(200).json(updateProductResponse(200))
	} catch(error) {
		return res.status(500).json(internalError({ errors: [ error ] }))
	}
}

/**
 * Funcion para eliminar un producto
 * 
 * @param {object} req - user request
 * @param {object} res - server response
 * @returns {Promise}
*/
exports.eliminarProducto = async (req, res) => {
	const { product } = req
	try {
		if(!product) {
			return res.status(404).json(deleteProductResponse(404))
		}
		const { _id } = product
		const productImage = await ImagenProducto.findOne({ owner: _id })
		if (productImage) {
			const { _id, public_id = null } = productImage
			if (public_id) {
				await deleteImageByPublicId(public_id)
			}
			await ImagenProducto.findByIdAndDelete(_id)
		}
		await Productos.findByIdAndDelete(_id)
		return res.status(200).json(deleteProductResponse(200))
	} catch(error) {
		return res.status(500).json(internalError({ errors: [ error ] }))
	}
}
