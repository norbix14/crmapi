const bcrypt = require('bcryptjs')

/**
 * Modulo encargado del manejo de contraseñas
 *
 * @module handlers/password-handler
*/

/**
 * Funcion para encriptar contraseña de
 * manera sincronica
 * 
 * @param {string} string - string to hash
 * @returns {string} hashed string
*/
exports.hashPassword = (string) => {
  const salt = bcrypt.genSaltSync()
  const hashed = bcrypt.hashSync(string, salt)
  return hashed
}

/**
 * Funcion para comparar contraseña de
 * manera sincronica
 * 
 * @param {string} string - string to compare
 * @param {string} hash - string to compare against
 * @returns {boolean}
*/
exports.comparePassword = (string, hash) => {
  return bcrypt.compareSync(string, hash)
}
