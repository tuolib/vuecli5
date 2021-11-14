

function randomNum(minNum,maxNum){
  switch(arguments.length){
    case 1:
      return parseInt(Math.random()*minNum+1,10);
      break;
    case 2:
      return parseInt(Math.random()*(maxNum-minNum+1)+minNum,10);
      break;
    default:
      return 0;
      break;
  }
}

// 获取 socket room 客户端连接数量
function getNumClient(param) {
  let clients = param.io.sockets.adapter.rooms[`user_${param.userId}`];
//to get the number of clients
  if (clients) {
    let numClients = (typeof clients.sockets !== 'undefined') ? Object.keys(clients.sockets).length : 0;
    return numClients;
  }
  return 0;
}

function getFileExtendingName(filename) {
  // 文件扩展名匹配正则
  var reg = /\.[^\.]+$/;
  var matches = reg.exec(filename);
  if (matches) {
    return matches[0];
  }
  return '';
}

function createHash(ids) {
  let hash = 0;
  for (let i = 0; i < ids.length; i++) {
    hash = (((hash * 0x4F25) & 0x7FFFFFFF) + ids[i]) & 0x7FFFFFFF;
  }
  return hash;
}

function compare(property, type){
  return function(a,b){
    var value1 = a[property];
    var value2 = b[property];
    if (!type) {
      return value1 - value2;
    } else {
      return value2 - value1;
    }
  }
}
function sortNumber(a,b) {
  return a - b
}
const colorStr = {
  Reset: "\x1b[0m",
  Bright: "\x1b[1m",
  Dim: "\x1b[2m",
  Underscore: "\x1b[4m",
  Blink: "\x1b[5m",
  Reverse: "\x1b[7m",
  Hidden: "\x1b[8m",

  FgBlack: "\x1b[30m",
  FgRed: "\x1b[31m",
  FgGreen: "\x1b[32m",
  FgYellow: "\x1b[33m",
  FgBlue: "\x1b[34m",
  FgMagenta: "\x1b[35m",
  FgCyan: "\x1b[36m",
  FgWhite: "\x1b[37m",

  BgBlack: "\x1b[40m",
  BgRed: "\x1b[41m",
  BgGreen: "\x1b[42m",
  BgYellow: "\x1b[43m",
  BgBlue: "\x1b[44m",
  BgMagenta: "\x1b[45m",
  BgCyan: "\x1b[46m",
  BgWhite: "\x1b[47m",
};

function consoleColor(str, obj) {
  console.log(`\x1b[36m%s${str}`, obj);
}

