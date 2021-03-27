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
  // 发布作业
  newTaskUrl: `${host}/work/new`,
  // 获取全部任务
  getTaskUrl: `${host}/work/allWork`,
  // 获取全部文档
  getDocUrl: `${host}/file/getAll`,
  // 打分
  postGradeUrl: `${host}/file/grade`,
};

module.exports = config;
