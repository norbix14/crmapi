const Usuarios = require('../models/Usuarios')
const { hashPassword } = require('../handlers/password-handler')
const signupResponse = require('../responses/signup')
const internalError = require('../responses/InternalError')

/**
 * Modulo encargado del manejo de la creacion
 * del usuario
 *
 * @module controllers/signupController
*/

/**
 * Funcion para registrar un nuevo usuario
 * 
 * @param {object} req - user request
 * @param {object} res - server response
 * @returns {Promise}
*/
exports.registrarUsuario = async (req, res) => {
  const { body, user } = req
  try {
    if (user) {
      return res.status(403).json(signupResponse(403))
    }
    const { password } = body
    const newUser = new Usuarios(body)
    newUser.password = hashPassword(password)
    await newUser.save()
    return res.status(200).json(signupResponse(200))
  } catch (error) {
    return res.status(500).json(internalError({ errors: [ error ] }))
  }
}
