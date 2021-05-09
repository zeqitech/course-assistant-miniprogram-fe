// 全局函数
import globalFunctions from '../../public/function/index';
// 全局变量
const globalData = getApp().globalData;

Page({
  /**
   * 页面初始数据
   */
  data: {
    // 助教姓名
    assistantName: '',
    // 课程 ID
    courseId: '',
    // 助教的 openId
    openId: '',
    // 老师的 openId
    teacherId: globalData.openId,
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
   * 获取助教列表
   */
  handleGetAssistantList() {},

  /**
   * 添加助教
   */
  handleAddAssistant() {},
});
