const { jwtCheck } = require('../util/jwt');
module.exports = (app) => {
	const login = require('../controllers/login.controller.js');
	const apiPre = '/api/system';
	// login
	app.post(`${apiPre}/login`, login.into);
	// login
	app.post(`${apiPre}/logout`, jwtCheck, login.out);
};
