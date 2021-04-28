const createResponse = require('./response')

/**
 * Modulo encargado de enviar respuestas segun
 * el codigo HTTP
 *
 * @module responses/images
*/

/**
 * Funcion que retorna una respuesta segun el
 * codigo HTTP
 *
 * @param {number} code - status code
 * @param {object} details - additional details
 * @returns {object}
*/
exports.newProductImageResponse = (code, details = {}) => {
  switch (Number(code)) {
    case 200:
      return createResponse(
        'Imagen de producto agregada',
        'El producto ahora tiene una imagen identificadora',
        details
      )
    default:
      return createResponse('', '', details)
  }
}

/**
 * Funcion que retorna una respuesta segun el
 * codigo HTTP
 *
 * @param {number} code - status code
 * @param {object} details - additional details
 * @returns {object}
*/
exports.deleteProductImageResponse = (code, details = {}) => {
  switch (Number(code)) {
    case 200:
      return createResponse(
        'Imagen de producto eliminada',
        'La imagen del producto fue eliminada de Cloudinary',
        details
      )
    case 404:
      return createResponse(
        'No hay imagen que eliminar',
        'No se encontro la imagen que se desea eliminar',
        details
      )
    default:
      return createResponse('', '', details)
  }
}
