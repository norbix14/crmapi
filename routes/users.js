const { Router } = require('express')

const userController = require('../controllers/usuariosController')
const validator = require('../validators/user-validator')
const validationError = require('../handlers/validation-error-handler')

const router = Router()

/**
 * Modulo encargado del enrutamiento al realizar
 * acciones con el usuario
 * 
 * @module routes/users
*/

/**
 * Funcion para manejar las rutas de usuarios
*/
module.exports = function () {
  /** 
   * (solo con POSTMAN por ahora)
   * /usuarios 
   * Validar campos
   * Manejar error de validacion (si hay)
   * Verificar contraseña
   * Verificar que un usuario exista
   * Eliminar un usuario
  **/
  router.delete('/',
    validator.userDeleteValidator,
    validationError.handleValidationError,
    userController.verificarPasswordParaEliminar,
    userController.verificarUsuario,
    userController.eliminarUsuario
  )

  return router
}
