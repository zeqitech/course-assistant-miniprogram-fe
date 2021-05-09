import url from './config';

const requests = {
  /**
   * 用户
   */
  // 用户登录
  async login(data) {
    // 发送用户登录请求
    let res = await new Promise((resolve) => {
      tt.request({
        url: url.loginUrl,
        data: {
          code: data.pageData.code,
        },
        header: {
          'content-type': 'application/json',
        },
        complete(res) {
          // 返回数据
          resolve(res.data);
        },
      });
    });
    // 返回数据
    return res;
  },

  /**
   * 课程
   */
  // 课程列表
  async getCourseList(data) {
    // 发送获取课程列表请求
    let res = await new Promise((resolve) => {
      tt.request({
        url: url.getCourseUrl,
        data: {
          openId: data.pageData.openId,
        },
        header: {
          'content-type': 'application/json',
        },
        complete(res) {
          resolve(res.data);
        },
      });
    });
    return res;
  },

  /**
   * 作业
   */
  // 发布作业
  async postWorkNew(data) {
    let res = await new Promise((resolve) => {
      tt.request({
        url: url.addWorkUrl,
        method: 'POST',
        data: {
          startTime: data.pageData.startDate + ' 00:00:00',
          expireTime: data.pageData.endDate + ' 23:59:59',
          courseId: data.pageData.courseId,
          weight: parseInt(data.pageData.weight),
          openId: data.pageData.openId,
          workName: data.pageData.name,
          assistantAuth: data.pageData.assistantAuth,
          tag: data.pageData.tag,
        },
        header: {
          'content-type': 'application/json',
        },
        complete(res) {
          resolve(res.data);
        },
      });
    });
    return res;
  },
  // 修改作业信息
  async postWorkModify(data) {
    let res = await new Promise((resolve) => {
      tt.request({
        url: url.modifyWorkUrl,
        method: 'POST',
        data: {
          workId: data.pageData.workId,
          startTime: data.pageData.startDate + ' 00:00:00',
          expireTime: data.pageData.endDate + ' 23:59:59',
          workName: data.pageData.name,
          weight: parseInt(data.pageData.weight),
          courseId: data.pageData.courseId,
          assistantAuth: data.pageData.assistantAuth,
          tag: data.pageData.tag,
        },
        header: {
          'content-type': 'application/json',
        },
        // 回传数据
        complete(res) {
          resolve(res.data);
        },
      });
    });
    return res;
  },

  /**
   * 签到
   */
  // 未签到名单
  async getUnsignedList(data) {
    // 发送请求获取未签到名单
    let res = await new Promise((resolve) => {
      tt.request({
        url: url.unsignedListUrl,
        data: {
          signId: data.pageData.signId,
        },
        header: {
          'content-type': 'application/json',
        },
        complete(res) {
          resolve(res.data);
        },
      });
    });
    return res;
  },
  // 签到人数
  async getSignedCount(data) {
    // 发送请求获取签到人数
    let res = await new Promise((resolve) => {
      tt.request({
        url: url.signedCountUrl,
        data: {
          signId: data.pageData.signId,
        },
        header: {
          'content-type': 'application/json',
        },
        complete(res) {
          resolve(res.data);
        },
      });
    });
    return res;
  },
  // 获取发布的所有签到
  async getSignList(data) {
    let res = await new Promise((resolve) => {
      tt.request({
        url: url.getAllSignUrl,
        data: {
          courseId: data.pageData.courseId,
        },
        header: {
          'content-type': 'application/json',
        },
        complete(res) {
          // 回传参数
          resolve(res.data);
        },
      });
    });
    return res;
  },
  // 发布签到
  async postNewSign(data) {
    // 发起签到请求
    console.log(data);
    let res = await new Promise((resolve) => {
      tt.request({
        url: url.releaseSignUrl,
        method: 'POST',
        data: {
          courseId: data.pageData.courseId,
          expireTime: data.pageData.endTime,
          latitude: data.pageData.latitude,
          longitude: data.pageData.longitude,
          startTime: data.pageData.startTime,
          teacherId: data.pageData.openId,
        },
        header: {
          'content-type': 'application/json',
        },
        complete(res) {
          resolve(res.data);
        },
      });
    });
    return res;
  },

  /**
   * 助教
   */
  // 添加助教
  async addAssistant(data) {
    let res = await new Promise((resolve) => {});
  },
};

export default requests;
