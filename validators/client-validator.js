const {
  body,
  param
} = require('express-validator')

/**
 * Modulo para validar campos
 * 
 * @module validators/client-validator
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
exports.clientBodyValidator = async (req, res, next) => {
  try {
    const fields = [
      body('email')
      .exists()
      .withMessage('Campo obligatorio')
      .normalizeEmail()
      .isEmail()
      .withMessage('Formato de email inválido'),
      body('nombre')
      .exists()
      .withMessage('Campo obligatorio')
      .notEmpty()
      .withMessage('Campo no debe estar vacío')
      .escape(),
      body('apellido')
      .exists()
      .withMessage('Campo obligatorio')
      .notEmpty()
      .withMessage('Campo no debe estar vacío')
      .escape(),
      body('empresa')
      .escape(),
      body('telefono')
      .escape(),
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
 * Funcion para validar el parametro ID en los 
 * parametros de la peticion
 *
 * @param {object} req - user request
 * @param {object} res - server response
 * @param {function} next - continue to the next middleware
 * @returns {Promise}
*/
exports.clientIDParamValidator = async (req, res, next) => {
  try {
    const fields = [
      param('idCliente')
      .isMongoId()
      .withMessage('Formato de ObjectId no válido')
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
