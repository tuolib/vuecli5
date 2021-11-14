const jwt = require('jsonwebtoken');

const backFun = require('../util/backMsg');
const jwtKey = 'junkaicool'; // token生成的密匙，根据自己需求定义

const jwtSign = (data, expires) => {
	// token生成函数，有效时间为一个小时
	// const token = jwt.sign(data, jwtKey, { expiresIn: 60 * 60 });
	let token;
	if (expires) {
		token = jwt.sign(data, jwtKey, { expiresIn: expires });
	} else {
		token = jwt.sign(data, jwtKey);
	}
	return token;
};

const jwtCheck = (req, res, next) => {
	// token验证函数
	const token = req.headers.authtoken;
	jwt.verify(token, jwtKey, (err, data) => {
		if (err) {
			res.send(backFun(0, '', 'The token is invalid', 10014));
		} else {
			req.jwtInfo = data;
			next();
		}
	});
};

const jwtCheckStr = (token, res, next) => {
	// token验证函数
	let isRight = false;
	jwt.verify(token, jwtKey, (err, data) => {
		if (err) {
			isRight = false;
		} else {
			isRight = true;
		}
	});
	return isRight;
};

const jwtDecoded = (data) => {
	const decoded = jwt.verify(data, jwtKey);
	return decoded;
};

module.exports = {
	jwtSign,
	jwtCheck,
	jwtDecoded,
	jwtCheckStr,
};
