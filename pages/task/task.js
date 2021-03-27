const app = getApp().globalData;

Page({
  /**
   * 页面初始数据
   */
  data: {
    token: '',
    isTeacher: app.isTeacher,
  },

  /**
   * 页面加载时执行的生命周期函数
   * @param {Object} options
   */
  onLoad(options) {
    console.log('-----------task page--------------');
    console.log(options);
    console.log('----------------------------------');
    this.setData({
      token: options.token,
      chatId: options.chatId,
    });
  },

  /**
   * 获取任务列表
   */
  getTask() {
    tt.request({
      url: app.urlConfig.getTaskUrl,
      data: {
        groupToken: this.data.token,
      },
      header: {
        'content-type': 'application/json',
      },
      success(res) {
        console.log(res);
      },
      fail(res) {
        console.log(`request 调用失败`);
      },
    });
  },

  /**
   * 跳转到作业文档列表
   * @param {Object} e
   */
  navToDoc(e) {
    tt.navigateTo({
      url: '/pages/doc/doc?token=' + e.currentTarget.dataset.token,
    });
  },

  /**
   *
   */
  handleTapSign() {
    if (this.data.isTeacher) {
      tt.navigateTo({
        url: '/pages/viewSign/viewSign',
      });
    } else {
      tt.navigateTo({
        url: '/pages/sign/sign?token=' + this.data.token,
      });
    }
  },

  /**
   * 跳转到发布作业页面
   */
  navToNewTask() {
    tt.navigateTo({
      url: `/pages/newTask/newTask?token=${this.data.token}&chatId=${this.data.chatId}`,
    });
  },
});
