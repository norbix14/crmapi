const { Router } = require('express')
const homeController = require('../controllers/homeController')

const router = Router()

/**
 * Modulo encargado del enrutamiento de la pagina principal
 * 
 * @module routes/home
*/

/**
 * Funcion para manejar la ruta de la pagina principal
*/
module.exports = function () {
  /** 
   * /
  **/
  router.get('/',
    homeController.home
  )
  return router
}
