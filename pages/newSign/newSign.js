Page({
  /**
   * 页面初始数据
   */
  data: {
    duration: 10,
  },

  /**
   * 页面初始化生命周期函数
   * @param {Object} options
   */
  onLoad(options) {},

  /**
   * 输入签到时长事件
   * @param {Object} e
   */
  handleInputDuration(e) {
    this.setData({
      duration: parseInt(e.detail),
    });
  },

  /**
   * 点击发起签到按钮事件
   */
  handleNewSign() {},
});
