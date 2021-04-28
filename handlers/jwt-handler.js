require('dotenv').config()
const jwt = require('jsonwebtoken')

/**
 * Modulo encargado del manejo de JSONWEBTOKEN
 * 
 * @module handlers/jwt-handler
*/

/**
 * Funcion para firmar `jsonwebtoken` de
 * manera sincronica
 * 
 * @param {object} payload - payload
 * @param {object} options - options
 * @returns {string} token
*/
exports.jwtSign = (payload, options = {}) => {
  const secret = process.env.JWT_SECRET
  const opts = {
    expiresIn: '1h',
    ...options
  }
  const token = jwt.sign(payload, secret, opts)
  return token
}

/**
 * Funcion para verificar `jsonwebtoken` de
 * manera sincronica
 * 
 * @param {string} token - jsonwebtoken
 * @returns {string | object}
*/
exports.jwtVerify = (token) => {
  const secret = process.env.JWT_SECRET
  const verified = jwt.verify(token, secret)
  return verified
}
