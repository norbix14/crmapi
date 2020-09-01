const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const clienteController = require('../controllers/clienteController')
const credentialsController = require('../controllers/credentialsController')
const pedidosController = require('../controllers/pedidosController')
const productosController = require('../controllers/productosController')
const usuariosController = require('../controllers/usuariosController')

module.exports = function () {
	/** ZONA DE CLIENTES **/
	/** Agregar nuevos clientes **/
	router.post('/clientes', 
		auth, 
		clienteController.nuevoCliente
	)

	/** Obtener los clientes **/
	router.get('/clientes', 
	  auth, 
	  clienteController.mostrarClientes
	)

	/** Obtener cliente por ID **/
	router.get('/clientes/:idCliente', 
	  auth, 
	  clienteController.mostrarCliente
	)

	/** Actualizar un cliente **/
	router.put('/clientes/:idCliente', 
		auth, 
		clienteController.actualizarCliente
	)

	/** Borrar en cliente por ID**/
	router.delete('/clientes/:idCliente', 
		auth, 
		clienteController.eliminarCliente
	)

	/** ZONA DE PRODUCTOS **/
	/** Pedir credenciales de Cloudinary **/
	router.post('/cloud-cred/:fileinfo',
		auth,
		credentialsController.obtenerCloudCred
	)

	/** Agregar nuevos productos **/
	router.post('/productos', 
		auth, 
		productosController.nuevoProducto
	)

	/** Obtener los productos **/
	router.get('/productos', 
		auth, 
		productosController.mostrarProductos
	)

	/** Obtener un producto por ID **/
	router.get('/productos/:idProducto',
		auth,
		productosController.mostrarProducto
	)

	/** Actualizar un producto **/
	router.put('/productos/:idProducto',
		auth,
		productosController.actualizarProducto
	)

	/** Eliminar un producto por ID **/
	router.delete('/productos/:idProducto',
		auth,
		productosController.eliminarProducto
	)

	/** Busqueda de productos **/
	router.post('/productos/busqueda/:query',
		auth,
		productosController.buscarProducto
	)

	/** Agregar la imagen al producto **/
	router.post('/productos/imagen/:id', 
		auth, 
		productosController.imagenProducto
	)

	/** Eliminar la imagen del producto **/
	router.delete('/productos/imagen/:id', 
		auth, 
		productosController.eliminarImagenProducto
	)


	/** ZONA DE PEDIDOS **/
	/** Agregar nuevos pedidos **/
	router.post('/pedidos/nuevo/:idUsuario', 
		auth, 
		pedidosController.nuevoPedido
	)

	/** Obtener los pedidos **/
	router.get('/pedidos', 
		auth, 
		pedidosController.mostrarPedidos
	)

	/** Eliminar un pedido por ID **/
	router.delete('/pedidos/:idPedido', 
		auth, 
		pedidosController.eliminarPedido
	)


	/** ZONA DE USUARIOS **
	/** Crear una cuenta (solo por POSTMAN por ahora) **/
	router.post('/crear-cuenta', 
		usuariosController.registrarUsuario
	)

	/** Iniciar sesion **/
	router.post('/iniciar-sesion', 
		usuariosController.autenticarUsuario
	)

	return router
}
