# CRM API

API para la administracion de clientes

Es consumida por la **[App](https://github.com/norbix14/crm)** en **`React`**

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

		# Usuario y contraseña para eliminar usuario por POSTMAN
		# Es opcional y no afecta la aplicacion mientras se usa
		SUPER_USER="<string>"
		DELETE_AUTHORIZATION_PASSWORD="<string>"

		# Url del frontend (opcional por politicas CORS)
		URL_CRM_FE_DEV="<string>"
		URL_CRM_FE_PROD="<string>"

		# Frase secreta para firmar JsonWebToken
		JWT_SECRET="<string>"

		# Credenciales de la cuenta en Cloudinary
		CLOUDINARY_CLOUD_NAME="<string>"
		CLOUDINARY_API_KEY=<number>
		CLOUDINARY_API_SECRET="<string>"
		CLOUDINARY_URL_FRONTEND="https://api.cloudinary.com/v1_1/<cloudname>/image/upload"

		# Uri de conexion a la cuenta en MongoDbAtlas
		MONGODB_URI_LOCAL=""
		MONGODB_URI_REMOTE="mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>?retryWrites=true&w=majority"
