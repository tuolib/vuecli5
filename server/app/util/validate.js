const _ = require("lodash");
const Big = require("big.js/big");
var { jwtCheckStr } = require("../util/jwt");

function trimSpace(str, is_global) {
  // is_global=='g'，全局空格，不传参数去掉前后空格
  var result = "";
  if (str) {
    result = str.replace(/(^\s+)|(\s+$)/g, "");
  }
  if (is_global && str) {
    if (is_global.toLowerCase() === "g") {
      result = result.replace(/\s/g, "");
    }
  }
  return result;
}

function checkLength(str) {
  // 字符串长度计算
  var realLength = 0;
  if (str) {
    var len = trimSpace(str).length;
    realLength = len;
  }
  return realLength;
}

/**
 *
 * @param obj
 * @param rules
 * @returns {*}
 *
 * 参数
 required： true, 表示必输项
 tip ： 提示语句
 decimal：0表示整数，2代表保留2位以内的小数，以此类推
 strMax ：最大字符长度， strMin： 最小字符长度
 numMax： 数值最大， numMin： 最小数值
 define: 自定义校验函数
 使用如下四种写法（除了自定义校验以外：{define: this.checkCompanyId, tip: '请输入。。。'} ）：
 [
 {require: true, tip: '年龄不能为空'},
 {strMax: 5, strMin: 2, tip:'长度在 2 到 5 个字符'},
 {numMax: 1000000000000, numMin: 0, tip: '请输入0到12位数值'},
 {decimal: 0, tip: '请输入整数'},
 {define: this.checkCompanyId, tip: '请输入。。。'}
 ],
 */
function validateValue(obj, rules) {
  // 校验函数
  // 参数obj 为值
  let newObj = _.cloneDeep(obj);
  let value = _.isArray(newObj) ? newObj : _.trim(newObj);
  // rule 为数组规则
  let rule = rules;
  // 新增自定义提示语句
  if (rule && rule.length > 0) {
    for (let i = 0; i < rule.length; i++) {
      if (
        value === "" ||
        value === null ||
        value === undefined ||
        (Array.isArray(value) && value.length === 0)
      ) {
        if (rule[i].required) return rule[i].tip;
        continue;
      }
      if (rule[i].strMax || rule[i].strMin) {
        if (
          checkLength(value) > rule[i].strMax ||
          checkLength(value) < rule[i].strMin
        )
          return rule[i].tip;
      }
      if (rule[i].numMax || rule[i].numMin || rule[i].decimal >= 0) {
        let decimalLen = "";
        let decimalStr = value.toString().split(".")[1];
        if (decimalStr) decimalLen = value.toString().split(".")[1].length;
        if (!checkNumber(value)) return rule[i].tip;
        if (decimalLen && decimalLen > rule[i].decimal) return rule[i].tip;
        // 数值最大值 最小值 进行比较
        let valueBig = new Big(value);
        if (rule[i].numMax) {
          let maxBig = new Big(rule[i].numMax);
          if (maxBig.cmp(valueBig) === -1) {
            return rule[i].tip;
          }
        }
        if (rule[i].numMin) {
          let minBig = new Big(rule[i].numMin);
          if (minBig.cmp(valueBig) === 1) {
            return rule[i].tip;
          }
        }
        // if (value > rule[i].numMax || value < rule[i].numMin)
        //   return rule[i].tip;
      }
      if (rule[i].define) {
        var errTip = rule[i].define(value);
        if (!errTip) {
          return rule[i].tip;
        }
      }
    }
  }
}

function validateObj(obj, rule) {
  // 遍历对象校验
  for (let key in obj) {
    let tip = "";
    if (rule[key]) {
      tip = validateValue(obj[key], rule[key]);
    }
    if (tip) {
      // Message.warning(tip);
      return tip;
    }
  }
  return "";
}

function checkNumber(num) {
  // 判断是否是数字
  // var reg = new RegExp('^-?\\d*\\.?\\d*$');
  var reg = new RegExp("^[-]?[0-9]+(\\.[0-9]+)?$");
  var regPlus = new RegExp("^[+]?[0-9]+(\\.[0-9]+)?$");
  if (regPlus.test(num) || reg.test(num)) {
    return true;
  } else {
    return false;
  }
}

function validEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

function enNum(string) {
  const regex = /[^A-Za-z0-9]/g;
  return !regex.test(string);
}

function enPreAndNum(string) {
  const regex = /^[a-z][0-9,a-z]$/;
  // /^[a-z][0-9,a-z]{3,14}$/
  return regex.test(string);
}

function enAndNum(string) {
  const regex = /^.*(?=.*\d)(?=.*[a-zA-Z]).*$/;
  // /^[a-z][0-9,a-z]{3,14}$/
  return regex.test(string);
}

