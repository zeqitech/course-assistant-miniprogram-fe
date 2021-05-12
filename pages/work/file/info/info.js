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
  data: {
    // 作业 ID
    workId: '',
    // 查阅记录
    viewRecord: [],
  },

  /**
   * 生命周期函数 - 监听页面加载
   * @param {Object} options
   */
  onLoad(options) {
    this.setData({
      workId: options.workId,
    });
  },

  /**
   * 生命周期函数 - 监听页面显示
   */
  async onShow() {
    // 设置标题
    tt.setNavigationBarTitle({
      title: _('作业统计'),
    });
    // ttml 双语支持
    this.setData({
      _t: translate._t(),
    });
    // 获取作业查阅记录
    await this.handleGetWorkRecord();
  },

  /**
   * 获取作业查阅情况列表
   */
  async handleGetWorkRecord() {
    let res = await globalFunctions.sendRequests('getWorkRecord', this.data);
    console.log(res);
    // 获取成功
    if (res.success) {
      this.setData({
        viewRecord: res.data.viewRecord,
      });
    } else {
      globalFunctions.showError(res.message);
    }
  },
});
