const { param } = require('express-validator')

/**
 * Modulo para validar campos
 *
 * @module validators/cloudinary-validator
*/

/**
 * Funcion para validar los campos
 *
 * @param {object} req - user request
 * @param {object} res - server response
 * @param {function} next - continue to the next middleware
 * @returns {Promise}
*/
exports.cloudinaryValidator = async (req, res, next) => {
  try {
    const fields = [
      param('fileinfo')
      .exists()
      .withMessage('Campo obligatorio')
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
