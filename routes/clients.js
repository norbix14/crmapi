const { Router } = require('express')

const clientController = require('../controllers/clienteController')
const auth = require('../middleware/auth')
const validator = require('../validators/client-validator')
const validationError = require('../handlers/validation-error-handler')

const router = Router()

/**
 * Modulo encargado del enrutamiento para los clientes
 * 
 * @module routes/clients
*/

/**
 * Funcion para manejar las rutas de clientes
*/
module.exports = function () {
  /** 
   * /clientes
   * Verificar Authorization Header
   * Verificar JWT
   * Validar campos
   * Manejar error de validacion (si hay)
   * Verificar cliente
   * Agregar un nuevo cliente
  **/
  router.post('/',
    auth.checkAuthorizationHeader,
    auth.verifyToken,
    validator.clientBodyValidator,
    validationError.handleValidationError,
    clientController.verificarCliente,
    clientController.nuevoCliente
  )

  /**
   * /clientes
   * Verificar Authorization Header
   * Verificar JWT
   * Obtener todos los clientes
  **/
  router.get('/',
    auth.checkAuthorizationHeader,
    auth.verifyToken,
    clientController.mostrarClientes
  )

  /** 
   * /clientes 
   * Verificar Authorization Header
   * Verificar JWT
   * Verificar parametro `idCliente`
   * Manejar error de validacion (si hay)
   * Obtener datos del cliente segun su `_id`
  **/
  router.get('/:idCliente',
    auth.checkAuthorizationHeader,
    auth.verifyToken,
    validator.clientIDParamValidator,
    validationError.handleValidationError,
    clientController.mostrarCliente
  )

  /** 
   * /clientes
   * Verificar Authorization Header
   * Verificar JWT
   * Verificar parametro `idCliente`
   * Manejar error de validacion (si hay)
   * Actualizar un cliente segun su `_id`
  **/
  router.put('/:idCliente',
    auth.checkAuthorizationHeader,
    auth.verifyToken,
    validator.clientIDParamValidator,
    validator.clientBodyValidator,
    validationError.handleValidationError,
    clientController.actualizarCliente
  )

  /** 
   * /clientes
   * Verificar Authorization Header
   * Verificar JWT
   * Verificar parametro `idCliente`
   * Manejar error de validacion (si hay)
   * Verificar que exista un cliente al cual eliminar segun su `_id`
   * Borrar un cliente segun su `_id`
  **/
  router.delete('/:idCliente',
    auth.checkAuthorizationHeader,
    auth.verifyToken,
    validator.clientIDParamValidator,
    validationError.handleValidationError,
    clientController.verificarClientePorID,
    clientController.eliminarCliente
  )

  return router
}
