Page({
  /**
   * 页面初始数据
   */
  data: {
    showType: '',
  },

  /**
   * 页面加载生命周期函数
   * @param {Object} options
   */
  onLoad(options) {
    console.log('-----------------all class-----------------');
    console.log(options);
    console.log('-------------------------------------------');
    this.setData({
      showType: options.showType,
    });
  },
});
