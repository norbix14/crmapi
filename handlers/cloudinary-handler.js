require('dotenv').config()
const cloudinary = require('cloudinary').v2

/**
 * Modulo para el manejo de las acciones con la 
 * nube de Cloudinary
 * 
 * @module handlers/cloudinary-handler
*/

/**
 * Funcion para eliminar una imagen de la nube
 * de Cloudinary segun su `public_id`
 * 
 * @param {string} publicid - image `public_id`
 * @param {object} options - configuration object
 * @returns {Promise}
*/
exports.deleteImageByPublicId = async (publicid, options = {}) => {
  return await cloudinary.uploader.destroy(publicid, {
  	api_key: process.env.CLOUDINARY_API_KEY,
  	api_secret: process.env.CLOUDINARY_API_SECRET,
  	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  	...options,
  })
}
