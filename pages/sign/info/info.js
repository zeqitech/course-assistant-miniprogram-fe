Page({
  /**
   * 页面初始数据
   */
  data: {
    // 签到 ID
    signId: '',
  },

  /**
   * 生命周期函数 - 监听页面加载
   * @param {Object} options
   */
  onLoad(options) {
    console.log('签到情况', options);
    this.setData({
      signId: options.signId,
    });
  },

  /**
   * 生命周期函数 - 监听页面展示
   */
  onShow() {
    this.handleGetSignInfo();
  },

  // 获取签到信息
  handleGetSignInfo() {
    // 获取签到人数
    let signedCount = this.handleGetSignedCount();
    // 获取未签到名单
    let unsignedList = this.handleGetUnsignedList();
    return {
      signedCount,
      unsignedList,
    };
  },
});
