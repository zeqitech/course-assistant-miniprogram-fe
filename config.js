/**
 * 小程序配置文件
 */

var host = 'http://121.196.153.233:8001/butler';

var config = {
  host,
  // 登录
  loginUrl: `${host}/login`,
  // 添加课程
  addCourseUrl: `${host}/course/add`,
  // 老师（助教）或学生获取课程列表
  getCourseUrl: `${host}/course/list`,
  // 发布作业
  addWorkUrl: `${host}/work/new`,
  // 发布签到
  newSignUrl: `${host}/sign/publish`,
  // 修改作业信息
  modifyTaskUrl: `${host}/work/modify`,
  // 删除作业
  delTaskUrl: `${host}/work/delete`,
  // 获取全部作业
  getWorkUrl: `${host}/work/courseWork`,
  // 获取全部文档
  getDocUrl: `${host}/file/getAll`,
  // 打分
  postGradeUrl: `${host}/file/grade`,
  // 获取签到数据
  getSignUrl: `${host}/sign/getAll`,
  // 提前结束签到
  endSignUrl: `${host}/sign/close`,
};

module.exports = config;
