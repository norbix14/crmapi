const createResponse = require('./response')

/**
 * Modulo encargado de enviar respuestas segun
 * el codigo HTTP
 *
 * @module responses/clients
*/

/**
 * Funcion que retorna una respuesta segun el
 * codigo HTTP
 * 
 * @param {number} code - status code
 * @param {object} details - additional details
 * @returns {object}
*/
exports.newClientResponse = (code, details = {}) => {
  switch (Number(code)) {
    case 200:
      return createResponse(
        'Nuevo cliente agregado',
        'Un nuevo cliente fue agregado',
        details
      )
    case 403:
      return createResponse(
        'Ya existe un cliente con este email',
        'Ya hay un cliente registrado',
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
exports.showClientsResponse = (code, details = {}) => {
  switch (Number(code)) {
    case 200:
      return createResponse(
        'Clientes',
        'Datos de todos los clientes registrados',
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
exports.showClientResponse = (code, details = {}) => {
  switch (Number(code)) {
    case 200:
      return createResponse(
        'Cliente',
        'Datos del cliente registrado',
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
exports.updateClientResponse = (code, details = {}) => {
  switch (Number(code)) {
    case 200:
      return createResponse(
        'El cliente fue actualizado',
        'Se actualizaron los datos del cliente',
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
exports.deleteClientResponse = (code, details = {}) => {
  switch (Number(code)) {
    case 200:
      return createResponse(
        'El cliente fue eliminado',
        'Los datos del cliente fueron eliminados',
        details
      )
    case 404:
      return createResponse(
        'Este cliente no existe',
        'No hay cliente al cual eliminar',
        details
      )
    default:
      return createResponse('', '', details)
  }
}
