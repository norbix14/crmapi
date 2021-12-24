const ImagenProducto = require('../models/ImagenProducto')
const Productos = require('../models/Productos')
const {
  deleteImageByPublicId
} = require('../handlers/cloudinary-handler')
const {
  newProductImageResponse,
  deleteProductImageResponse
} = require('../responses/images')
const internalError = require('../responses/InternalError')

/**
 * Modulo encargado del manejo de las imagenes
 * de los productos
 * 
 * @module controllers/imageController
*/

/**
 * Funcion para guardar los datos de la imagen de 
 * un producto
 * 
 * @param {object} req - user request
 * @param {object} res - server response
 * @returns {Promise}
*/
exports.agregarImagenProducto = async (req, res) => {
  const { body, product } = req
  try {
    const { _id } = product
    const { secure_url, public_id, created_at } = body
    const productImage = new ImagenProducto({
      secure_url,
      public_id,
      created_at,
      owner: _id
    })
    if (product) {
      await Productos.findByIdAndUpdate(_id, { imagen: secure_url })
    }
    await productImage.save()
    return res.status(200).json(newProductImageResponse(200))
  } catch (error) {
    return res.status(500).json(internalError({ errors: [ error ] }))
  }
}

/**
 * Funcion para eliminar una imagen de un producto 
 * de la nube de Cloudinary
 * 
 * @param {object} req - user request
 * @param {object} res - server response
 * @returns {Promise}
*/
exports.eliminarImagenProducto = async (req, res) => {
  const { image } = req
  try {
    if (!image) {
      return res.status(404).json(deleteProductImageResponse(404))
    }
    const { public_id } = image
    await deleteImageByPublicId(public_id)
    return res.status(200).json(deleteProductImageResponse(200))
  } catch (error) {
    return res.status(500).json(internalError({ errors: [ error ] }))
  }
}
