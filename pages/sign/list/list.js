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
    // 所有签到列表
    signList: [],
    // 课程 ID
    courseId: '',
    // 用户类型
    userType: globalData.userType,
  },

  /**
   * 生命周期函数 - 监听页面加载
   * @param {Object} options
   */
  onLoad(options) {
    // 保存课程 ID
    this.setData({
      courseId: options.courseId,
    });
  },

  /**
   * 生命周期函数 - 监听页面展示
   */
  async onShow() {
    // 设置标题
    tt.setNavigationBarTitle({
      title: _('签到列表'),
    });
    // ttml 双语支持
    this.setData({
      _t: translate._t(),
    });
    // 首先获取签到列表
    let signList = await this.handleGetSignList();
    // 保存数据
    this.setData({
      signList: signList,
    });
  },

  /**
   * 获取签到记录列表
   * @returns 返回签到记录列表
   */
  async handleGetSignList() {
    // 发送获取签到列表请求
    let getSignListRes = await globalFunctions.sendRequests(
      'getSignList',
      this.data
    );
    // 获取成功
    if (getSignListRes.success) {
      // 返回签到列表
      return getSignListRes.data.signList;
    } else {
      // 获取失败，报错
      globalFunctions.showError(getSignListRes.message);
      // 返回空数组
      return [];
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
