const app = getApp().globalData;

Page({
  /**
   * 页面初始数据
   */
  data: {
    // 开课学期
    term: '',
  },

  /**
   * 生命周期函数 - 监听页面装载
   * @param {Object} options
   */
  onLoad(options) {},

  /**
   * 处理输入学期事件
   * @param {Object} e
   */
  handleInputTerm(e) {
    console.log(e);
  },
});
