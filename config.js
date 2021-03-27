/**
 * 小程序配置文件
 */

var host = 'http://121.196.153.233:8001/butler';

var config = {
  host,

  loginUrl: `${host}/login`,

  getClassUrl: `${host}/group/getAll`,
};

module.exports = config;
