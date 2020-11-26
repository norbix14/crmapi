require('dotenv').config({ path: 'variables.env' })

module.exports = [
	process.env.URL_CRM_FE_DEV,
	process.env.URL_CRM_FE_PROD
]
