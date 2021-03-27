/**
 * 小程序配置文件
 */

var host = 'http://121.196.153.233:8001/butler';

var config = {
  host,
  // 登录
  loginUrl: `${host}/login`,
  // 获取班级列表
  getClassUrl: `${host}/group/getAll`,
  // 新建班级
  newClassUrl: `${host}/group/new`,
  // 发布签到
  newSignUrl: `${host}/sign/publish`,
};

module.exports = config;
