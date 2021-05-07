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

  /**
   * 跳转到签到页面
   */
  navToSign() {
    if (app.userType !== 3) {
      tt.navigateTo({
        url: `/pages/sign/list/list?courseId=${this.data.courseId}`,
      });
    } else {
      tt.navigateTo({
        url: `/pages/sign/signIn/signIn?courseId=${this.data.courseId}`,
      });
    }
  },

  /**
   * 跳转到作业列表页面
   */
  navToWorkList() {
    tt.navigateTo({
      url: `/pages/work/list/list?courseId=${this.data.courseId}`,
    });
  },
});
