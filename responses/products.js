const createResponse = require('./response')

/**
 * Modulo encargado de enviar respuestas segun
 * el codigo HTTP
 *
 * @module responses/products
*/

/**
 * Funcion que retorna una respuesta segun el
 * codigo HTTP
 *
 * @param {number} code - status code
 * @param {object} details - additional details
 * @returns {object}
*/
exports.searchProductResponse = (code, details = {}) => {
  switch (Number(code)) {
    case 200:
      return createResponse(
        'Producto',
        'Datos del producto encontrado',
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
exports.showProductsResponse = (code, details = {}) => {
  switch (Number(code)) {
    case 200:
      return createResponse(
        'Productos',
        'Datos de todos los productos encontrados',
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
exports.showProductResponse = (code, details = {}) => {
  switch (Number(code)) {
    case 200:
      return createResponse(
        'Producto',
        'Datos del producto encontrado',
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
exports.newProductResponse = (code, details = {}) => {
  switch (Number(code)) {
    case 200:
      return createResponse(
        'Nuevo producto agregado',
        'Un nuevo producto ha sido agregado',
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
exports.updateProductResponse = (code, details = {}) => {
  switch (Number(code)) {
    case 200:
      return createResponse(
        'Producto actualizado',
        'El producto ha sido actualizado',
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
exports.deleteProductResponse = (code, details = {}) => {
  switch (Number(code)) {
    case 200:
      return createResponse(
        'Producto eliminado',
        'El producto ha sido eliminado',
        details
      )
    case 404:
      return createResponse(
        'No hay ningún producto disponible',
        'No hay producto al cual eliminar',
        details
      )
    default:
      return createResponse('', '', details)
  }
}
