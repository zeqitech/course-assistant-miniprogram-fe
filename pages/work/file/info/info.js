// 全局函数
import globalFunctions from '../../../../public/function/index';
// 全局变量
const globalData = getApp().globalData;

// 双语支持
import translate from '../../../../public/translate/index';
const _ = translate._;

Page({
  /**
   * 页面初始数据
   */
  data: {},

  /**
   * 生命周期函数 - 监听页面显示
   */
  onShow() {
    // 设置标题
    tt.setNavigationBarTitle({
      title: _('作业统计'),
    });
    // ttml 双语支持
    this.setData({
      _t: translate._t(),
    });
  },
});
