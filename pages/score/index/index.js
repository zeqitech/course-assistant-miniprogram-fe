// 获取全局函数
import globalFunctions from '../../../public/function/index';
// 获取全局变量
const globalData = getApp().globalData;

// 双语支持
import translate from '../../../public/translate/index';
const _ = translate._;

Page({
  /**
   * 页面默认数据
   */
  data: {
    // 用户 openId
    openId: globalData.openId,
    // 用户类型
    userType: globalData.userType,
    // 重新生成成绩
    force: false,
    // 成绩列表
    scoreList: [],
  },

  /**
   * 生命周期函数 - 监听页面加载
   * @param {Object} options
   */
  onLoad(options) {
    // 保存数据
    this.setData({
      courseId: options.courseId,
    });
  },

  /**
   * 生命周期函数 - 监听页面显示
   */
  async onShow() {
    // 设置标题
    tt.setNavigationBarTitle({
      title: _('成绩统计'),
    });
    // ttml 双语支持
    this.setData({
      _t: translate._t(),
    });
    await this.handleGetScore();
  },

  /**
   * 获取课程成绩
   */
  async handleGetScore() {
    let res = await globalFunctions.sendRequests('getScoreList', this.data);
    console.log(res);
    // 获取成功
    if (res.success) {
      this.setData({
        scoreList: res.data.gradeList,
      });
    } else {
      globalFunctions.showError(res.message);
    }
  },

  /**
   * 重新获取成绩
   */
  async regetScore() {
    this.setData({
      force: true,
    });
    let res = await globalFunctions.sendRequests('getScoreList', this.data);
    // 获取成功
    if (res.success) {
      this.setData({
        scoreList: res.data.gradeList,
      });
    } else {
      globalFunctions.showError(res.message);
    }
    // 恢复默认
    this.setData({
      force: false,
    });
  },

  /**
   * 上传成绩
   */
  uploadScore() {
    // 接口尚未获得，提示用户
    tt.showModal({
      title: _('提示'),
      content: _('此功能可与上游教务系统对接'),
      confirmText: _('确认'),
      cancelText: _('取消'),
    });
  },
});
