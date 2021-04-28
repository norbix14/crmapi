const { Router } = require('express')

const userController = require('../controllers/usuariosController')
const signupController = require('../controllers/signupController')
const validator = require('../validators/user-validator')
const validationError = require('../handlers/validation-error-handler')

const router = Router()

/**
 * Modulo encargado del enrutamiento al crear una cuenta
 * 
 * @module routes/signup
*/

/**
 * Funcion para manejar la ruta de crear cuenta
*/
module.exports = function () {
  /** 
   * (solo con POSTMAN por ahora)
   * /crear-cuenta 
   * Validar campos
   * Manejar error de validacion (si hay)
   * Verificar que un usuario exista
   * Crear una cuenta
  **/
  router.post('/',
    validator.signupValidator,
    validationError.handleValidationError,
    userController.verificarUsuario,
    signupController.registrarUsuario
  )

  return router
}
