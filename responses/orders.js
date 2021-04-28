const createResponse = require('./response')

/**
 * Modulo encargado de enviar respuestas segun
 * el codigo HTTP
 *
 * @module responses/orders
*/

/**
 * Funcion que retorna una respuesta segun el
 * codigo HTTP
 *
 * @param {number} code - status code
 * @param {object} details - additional details
 * @returns {object}
*/
exports.newOrderResponse = (code, details = {}) => {
  switch (Number(code)) {
    case 200:
      return createResponse(
        'Nuevo pedido agregado',
        'Un nuevo pedido fue agregado',
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
exports.showOrdersResponse = (code, details = {}) => {
  switch (Number(code)) {
    case 200:
      return createResponse(
        'Pedidos',
        'Todos los datos de los pedidos',
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
exports.deleteOrderResponse = (code, details = {}) => {
  switch (Number(code)) {
    case 200:
      return createResponse(
        'Pedido eliminado',
        'Los datos del pedido fueron eliminados',
        details
      )
    case 404:
      return createResponse(
        'No hay pedido',
        'No hay pedido el cual eliminar',
        details
      )
    default:
      return createResponse('', '', details)
  }
}
