# CRM API

API para la administracion de clientes

Es consumida por la **[App](https://github.com/norbix14/crmclientenode)** en **`React`**

## Pasos

Clonar repositorio

		git clone <repository>

Instalar las dependencias necesarias

		npm i

Ejecutar **[API](http://localhost:4000)** en modo de desarrollo

		npm run development

## Elementos necesarios

Cuentas en las siguientes plataformas

**[MongoDBAtlas](https://www.mongodb.com/cloud/atlas)**

**[Cloudinary](https://cloudinary.com/)**

**Variables de entorno en un archivo `.env`**

		# Frase secreta para firmar JsonWebToken
		JWT_SECRET=""

		# Usuario y contraseña para eliminar usuario por POSTMAN
		SUPER_USER=""
		DELETE_AUTHORIZATION_PASSWORD=""

		# Credenciales de la cuenta en Cloudinary
		CLOUDINARY_CLOUD_NAME=""
		CLOUDINARY_API_KEY=""
		CLOUDINARY_API_SECRET=""
		CLOUDINARY_URL_FRONTEND=""

		# Url del frontend (opcional por politicas CORS)
		URL_CRM_FE_DEV=""
		URL_CRM_FE_PROD=""

		# Uri de conexion a la cuenta en MongoDbAtlas
		MONGODB_URI_LOCAL=""
		MONGODB_URI_REMOTE=""
