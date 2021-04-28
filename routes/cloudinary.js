const { Router } = require('express')

const credentialsController = require('../controllers/credentialsController')
const auth = require('../middleware/auth')
const validator = require('../validators/cloudinary-validator')
const validationError = require('../handlers/validation-error-handler')

const router = Router()

/**
 * Modulo encargado del enrutamiento y el manejo de 
 * la nube de Cloudinary
 *
 * @module routes/cloudinary
*/

/**
 * Funcion para manejar la ruta de Cloudinary
*/
module.exports = function () {
  /** 
   * /cloud-cred
   * Verificar Authorization Header
   * Verificar JWT
   * Validar parametro `fileinfo`
   * Manejar error de validacion (si hay)
   * Obtener las credenciales de la nube de Cloudinary
  **/
  router.post('/:fileinfo',
    auth.checkAuthorizationHeader,
    auth.verifyToken,
    validator.cloudinaryValidator,
    validationError.handleValidationError,
    credentialsController.obtenerCloudCred
  )

  return router
}
