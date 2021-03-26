/**
 * 小程序配置文件
 */

var host = '14592619.qcloud.la';

var config = {
  host,

  loginUrl: `https://${host}/login`,

  requestUrl: `https://${host}/testRequest`,

  openIdUrl: `https://${host}/openid`,

  tunnelUrl: `https://${host}/tunnel`,

  paymentUrl: `https://${host}/payment`,

  templateMessageUrl: `https://${host}/templateMessage`,

  uploadFileUrl: `https://${host}/upload`,

  downloadExampleUrl: `https://${host}/static/weapp.jpg`,
};

module.exports = config;