function isImage(imageName) {
  // console.log(item);
  if (
    imageName.toLowerCase().indexOf(".jpg") !== -1 ||
    imageName.toLowerCase().indexOf(".jpeg") !== -1 ||
    imageName.toLowerCase().indexOf(".png") !== -1 ||
    imageName.toLowerCase().indexOf(".gif") !== -1 ||
    imageName.toLowerCase().indexOf(".webp") !== -1 ||
    imageName.toLowerCase().indexOf(".flif") !== -1 ||
    imageName.toLowerCase().indexOf(".cr2") !== -1 ||
    imageName.toLowerCase().indexOf(".tif") !== -1 ||
    imageName.toLowerCase().indexOf(".bmp") !== -1 ||
    imageName.toLowerCase().indexOf(".jxr") !== -1 ||
    imageName.toLowerCase().indexOf(".ico") !== -1 ||
    imageName.toLowerCase().indexOf(".bpg") !== -1 ||
    imageName.toLowerCase().indexOf(".jp2") !== -1 ||
    imageName.toLowerCase().indexOf(".jpx") !== -1 ||
    imageName.toLowerCase().indexOf(".heic") !== -1 ||
    imageName.toLowerCase().indexOf(".cur") !== -1 ||
    imageName.toLowerCase().indexOf(".dcm") !== -1
  ) {
    return true;
  } else {
    return false;
  }
}

function isVideo(imageName) {
  // console.log(item);
  if (!imageName || typeof imageName != "string") return false;
  // var a = ['cd', 'ogg', 'mp3', 'asf', 'wma', 'wav', 'mp3pro', 'rm', 'real', 'ape', 'module', 'midi', 'vqf'];
  var v = ["avi", "wma", "rmvb", "rm", "flash", "mp4", "mid", "3gp"];
  imageName = imageName.split(".");
  imageName = imageName[imageName.length - 1];
  var isV = false;
  for (var i in v) {
    if (v[i] == imageName) {
      isV = true;
    }
  }

  return isV; //视频
}

function isAudioFun(imageName) {
  // console.log(item);

  if (!imageName || typeof imageName != "string") return false;
  var a = [
    "cd",
    "ogg",
    "mp3",
    "asf",
    "wma",
    "wav",
    "mp3pro",
    "rm",
    "real",
    "ape",
    "module",
    "midi",
    "vqf",
    "m4a",
    "aac",
    "flac"
  ];
  // var v = ['avi', 'wma', 'rmvb', 'rm', 'flash', 'mp4', 'mid', '3gp'];
  imageName = imageName.split(".");
  imageName = imageName[imageName.length - 1];
  var isV = false;
  // console.log(imageName)
  for (var i in a) {
    if (a[i] == imageName) {
      isV = true;
    }
  }

  return isV; //视频
}

// v = ['avi', 'wma', 'rmvb', 'rm', 'flash', 'mp4', 'mid', '3gp'];

function arrayEquals(array1, array2) {
  const listA = array1;
  const listB = array2;

  const result =
    listA.length === listB.length &&
    listA.every(a => listB.some(b => a === b)) &&
    listB.every(_b => listA.some(_a => _a === _b));

  return result;
  // if (!(array1 || array1)) {
  //   return false;
  // }
  // // 先比较长度
  // if (array1.length != array2.length) return false;
  //
  // for (var i = 0, l = array1.length; i < l; i++) {
  //   // 检查是否为内嵌数组
  //   if (array1[i] instanceof Array && array2[i] instanceof Array) {
  //     // 递归比较数组
  //     if (!arrayEquals(array1[i], array2[i])) return false;
  //   } else if (this[i] != array[i]) {
  //     //标量比较
  //     return false;
  //   }
  // }
  // return true;
}

function isJson(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}

//数组去重
function unique(arr) {
  if (!Array.isArray(arr)) {
    console.log("type error!");
    return;
  }
  let res = [],
    obj = {};
  for (let i = 0; i < arr.length; i++) {
    if (!obj[arr[i]]) {
      res.push(arr[i]);
      obj[arr[i]] = 1;
    } else {
      obj[arr[i]]++;
    }
  }
  return res;
}

function connectValidate(msg, socket) {
  // 校验传输信息 是否是json
  var isJsonStr = isJson(msg);
  var tokenRight = false;
  var jsonObject = {};
  // console.log('isJsonStr', isJsonStr);
  if (isJsonStr) {
    jsonObject = JSON.parse(msg);
    if (jsonObject.authtoken) {
      tokenRight = jwtCheckStr(jsonObject.authtoken);
    }
  }
  // 校验 token 是否有效
  if (!tokenRight) {
    let backData = {
      type: "serverToken",
      success: 0,
      respMsg: "Please log in!",
      respCode: "10014"
    };
    socket.emit("serverToken", JSON.stringify(backData));
  }
  return {
    jsonObject: jsonObject,
    tokenRight: tokenRight
  };
}

// 是否是偶数
function isEven(num) {
  if (!checkNumber(num)) return false;
  return num % 2 === 0;
}

function isArray(arr) {
  if (Array.isArray(arr)) {
    return true;
  } else {
    return false;
  }
}

module.exports = {
  validateValue: validateValue,
  validateObj: validateObj,
  checkLength: checkLength,
  trimSpace: trimSpace,
  checkNumber: checkNumber,
  validEmail: validEmail,
  enNum: enNum,
  enAndNum: enAndNum,
  enPreAndNum: enPreAndNum,
  isImage,
  isVideo,
  isAudioFun,
  arrayEquals,
  isJson,
  unique,
  connectValidate,
  isEven,
  isArray,
};
