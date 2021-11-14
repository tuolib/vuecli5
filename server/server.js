const express = require('express');
const bodyParser = require('body-parser');
const app = express();
var server = require('http').createServer(app);
app.use('/file', express.static(__dirname + '/file'));
app.all('*', function (req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'X-Requested-With');
	res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');
	res.header('X-Powered-By', ' 3.2.1');
	res.header('Content-Type', 'application/json;charset=utf-8');
	next();
});
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// simple route
app.get('/', (req, res) => {
	res.json({ message: 'Welcome to bezkoder application.' });
});

process.env.PORT = 3000;
require('./app/routes/index.routes.js')(app);
const PORT = process.env.PORT || 3000;

console.log(process.env.PORT);

server.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}.`);
});
