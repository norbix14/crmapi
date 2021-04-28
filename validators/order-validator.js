const { body, param } = require('express-validator')

/**
 * Modulo para validar campos
 *
 * @module validators/order-validator
*/

/**
 * Funcion para validar los campos en el cuerpo
 * de la peticion
 *
 * @param {object} req - user request
 * @param {object} res - server response
 * @param {function} next - continue to the next middleware
 * @returns {Promise}
*/
exports.orderBodyValidator = async (req, res, next) => {
  try {
    const fields = [
      body('cliente')
      .isMongoId()
      .withMessage('ObjectId de cliente no válido')
      .notEmpty()
      .withMessage('Campo no debe estar vacío'),
      body('pedido')
      .isArray()
      .withMessage('Campo debe ser un array')
      .notEmpty()
      .withMessage('Campo no debe estar vacío'),
      body('total')
      .isFloat()
      .withMessage('Debe ser un número')
    ]
    await Promise.all(fields.map(field => field.run(req)))
    next()
  } catch (error) {
    return res.status(500).json({
      message: `Ha ocurrido un error`,
      explanation: `Error al realizar la validación de los campos`,
      details: {
        errors: [ error ]
      }
    })
  }
}

/**
 * Funcion para validar el `_id` del producto
 * en los parametros de la peticion
 *
 * @param {object} req - user request
 * @param {object} res - server response
 * @param {function} next - continue to the next middleware
 * @returns {Promise}
*/
exports.orderIDParamValidator = async (req, res, next) => {
  try {
    const fields = [
      param('idPedido')
      .isMongoId()
      .withMessage('Formato ObjectId no válido')
    ]
    await Promise.all(fields.map(field => field.run(req)))
    next()
  } catch (error) {
    return res.status(500).json({
      message: `Ha ocurrido un error`,
      explanation: `Error al realizar la validación de los campos`,
      details: {
        errors: [ error ]
      }
    })
  }
}

/**
 * Funcion para validar el `_id` del usuario
 * en los parametros de la peticion
 *
 * @param {object} req - user request
 * @param {object} res - server response
 * @param {function} next - continue to the next middleware
 * @returns {Promise}
*/
exports.orderUserIDParamValidator = async (req, res, next) => {
  try {
    const fields = [
      param('idUsuario')
      .isMongoId()
      .withMessage('Formato ObjectId de usuario no válido')
    ]
    await Promise.all(fields.map(field => field.run(req)))
    next()
  } catch (error) {
    return res.status(500).json({
      message: `Ha ocurrido un error`,
      explanation: `Error al realizar la validación de los campos`,
      details: {
        errors: [ error ]
      }
    })
  }
}
