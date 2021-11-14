const sql = require('./db.js');
const bcrypt = require('bcrypt');
const backFun = require('../util/backMsg');
const { jwtDecoded } = require('../util/jwt');
const moment = require('moment');
const _ = require('lodash');
const utilEnv = require('../util/env');

let filePath = utilEnv.getFilePre();

const {
	validateObj,
	validEmail,
	enNum,
	checkNumber,
	enAndNum,
	trimSpace,
} = require('../util/validate');
// constructor
const Person = function (info) {
	// this.username = info.username;
	// this.email = info.email;
	// this.address = info.address;
	// this.avatar = info.avatar;
};

Person.info = (req, result) => {
	let userObj = jwtDecoded(req.headers.authtoken);
	
	let param = {};
	result(null, backFun(1, param));
};

module.exports = Person;
