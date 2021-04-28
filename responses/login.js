const createResponse = require('./response')

/**
 * Modulo encargado de enviar respuestas segun
 * el codigo HTTP 
 * 
 * @module responses/login
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
        'Usuario autenticado',
        'El usuario ha sido autenticado',
        details
      )
    case 401:
      return createResponse(
        'Credenciales incorrectas',
        'Algunos datos son inválidos',
        details
      )
    case 404:
      return createResponse(
        'Este email no pertenece a ninguna cuenta',
        'No se encontro ningún usuario',
        details
      )
    default:
      return createResponse('', '', details)
  }
}
