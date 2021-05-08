// 全局变量
const globalData = getApp().globalData;
// 全局函数
const globalFunction = getApp().globalFunction;

Page({
  /**
   * 页面初始数据
   */
  data: {
    // 所有签到列表
    signList: [],
    // 课程 ID
    courseId: '',
  },

  /**
   * 生命周期函数 - 监听页面加载
   * @param {Object} options
   */
  onLoad(options) {
    // 保存课程 ID
    this.setData({
      courseId: options.courseId,
    });
  },

  /**
   * 生命周期函数 - 监听页面展示
   */
  async onShow() {
    // 首先获取签到列表
    let signList = await this.handleGetSignList();
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
        url: globalData.urlConfig.getAllSignUrl,
        data: {
          courseId: this.data.courseId,
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
    console.log(signListRes);
    // 获取成功
    if (signListRes.success) {
      return signListRes.data.signList;
    } else {
      // 获取失败，返回空数组
      return [];
    }
  },

  pageNavigator(e) {
    globalFunction.pageNavigator(e, this.data);
  },
});
