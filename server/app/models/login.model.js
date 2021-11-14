const bcrypt = require('bcrypt');
const { jwtSign, jwtDecoded } = require('../util/jwt');
const moment = require('moment/moment');
const sql = require('./db.js');
const validate = require('../util/validate');
const backFun = require('../util/backMsg');
const utilEnv = require('../util/env');
const utilFun = require('../util/utils');

var filePath = utilEnv.getFilePre();

// constructor
const Login = function (login) {
  this.username = login.username;
  this.password = login.password;
  this.authtoken = login.authtoken;
  this.loginType = login.loginType;
  this.deviceInfo = login.deviceInfo;
  this.machine = login.machine;
};

Login.into = (newLogin, result) => {
  result(
    null,
    backFun(
      1,
      {
        token: '123',
      },
      'Login success',
    ),
  );
};

Login.out = async (newLogin, result) => {
  let decoded = jwtDecoded(newLogin.authtoken);

  result(null, backFun(1, '', 'Logout success'));
};

module.exports = Login;
