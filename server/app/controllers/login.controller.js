const Login = require('../models/login.model.js');

const { validateObj } = require('../util/validate');
const backFun = require('../util/backMsg');
// Create and Save a new Customer
exports.into = (req, res) => {
  // Validate request
  // if (!req.body) {
  //   res.status(400).send({
  //     message: "Content can not be empty!"
  //   });
  // }
  let newLogin = {
    username: req.body.username ? req.body.username : '',
    password: req.body.password ? req.body.password : '',
  };
  // let isError =
  const rules = {
    //会员编号
    username: [{ required: true, tip: 'username is required' }],
    password: [{ required: true, tip: 'password is required' }],
  };
  let isRight = validateObj(newLogin, rules);
  if (isRight) {
    res.send(backFun(0, '', isRight));
    return;
  }
  // console.log('login.controller.js',req.body);
  // Create a Customer
  const login = new Login({
    username: req.body.username,
    password: req.body.password,
    loginType: req.body.loginType,
    deviceInfo: req.body.deviceInfo,
    machine: req.body.machine,
  });

  // Save Customer in the database
  Login.into(login, (err, data) => {
    if (err) res.status(200).send(data);
    else res.send(data);
  });
};

exports.out = (req, res) => {
  // Validate request
  // if (!req.body) {
  //   res.status(400).send({
  //     message: "Content can not be empty!"
  //   });
  // }
  let newLogin = {
    authtoken: req.headers.authtoken ? req.headers.authtoken : '',
  };
  const rules = {
    //会员编号
    authtoken: [{ required: true, tip: 'authtoken is not existing' }],
  };
  let isRight = validateObj(newLogin, rules);
  if (isRight) {
    res.send(backFun(0, '', isRight));
    return;
  }
  // Create a Customer
  const login = new Login({
    authtoken: req.headers.authtoken,
  });

  // Save Customer in the database
  Login.out(login, (err, data) => {
    if (err) res.status(200).send(data);
    else res.send(data);
  });
};
