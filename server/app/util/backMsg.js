let backFun = function(success, content, respMsg, respCode) {
  return {
    respCode: respCode ? `${respCode}` : "10000",
    respMsg: respMsg ? respMsg : "operate success",
    success: success === 0 ? 0 : 1,
    content: content === undefined ? "" : content
  };
};

module.exports = backFun;
