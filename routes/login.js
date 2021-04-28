const { Router } = require('express')

const userController = require('../controllers/usuariosController')
const loginController = require('../controllers/loginController')
const validator = require('../validators/user-validator')
const validationError = require('../handlers/validation-error-handler')

const router = Router()

/**
 * Modulo encargado del enrutamiento al iniciar sesion
 * 
 * @module routes/login
*/

/**
 * Funcion para manejar la ruta de iniciar sesion
*/
module.exports = function () {
  /** 
   * /iniciar-sesion 
   * Validar campos
   * Manejar error de validacion (si hay)
   * Verificar que un usuario exista
   * Iniciar sesion
  **/
  router.post('/',
    validator.loginValidator,
    validationError.handleValidationError,
    userController.verificarUsuario,
    loginController.autenticarUsuario
  )

  return router
}
