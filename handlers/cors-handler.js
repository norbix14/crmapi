const cors = require('cors')

/**
 * Modulo encargado del manejo de CORS
 * 
 * @module handlers/cors-handler
*/

/**
 * Funcion que verifica si un dominio es permitido
 * por CORS
 * 
 * @param {array} whitelist - allowed URLs 
*/
exports.useCors = (whitelist = []) => {
  const origin = (origin, callback) => {
    const allowed = whitelist.some(domain => domain === origin)
    if (allowed) {
      return callback(null, true)
    }
    return callback(new Error('Dominio no permitido por CORS'))
  }
  const options = { origin }
  return cors(options)
}
