const createResponse = require('./response')

/**
 * Modulo encargado de enviar respuestas segun
 * el codigo HTTP
 *
 * @module responses/signup
*/

/**
 * Funcion que retorna una respuesta segun el
 * codigo HTTP
 *
 * @param {number} code - status code
 * @param {object} details - additional details
 * @returns {object}
*/
module.exports = (code, details = {}) => {
  switch (Number(code)) {
    case 200:
      return createResponse(
        'Usuario creado',
        'Un nuevo usuario fue agregado',
        details
      )
    case 403:
      return createResponse(
        'Ya existe el usuario',
        'Ya hay un usuario utilizando este email',
        details
      )
    default:
      return createResponse('', '', details)
  }
}
