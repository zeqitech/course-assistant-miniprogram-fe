const app = getApp().globalData;

Page({
  /**
   * 页面初始数据
   */
  data: {
    // 所有签到列表
    signList: [],
  },

  /**
   * 生命周期函数 - 监听页面加载
   * @param {Object} options
   */
  onLoad(options) {},

  /**
   * 生命周期函数 - 监听页面展示
   */
  onShow() {
    // 首先获取签到列表
    let signList = this.handleGetSignList();
    this.setData({
      signList: signList,
    });
  },

  /**
   * 获取签到记录列表
   * @returns 返回签到记录列表
   */
  async handleGetSignList() {
    // 发送获取签到列表请求
    let signListRes = await new Promise((resolve) => {
      tt.request({
        url: app.urlConfig.getAllSignUrl,
        data: {
          courseId: this.data.courseId,
        },
        header: {
          'content-type': 'application/json',
        },
        complete(res) {
          resolve(res.data);
        },
      });
    });
    // 获取成功
    if (signListRes.success) {
      return signListRes.signList;
    } else {
      // 获取失败，返回空数组
      return [];
    }
  },
});
