// 全局函数
import globalFunctions from '../../../public/function/index';
// 全局变量
const globalData = getApp().globalData;

// 双语支持
import translate from '../../../public/translate/index';
const _ = translate._;

Page({
  /**
   * 页面初始数据
   */
  data: {
    // ttml 双语支持
    _t: translate._t(),
    // 课件文档 token
    coursewareToken: '',
    // 用户 openId
    openId: globalData.openId,
    // 用户类型
    userType: globalData.userType,
  },

  /**
   * 生命周期函数 - 监听页面加载
   */
  onLoad(options) {
    // 保存数据
    this.setData({
      coursewareToken: options.coursewareToken,
      openId: options.openId,
    });
  },

  /**
   * 生命周期函数 - 监听页面显示
   */
  onShow() {
    // 设置标题
    tt.setNavigationBarTitle({
      title: _('课程课件'),
    });
  },

  handleGetViewInfo() {
    globalFunctions.sendRequests();
  },

  /**
   * 页面路由
   * @param {Object} e
   */
  pageNavigator(e) {
    globalFunctions.pageNavigator(e, this.data);
  },
});
