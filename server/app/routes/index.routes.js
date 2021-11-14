const loginRoute = require('./login.routes.js');
const account = require('./account.routes.js');
module.exports = (app) => {
	loginRoute(app);
	account(app);
};
