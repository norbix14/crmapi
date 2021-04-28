const { validationResult } = require('express-validator')

/**
 * Modulo encargado del manejo de los errores
 * de validacion
 * 
 * @module handlers/validation-error-handler 
*/

/**
 * Funcion para manejar los errores de validacion
 * 
 * @param {object} req - user request
 * @param {object} res - server response
 * @param {function} next - continue to the next middleware
*/
exports.handleValidationError = (req, res, next) => {
  const result = validationResult(req)
  if (result.isEmpty()) {
    return next()
  }

  const { errors = [] } = result
  const prettyErrors = []

  const getParam = item => item.param
  const getMsg = item => item.msg
  const getLocation = item => item.location

  const paramFields = errors.map(getParam)
  const uniqueParamFields = Array.from(new Set(paramFields))

  uniqueParamFields.forEach(param => {
    const err = errors.filter(item => item.param === param)
    const messages = err.map(getMsg)
    const locations = err.map(getLocation)
    const location = Array.from(new Set(locations)).join(' ')
    prettyErrors.push({
      location,
      param,
      messages
    })
  })

  return res.status(400).json({
    message: 'Revisar que todos los campos sean válidos y estén completos',
    explanation: `Campos inválidos: ${uniqueParamFields.join(', ')}`,
    details: {
      errors: prettyErrors
    }
  })
}
