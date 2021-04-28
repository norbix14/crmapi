/**
 * Modulo que maneja el error HTTP 500
 * 
 * @module responses/InternalError
*/

/**
 * Funcion que retorna un objeto con detalles
 * del error
 * 
 * @param {object} details - additional details
 * @returns {object}
*/
module.exports = (details = {}) => {
  return {
    message: 'Ha ocurrido un error',
    explanation: 'No se ha podido realizar la petición',
    details: { ...details }
  }
}
