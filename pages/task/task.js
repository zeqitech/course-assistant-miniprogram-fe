Page({
  /**
   * 页面初始数据
   */
  data: {
    token: '',
  },

  /**
   * 页面加载时执行的生命周期函数
   * @param {Object} options
   */
  onLoad(options) {
    console.log('-----------task page--------------');
    console.log(options);
    this.setData({
      token: options.token,
    });
    console.log('----------------------------------');
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
});
