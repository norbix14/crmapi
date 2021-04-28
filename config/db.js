const mongoose = require('mongoose')
mongoose.Promise = global.Promise

/**
 * Modulo encargado de la conexion a BBDD
 * 
 * @module config/db
*/

/**
 * Funcion para conectar BBDD
 * 
 * @param {string} uri - string connection to MongoDB
 * @param {object} options - configuration object
*/
exports.MongoConn = (uri, options = {}) => {
  try {
    if (!uri || uri.length <= 0) {
      throw new Error('Cadena de conexion invalida')
    }
    const opts = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
      ...options,
    }
    mongoose.connect(uri, opts)
    mongoose.connection.on('connected', () => console.log('MongoDB conectado'))
    mongoose.connection.on('error', () => console.log('Error al conectar con MongoDB'))
  } catch (err) {
    console.log(err)
    console.log('Ha ocurrido un error al conectar con MongoDB')
  }
}
