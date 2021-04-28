const { jwtSign } = require('../handlers/jwt-handler')
const { comparePassword } = require('../handlers/password-handler')
const loginResponse = require('../responses/login')
const internalError = require('../responses/internalError')

/**
 * Modulo encargado del manejo de la autenticacion
 * del usuario
 * 
 * @module controllers/loginController
*/

/**
 * Funcion para autenticar a un usuario registrado
 *
 * @param {object} req - user request
 * @param {object} res - server response
 * @returns {Promise}
*/
exports.autenticarUsuario = async (req, res) => {
  const { body, user } = req
  try {
    if (!user) {
      return res.status(404).json(loginResponse(404))
    }
    const { password } = body
    const passwordMatch = comparePassword(password, user.password)
    if (!passwordMatch) {
      return res.status(401).json(loginResponse(401))
    }
    const { _id, email, nombre } = user
    const payload = {
      id: _id,
      email,
      nombre
    }
    const options = {
      expiresIn: '1h'
    }
    const token = jwtSign(payload, options)
    return res.status(200).json(loginResponse(200, { token }))
  } catch (error) {
    return res.status(500).json(internalError({ errors: [ error ] }))
  }
}
