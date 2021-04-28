const { body } = require('express-validator')

/**
 * Modulo para validar campos
 * 
 * @module validators/user-validator
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
exports.loginValidator = async (req, res, next) => {
  try {
    const fields = [
      body('email')
      .exists()
      .withMessage('Campo obligatorio')
      .normalizeEmail()
      .isEmail()
      .withMessage('Formato de email inválido'),
      body('password')
      .exists()
      .withMessage('Campo obligatorio')
      .notEmpty()
      .withMessage('Campo no debe estar vacío'),
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
 * Funcion para validar los campos en el cuerpo
 * de la peticion
 *
 * @param {object} req - user request
 * @param {object} res - server response
 * @param {function} next - continue to the next middleware
 * @returns {Promise}
*/
exports.signupValidator = async (req, res, next) => {
  const minLen = 6
  try {
    const fields = [
      body('nombre')
      .exists()
      .withMessage('Campo obligatorio')
      .notEmpty()
      .withMessage('Campo no debe estar vacío')
      .escape(),
      body('email')
      .exists()
      .withMessage('Campo obligatorio')
      .normalizeEmail()
      .isEmail()
      .withMessage('Formato de email inválido'),
      body('password')
      .exists()
      .withMessage('Campo obligatorio')
      .isLength({ min: minLen })
      .withMessage(`La contraseña debe ser de ${minLen} caracteres como mínimo`),
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
 * Funcion para validar los campos en el cuerpo
 * de la peticion
 *
 * @param {object} req - user request
 * @param {object} res - server response
 * @param {function} next - continue to the next middleware
 * @returns {Promise}
*/
exports.userDeleteValidator = async (req, res, next) => {
  const minLen = 32
  try {
    const fields = [
      body('email')
      .exists()
      .withMessage('Campo obligatorio')
      .normalizeEmail()
      .isEmail()
      .withMessage('Formato de email inválido'),
      body('password')
      .exists()
      .withMessage('Campo obligatorio')
      .isLength({ min: minLen })
      .withMessage(`La contraseña debe ser de ${minLen} caracteres como mínimo`),
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
