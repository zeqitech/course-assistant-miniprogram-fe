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
};

export default requests;
