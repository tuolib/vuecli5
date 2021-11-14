const { jwtCheck } = require('../util/jwt');

module.exports = (app) => {
	const person = require('../controllers/account.controller.js');

	const apiPre = '/api/account';
	// Create a new Customer
	app.post(apiPre + '/info', person.info);
	app.post(apiPre + '/routes', person.routes);
	app.post(apiPre + '/roles', person.roles);
};
