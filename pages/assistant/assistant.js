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
    // 用户类型
    userType: globalData.usetType,
  },

  /**
   * 生命周期函数 - 监听页面加载
   * @param {Object} options
   */
  onLoad(options) {
    console.log(options);
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
   * 发起添加助教请求
   */
  async handleSendAddAssistantRequest() {
    return await globalFunctions.sendRequests('addAssistant', this.data);
  },

  /**
   * 添加助教逻辑
   */
  async handleAddAssistant() {
    // 选择助教
    await this.handleSelectAssistant();
    // 发送添加助教请求
    let addAssistantRes = await this.handleSendAddAssistantRequest();
    // 添加成功
    if (addAssistantRes.success) {
      globalFunctions.showSuccess('添加成功', 0);
    } else {
      // 添加失败
      globalFunctions.showError(addAssistantRes.message);
    }
  },

  /**
   * 选择助教
   */
  async handleSelectAssistant() {
    let res = await new Promise((resolve) => {
      tt.chooseContact({
        multi: false,
        complete(res) {
          resolve(res);
        },
      });
    });
    this.setData({
      openId: res.data.openId,
      assistantName: res.data.name,
    });
    return {
      openId: res.data.openId,
      assistantName: res.data.name,
    };
  },
});
