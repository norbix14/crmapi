exports.home = (req, res) => {
	return res.status(200).json({
		message: 'Hola',
		project: 'https://github.com/norbix14/crmapi'
	})
}
