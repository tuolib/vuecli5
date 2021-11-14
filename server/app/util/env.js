var os = require('os');
var ifaces = os.networkInterfaces();
var localIp = 'localhost';
var path = require('path');
var utilFun = require('./utils')

let results = {};
function getLocalIp() {
  results = {};
  Object.keys(ifaces).forEach(function (ifname) {
    var alias = 0;

    ifaces[ifname].forEach(function (iface) {
      if ('IPv4' !== iface.family || iface.internal !== false) {
        // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
        return;
      }
      if (alias >= 1) {
        // this single interface has multiple ipv4 addresses
        // console.log(ifname + ':' + alias, iface.address);
        localIp = iface.address;
        // console.log('localIp', localIp);
      } else {
        // this interface has only one ipv4 adress
        // console.log(ifname, iface.address);
        localIp = iface.address;
        // console.log('localIp', localIp);
      }
      if (!results[ifname]) {
        results[ifname] = [];
      }
      results[ifname].push(iface.address);
      ++alias;
    });
  });


  return localIp;
  // return localIp;
}

getLocalIp();
utilFun.consoleColor(utilFun.colorStr.FgYellow, `getLocalIp: ${localIp}`);
console.log('env.js:36', results);
// 图片，音频视频等文件地址前缀
function getFilePre() {
  let localIp = getLocalIp();
  var filePath = 'https://4ursafety.ml/file/';
  if (process.env.NODE_ENV == 'development') {
    filePath = 'http://' + localIp + ':3000/file/';
    // console.log('filePath:', filePath);
  }
  return filePath;
}

function getSavePre() {
  let filePre = '/www/admin/file/';
  if (process.env.NODE_ENV == 'development') {
    filePre = path.join(__dirname, '../../') + 'file/';
  }
  return filePre;
}

module.exports = {
  getLocalIp,
  getFilePre,
  getSavePre,
};
