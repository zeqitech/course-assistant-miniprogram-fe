Page({
  /**
   * 页面初始数据
   */
  data: {},

  /**
   * 监听页面初始化生命周期
   * @param {Object} options
   */
  onLoad(options) {
    console.log('-----------------view sign-------------------');
    console.log(options);
    console.log('---------------------------------------------');
    this.setData({
      token: options.token,
    });
  },

  /**
   * 跳转到发布签到页面
   */
  navToNewSign() {
    tt.navigateTo({
      url: '/pages/newSign/newSign?token=' + this.data.token,
    });
  },
});
