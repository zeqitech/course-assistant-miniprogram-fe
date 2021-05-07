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
    // 如果当前用户不是学生
    if (app.userType !== 3) {
      // 查看签到列表
      tt.navigateTo({
        url: `/pages/sign/list/list?courseId=${this.data.courseId}`,
      });
    } else {
      // 当前用户是学生
      // 直接跳转到签到页面
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
