const { Router } = require('express')

const orderController = require('../controllers/pedidosController')
const auth = require('../middleware/auth')
const validator = require('../validators/order-validator')
const validationError = require('../handlers/validation-error-handler')

const router = Router()

/**
 * Modulo encargado del enrutamiento y el manejo de
 * los pedidos
 *
 * @module routes/orders
*/

/**
 * Funcion para manejar las rutas de pedidos
*/
module.exports = function () {
  /** 
   * /pedidos 
   * Verificar Authorization Header
   * Verificar JWT
   * Obtener todos los pedidos 
  **/
  router.get('/',
    auth.checkAuthorizationHeader,
    auth.verifyToken,
    orderController.mostrarPedidos
  )

  /** 
   * /pedidos
   * Verificar Authorization Header
   * Verificar JWT
   * Verificar `_id` del usuario
   * Validar cuerpo de la peticion
   * Manejar error de validacion (si hay)
   * Agregar un nuevo pedido y el `_id` del usuario
   * que lo ordeno
  **/
  router.post('/nuevo/:idUsuario',
    auth.checkAuthorizationHeader,
    auth.verifyToken,
    validator.orderUserIDParamValidator,
    validator.orderBodyValidator,
    validationError.handleValidationError,
    orderController.nuevoPedido
  )

  /** 
   * /pedidos
   * Verificar Authorization Header
   * Verificar JWT
   * Verificar parametro `idPedido`
   * Manejar error de validacion (si hay)
   * Verificar que el pedido exista
   * Eliminar un pedido segun su `_id`
  **/
  router.delete('/:idPedido',
    auth.checkAuthorizationHeader,
    auth.verifyToken,
    validator.orderIDParamValidator,
    validationError.handleValidationError,
    orderController.verificarPedido,
    orderController.eliminarPedido
  )

  return router
}
