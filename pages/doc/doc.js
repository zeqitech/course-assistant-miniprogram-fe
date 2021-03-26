Page({
  /**
   * 页面初始数模
   */
  data: {
    token: '',
  },

  /**
   * 页面加载生命周期函数
   * @param {Object} options
   */
  onLoad(options) {
    console.log('--------------------doc page-------------------');
    console.log(options);
    console.log('-----------------------------------------------');
    this.setData({
      token: options.token,
    });
  },

  /**
   * 跳转到打分页面
   * @param {Object} e
   */
  navToGrade(e) {
    let data = e.currentTarget.dataset;
    tt.navigateTo({
      url: `/pages/grade/grade?token=${data.token}&title=${data.title}`,
    });
  },
});