var iosName = {
  "i386": "iOS Simulator 32-bit",
  "x86_64": "iOS Simulator 64-bit",

  "iPhone1,1": "iPhone 1st Gen",
  "iPhone1,2": "iPhone 3G 2nd Gen",
  "iPhone2,1": "iPhone 3GS 3rd Gen",
  "iPhone3,1": "iPhone 4",
  "iPhone3,2": "iPhone 4 (GSM) Rev A",
  "iPhone3,3": "iPhone 4 (CDMA)",
  "iPhone4,1": "iPhone 4s",
  "iPhone5,1": "iPhone 5 (GSM)",
  "iPhone5,2": "iPhone 5 (CDMA+LTE)",
  "iPhone5,3": "iPhone 5c (GSM)",
  "iPhone5,4": "iPhone 5c (Global)",
  "iPhone6,1": "iPhone 5s (GSM)",
  "iPhone6,2": "iPhone 5s (Global)",
  "iPhone7,1": "iPhone 6 Plus",
  "iPhone7,2": "iPhone 6",
  "iPhone8,1": "iPhone 6s",
  "iPhone8,2": "iPhone 6s Plus",
  "iPhone8,4": "iPhone SE",
  "iPhone9,1": "iPhone 7",
  "iPhone9,2": "iPhone 7 Plus",
  "iPhone9,3": "iPhone 7 (no CDMA)",
  "iPhone9,4": "iPhone 7 Plus (no CDMA)",
  "iPhone10,1": "iPhone 8",
  "iPhone10,2": "iPhone 8 Plus",
  "iPhone10,3": "iPhone X",
  "iPhone10,4": "iPhone 8 (no CDMA)",
  "iPhone10,5": "iPhone 8 Plus (no CDMA)",
  "iPhone10,6": "iPhone X (no CDMA)",
  "iPhone11,2": "iPhone XS",
  "iPhone11,4": "iPhone XS Max (special model?)",
  "iPhone11,6": "iPhone XS Max",
  "iPhone11,8": "iPhone XR",
  "iPhone12,1": "iPhone 11",
  "iPhone12,3": "iPhone 11 Pro",
  "iPhone12,5": "iPhone 11 Pro Max",
  "iPhone12,8": "iPhone SE 2nd Gen",

  "iPod1,1": "iPod 1st Gen",
  "iPod2,1": "iPod 2nd Gen",
  "iPod3,1": "iPod 3rd Gen",
  "iPod4,1": "iPod 4th Gen",
  "iPod5,1": "iPod 5th Gen",
  "iPod7,1": "iPod 6th Gen",
  "iPod9,1": "iPod 7th Gen",

  "iPad1,1": "iPad 1st Gen (WiFi)",
  "iPad1,2": "iPad 1st Gen (3G)",
  "iPad2,1": "iPad 2nd Gen (WiFi)",
  "iPad2,2": "iPad 2nd Gen (GSM)",
  "iPad2,3": "iPad 2nd Gen (CDMA)",
  "iPad2,4": "iPad 2nd Gen New Revision",
  "iPad2,5": "iPad mini 1st Gen (WiFi)",
  "iPad2,6": "iPad mini 1st Gen (GSM+LTE)",
  "iPad2,7": "iPad mini 1st Gen (CDMA+LTE)",
  "iPad3,1": "iPad 3rd Gen (WiFi)",
  "iPad3,2": "iPad 3rd Gen (CDMA)",
  "iPad3,3": "iPad 3rd Gen (GSM)",
  "iPad3,4": "iPad 4th Gen (WiFi)",
  "iPad3,5": "iPad 4th Gen (GSM+LTE)",
  "iPad3,6": "iPad 4th Gen (CDMA+LTE)",
  "iPad4,1": "iPad Air 1st Gen (WiFi)",
  "iPad4,2": "iPad Air 1st Gen (GSM+CDMA)",
  "iPad4,3": "iPad Air 1st Gen (China)",
  "iPad4,4": "iPad mini 2nd Gen (WiFi)",
  "iPad4,5": "iPad mini 2nd Gen (WiFi+Cellular)",
  "iPad4,6": "iPad mini 2nd Gen (China)",
  "iPad4,7": "iPad mini 3rd Gen (WiFi)",
  "iPad4,8": "iPad mini 3rd Gen (WiFi+Cellular)",
  "iPad4,9": "iPad mini 3rd Gen (China)",
  "iPad5,1": "iPad mini 4th Gen (WiFi)",
  "iPad5,2": "iPad mini 4th Gen (WiFi+Cellular)",
  "iPad5,3": "iPad Air 2 (WiFi)",
  "iPad5,4": "iPad Air 2 (WiFi+Cellular)",
  "iPad6,3": "iPad Pro 1st Gen (9.7 inch, WiFi)",
  "iPad6,4": "iPad Pro 1st Gen (9.7 inch, WiFi+Cellular)",
  "iPad6,7": "iPad Pro 1st Gen (12.9 inch, WiFi)",
  "iPad6,8": "iPad Pro 1st Gen (12.9 inch, WiFi+Cellular)",
  "iPad6,11": "iPad 5th Gen (WiFi)",
  "iPad6,12": "iPad 5th Gen (WiFi+Cellular)",
  "iPad7,1": "iPad Pro 2nd Gen (12.9 inch, WiFi)",
  "iPad7,2": "iPad Pro 2nd Gen (12.9 inch, WiFi+Cellular)",
  "iPad7,3": "iPad Pro 2nd Gen (10.5 inch, WiFi)",
  "iPad7,4": "iPad Pro 2nd Gen (10.5 inch, WiFi+Cellular)",
  "iPad7,5": "iPad 6th Gen (WiFi)",
  "iPad7,6": "iPad 6th Gen (WiFi+Cellular)",
  "iPad7,11": "iPad 7th Gen 10.2-inch (WiFi)",
  "iPad7,12": "iPad 7th Gen 10.2-inch (WiFi+Cellular)",
  "iPad8,1": "iPad Pro 3rd Gen (11 inch, WiFi)",
  "iPad8,2": "iPad Pro 3rd Gen (11 inch, WiFi, 1TB)",
  "iPad8,3": "iPad Pro 3rd Gen (11 inch, WiFi+Cellular)",
  "iPad8,4": "iPad Pro 3rd Gen (11 inch, WiFi+Cellular, 1TB)",
  "iPad8,5": "iPad Pro 3rd Gen (12.9 inch, WiFi)",
  "iPad8,6": "iPad Pro 3rd Gen (12.9 inch, WiFi, 1TB)",
  "iPad8,7": "iPad Pro 3rd Gen (12.9 inch, WiFi+Cellular)",
  "iPad8,8": "iPad Pro 3rd Gen (12.9 inch, WiFi+Cellular, 1TB)",
  "iPad8,9": "iPad Pro 2nd Gen (11 inch, WiFi)",
  "iPad8,10": "iPad Pro 2nd Gen (11 inch, WiFi+Cellular)",
  "iPad8,11": "iPad Pro 4th Gen (12.9 inch, WiFi)",
  "iPad8,12": "iPad Pro 4th Gen (12.9 inch WiFi+Cellular)",
  "iPad11,1": "iPad mini 5th Gen (WiFi)",
  "iPad11,2": "iPad mini 5th Gen (WiFi+Cellular)",
  "iPad11,3": "iPad Air 3rd Gen (WiFi)",
  "iPad11,4": "iPad Air 3rd Gen (WiFi+Cellular)",

  "Watch1,1": "Apple Watch 1st Gen 38mm case",
  "Watch1,2": "Apple Watch 1st Gen 42mm case",
  "Watch2,6": "Apple Watch Series 1 38mm case",
  "Watch2,7": "Apple Watch Series 1 42mm case",
  "Watch2,3": "Apple Watch Series 2 38mm case",
  "Watch2,4": "Apple Watch Series 2 42mm case",
  "Watch3,1": "Apple Watch Series 3 38mm case (GPS+Cellular)",
  "Watch3,2": "Apple Watch Series 3 42mm case (GPS+Cellular)",
  "Watch3,3": "Apple Watch Series 3 38mm case (GPS)",
  "Watch3,4": "Apple Watch Series 3 42mm case (GPS)",
  "Watch4,1": "Apple Watch Series 4 40mm case (GPS)",
  "Watch4,2": "Apple Watch Series 4 44mm case (GPS)",
  "Watch4,3": "Apple Watch Series 4 40mm case (GPS+Cellular)",
  "Watch4,4": "Apple Watch Series 4 44mm case (GPS+Cellular)",
  "Watch5,1": "Apple Watch Series 5 40mm case (GPS)",
  "Watch5,2": "Apple Watch Series 5 44mm case (GPS)",
  "Watch5,3": "Apple Watch Series 5 40mm case (GPS+Cellular)",
  "Watch5,4": "Apple Watch Series 5 44mm case (GPS+Cellular)"
}

module.exports = {
  randomNum,
  getNumClient,
  getFileExtendingName,
  createHash,
  compare,
  sortNumber,
  consoleColor,
  colorStr,
  iosName,
};
