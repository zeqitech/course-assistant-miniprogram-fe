Page({
  /**
   * 页面数据
   */
  data: {
    forArray: ['1', '2', '3'],
  },

  /**
   * 当前页面首次加载时执行的生命周期函数
   * @param {Object} options
   */
  onLoad(options) {},

  navToTask(e) {
    tt.navigateTo({
      url: '/pages/task/task?token=' + e.currentTarget.dataset.token,
    });
  },
});
