const { Router } = require('express')

const productController = require('../controllers/productosController')
const imageController = require('../controllers/imageController')
const auth = require('../middleware/auth')
const validator = require('../validators/product-validator')
const validationError = require('../handlers/validation-error-handler')

const router = Router()

/**
 * Modulo encargado del enrutamiento y el manejo de
 * los productos
 * 
 * @module routes/products
*/

/**
 * Funcion para manejar las rutas de productos
*/
module.exports = function () {
  /** 
   * /productos 
   * Verificar Authorization Header
   * Verificar JWT
   * Validar campos
   * Manejar error de validacion (si hay)
   * Agregar un nuevo producto
  **/
  router.post('/',
    auth.checkAuthorizationHeader,
    auth.verifyToken,
    validator.productBodyValidator,
    validationError.handleValidationError,
    productController.nuevoProducto
  )

  /** 
   * /productos
   * Verificar Authorization Header
   * Verificar JWT
   * Obtener todos los productos 
  **/
  router.get('/',
    auth.checkAuthorizationHeader,
    auth.verifyToken,
    productController.mostrarProductos
  )

  /** 
   * /productos
   * Verificar Authorization Header
   * Verificar JWT
   * Validar parametro `idProducto`
   * Manejar error de validacion (si hay)
   * Obtener los datos de un producto segun su `_id`
  **/
  router.get('/:idProducto',
    auth.checkAuthorizationHeader,
    auth.verifyToken,
    validator.productIDParamValidator,
    validationError.handleValidationError,
    productController.mostrarProducto
  )

  /** 
   * /productos
   * Verificar Authorization Header
   * Verificar JWT
   * Validar parametro `idProducto`
   * Validar campos
   * Manejar error de validacion (si hay)
   * Actualizar un producto segun su `_id`
  **/
  router.put('/:idProducto',
    auth.checkAuthorizationHeader,
    auth.verifyToken,
    validator.productIDParamValidator,
    validator.productBodyValidator,
    validationError.handleValidationError,
    productController.actualizarProducto
  )

  /** 
   * /productos 
   * Verificar Authorization Header
   * Verificar JWT
   * Validar parametro `idProducto`
   * Manejar error de validacion (si hay)
   * Eliminar un producto segun su `_id`
  **/
  router.delete('/:idProducto',
    auth.checkAuthorizationHeader,
    auth.verifyToken,
    validator.productIDParamValidator,
    validationError.handleValidationError,
    productController.verificarProducto,
    productController.eliminarProducto
  )

  /** 
   * /productos 
   * Verificar Authorization Header
   * Verificar JWT
   * Validar campos 
   * Buscar un producto 
  **/
  router.post('/busqueda/:query',
    auth.checkAuthorizationHeader,
    auth.verifyToken,
    productController.buscarProducto
  )

  /** 
   * /productos 
   * Verificar Authorization Header
   * Verificar JWT
   * Validar parametro `idProducto`
   * Manejar error de validacion (si hay)
   * Agregar la imagen al producto 
  **/
  router.post('/imagen/:idProducto',
    auth.checkAuthorizationHeader,
    auth.verifyToken,
    validator.productIDParamValidator,
    validationError.handleValidationError,
    productController.verificarProducto,
    imageController.agregarImagenProducto
  )

  /** 
   * /productos
   * Verificar Authorization Header
   * Verificar JWT
   * Validar parametro `publicid`
   * Manejar error de validacion (si hay)
   * Verificar si existe la imagen
   * Eliminar la imagen del producto segun su `public_id`
   * que se encuentra guardada en Cloudinary
  **/
  router.delete('/imagen/:publicid',
    auth.checkAuthorizationHeader,
    auth.verifyToken,
    validator.productImagePublicIdParamValidator,
    validationError.handleValidationError,
    productController.verificarImagenProducto,
    imageController.eliminarImagenProducto
  )

  return router
}
