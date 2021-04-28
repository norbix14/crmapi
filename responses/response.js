/**
 * Modulo para crear una respuesta personalizada
 * 
 * @module responses/response
*/

/**
 * Funcion para crear una respuesta personalizada
 * 
 * @param {string} message - the message
 * @param {string} explanation - an explanation
 * @param {object} details - additional details
 * @returns {object}
*/
module.exports = (message, explanation, details = {}) => {
  return {
    message,
    explanation,
    details: {
      ...details
    }
  }
}
