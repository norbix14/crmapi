const { body, param } = require('express-validator')

/**
 * Modulo para validar campos
 *
 * @module validators/product-validator
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
exports.productBodyValidator = async (req, res, next) => {
  try {
    const fields = [
      body('nombre')
      .notEmpty()
      .withMessage('Campo no debe estar vacío')
      .escape(),
      body('precio')
      .notEmpty()
      .withMessage('Campo no debe estar vacío')
      .isFloat()
      .withMessage('Campo debe ser un número'),
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
exports.productIDParamValidator = async (req, res, next) => {
  try {
    const fields = [
      param('idProducto')
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
 * Funcion para validar el parametro `publicid` del producto
 * en los parametros de la peticion
 *
 * @param {object} req - user request
 * @param {object} res - server response
 * @param {function} next - continue to the next middleware
 * @returns {Promise}
*/
exports.productImagePublicIdParamValidator = async (req, res, next) => {
  try {
    const fields = [
      param('publicid')
      .isUUID()
      .withMessage('Formato UUID no válido')
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
