/**
 * 小程序配置文件
 */

var host = 'http://121.196.153.233:8001/butler';

var config = {
  host,
  /* 课程 */
  // 添加课程
  addCourseUrl: `${host}/course/add`,
  // 课程列表
  getCourseUrl: `${host}/course/list`,
  /* 签到 */
  // 获取发布的所有签到
  getAllSignUrl: `${host}/sign/allSign`,
  // 结束签到
  closeSignUrl: `${host}/sign/close`,
  // 发布签到
  releaseSignUrl: `${host}/sign/release`,
  // 学生签到
  signInUrl: `${host}/sign/signIn`,
  // 已到人数
  signedCountUrl: `${host}/sign/signedCount`,
  // 未签到名单
  unsignedListUrl: `${host}/sign/unsignedList`,
  /* 文档 */
  // 打分
  gradeUrl: `${host}/workFile/grade`,
  // 获取文档列表
  getWorkFileListUrl: `${host}/workFile/list`,
  // 获取我的作业
  getMyWorkUrl: `${host}/workFile/myWork`,
  /* 用户 */
  // 登录
  loginUrl: `${host}/login`,
  /* 作业 */
  // 作业截至
  archiveUrl: `${host}/work/archive`,
  // 获取所有作业
  getWorkUrl: `${host}/work/courseWork`,
  // 删除作业
  delWorkUrl: `${host}/work/delete`,
  // 修改作业信息
  modifyWorkUrl: `${host}/work/modify`,
  // 发布作业
  addWorkUrl: `${host}/work/new`,
};

module.exports = config;
