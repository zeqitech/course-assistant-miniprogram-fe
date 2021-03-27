Page({
  /**
   * 页面初始数据
   */
  data: {
    token: '',
  },

  /**
   * 监听页面加载事件
   * @param {Object} options
   */
  onLoad(options) {
    console.log('-------------------sign page------------------');
    console.log(options);
    console.log('----------------------------------------------');
    this.setData({
      token: options.token,
    });
  },
});
