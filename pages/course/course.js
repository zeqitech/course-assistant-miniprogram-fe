const app = getApp().globalData;

Page({
  /**
   * 页面初始数据
   */
  data: {
    token: '',
    chatId: '',
    cover: '',
  },

  /**
   * 页面加载生命周期函数
   * @param {Object} options
   */
  onLoad(options) {
    console.log('------------------class page----------------');
    console.log(options);
    console.log('--------------------------------------------');
    this.setData({
      courseId: options.courseId,
      cover: options.cover,
    });
  },

  navToSign() {
    if (app.isTeacher) {
      tt.navigateTo({
        url: `/pages/viewSign/viewSign?token=${this.data.token}`,
      });
    } else {
      tt.navigateTo({
        url: `/pages/sign/sign?token=${this.data.token}`,
      });
    }
  },

  /**
   * 跳转到作业列表页面
   */
  navToWork() {
    tt.navigateTo({
      url: `/pages/work/work?courseId=${this.data.courseId}`,
    });
  },
});
