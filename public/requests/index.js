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
};

export default requests;
