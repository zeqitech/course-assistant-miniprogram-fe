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
    // 筛选当前课程或已结课课程
    filter: '',
    // 课程列表
    courseList: globalData.courseList,
    // 当前课程是否为空
    nowEmpty: true,
    // 往期课程是否为空
    pastEmpty: true,
  },

  /**
   * 页面加载生命周期函数
   * @param {Object} options
   */
  onLoad(options) {
    console.log('-----------------all class-----------------');
    console.log(options);
    console.log('-------------------------------------------');
    // 保存数据
    this.setData({
      filter: options.filter,
      nowEmpty: options.nowEmpty === 'true' ? true : false,
      pastEmpty: options.pastEmpty === 'true' ? true : false,
    });
  },

  /**
   * 生命周期函数 - 监听页面显示
   */
  onShow() {
    // 如果页面展示当前课程
    if (this.data.filter === 'now') {
      tt.setNavigationBarTitle({
        title: _('当前课程列表'),
      });
    } else if (this.data.filter === 'past') {
      // 如果展示往期课程
      tt.setNavigationBarTitle({
        title: _('往期课程列表'),
      });
    }
    // ttml 双语支持
    this.setData({
      _t: translate._t(),
    });
  },

  /**
   * 页面路由
   * @param {Object} e
   */
  pageNavigator(e) {
    globalFunctions.pageNavigator(e, this.data);
  },
});
