// 全局函数
import globalFunctions from '../../public/function/index';
// 全局变量
const globalData = getApp().globalData;

// 双语支持
import translate from '../../public/translate/index';
const _ = translate._;

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
    userType: globalData.userType,
    // 助教列表
    assistantList: [],
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
   * 生命周期函数 - 监听页面显示
   */
  async onShow() {
    // 设置标题
    tt.setNavigationBarTitle({
      title: _('助教管理'),
    });
    // ttml 双语支持
    this.setData({
      _t: translate._t(),
    });
    // 获取助教列表
    await this.handleGetAssistantList();
  },

  /**
   * 获取助教列表
   */
  async handleGetAssistantList() {
    let getAssistantRes = await globalFunctions.sendRequests(
      'getAssistantList',
      this.data
    );
    console.log(getAssistantRes);
    // 获取成功
    if (getAssistantRes.success) {
      this.setData({
        assistantList: getAssistantRes.data.assistantList,
      });
    }
  },

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
      globalFunctions.showSuccess(_('添加成功'), 0);
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
    console.log(res);
    this.setData({
      openId: res.data[0].openId,
      assistantName: res.data[0].name,
    });
    return {
      openId: res.data[0].openId,
      assistantName: res.data[0].name,
    };
  },
});
