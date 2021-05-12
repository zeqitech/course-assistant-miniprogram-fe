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
    });
  },

  /**
   * 生命周期函数 - 监听页面显示
   */
  async onShow() {
    // 设置标题
    tt.setNavigationBarTitle({
      title: _('课程课件'),
    });
    // ttml 双语支持
    this.setData({
      _t: translate._t(),
    });
    // 获取浏览记录
    await this.handleGetViewInfo();
  },

  /**
   * 展示首次及最后一次查看时间
   * @param {Object} e
   */
  handleShowTime(e) {
    tt.showModal({
      title: _('详情'),
      content: `${_('首次查看时间')}`,
      confirmText: _('确认'),
      cancelText: _('取消'),
    });
  },

  /**
   * 获取课件浏览记录
   */
  async handleGetViewInfo() {
    // 获取课件浏览记录
    let coursewareViewInfoRes = await globalFunctions.sendRequests(
      'getCoursewareViewInfo',
      this.data
    );
    console.log(coursewareViewInfoRes);
    // 获取成功
    if (coursewareViewInfoRes.success) {
      this.setData({
        viewRecord: coursewareViewInfoRes.data.viewRecord,
      });
    }
  },

  /**
   * 页面路由
   * @param {Object} e
   */
  pageNavigator(e) {
    globalFunctions.pageNavigator(e, this.data);
  },
});
