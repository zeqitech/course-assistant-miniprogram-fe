// 全局函数
import globalFunctions from '../../../../public/function/index';
// 全局变量
const globalData = getApp().globalData;

// 双语支持
import translate from '../../../../public/translate/index';
const _ = translate._;

// 根据 to 参数值，确定真实 to 参数
const switchTo = {
  // 打分相关页面
  grade() {
    return switchGrade[globalData.userType]();
  },
  // 打开作业情况统计
  workFileInfo() {
    return 'workFileInfo';
  },
};
// 根据用户类型，决定是否打开打分页面
const switchGrade = {
  // 教务
  manager() {
    // 打开打分页面
    return 'workFileGrade';
  },
  // 老师
  teacher() {
    // 打开打分页面
    return 'workFileGrade';
  },
  // 学生
  student() {
    // 直接打开文档
    return 'openWorkFileStudent';
  },
  // 助教
  assistant() {
    // 打开打分页面
    return 'workFileGrade';
  },
};

Page({
  /**
   * 页面初始数模
   */
  data: {
    // 作业 ID
    workId: '',
    // 文档列表
    workFileList: [],
    // 操作列表
    itemList: [_('修改作业信息'), _('删除作业'), _('取消')],
    // 显示弹出层
    showPopup: false,
    // 用户类型
    userType: globalData.userType,
    // 课程 ID
    courseId: '',
    // 用户 openId
    openId: globalData.openId,
    assistantAuth: '',
  },

  /**
   * 生命周期函数 - 监听页面加载
   * @param {Object} options
   */
  onLoad(options) {
    console.log('--------------------workFileList page-------------------');
    console.log(options);
    console.log('-----------------------------------------------');
    // 如果用户不是学生
    if (globalData.userType !== 'student') {
      this.setData({
        workId: options.workId,
      });
    } else {
      this.setData({
        courseId: options.courseId,
      });
    }
  },

  /**
   * 生命周期函数 - 监听页面显示
   */
  async onShow() {
    // 设置标题
    tt.setNavigationBarTitle({
      title: _('作业文档列表'),
    });
    // ttml 双语支持
    this.setData({
      _t: translate._t(),
    });
    // 如果用户不是学生
    if (globalData.userType !== 'student') {
      // 获取文件列表
      let workFileList = await this.handleGetWorkFileList();
      // 保存数据
      this.setData({
        workFileList: workFileList,
      });
    } else {
      // 用户为学生
      let workFileList = await this.handleGetMyWorkFileList();
      // 保存数据
      this.setData({
        workFileList: workFileList,
      });
    }
  },

  /**
   * 获取某次作业之下所有作业文件列表
   */
  async handleGetWorkFileList() {
    // 获取返回值
    let workFileListRes = await globalFunctions.sendRequests(
      'getWorkFileList',
      this.data
    );
    // 若获取成功
    if (workFileListRes.success) {
      // 返回文档列表
      return workFileListRes.data.workFileList;
    } else {
      // 获取失败，返回空数组
      return [];
    }
  },

  /**
   * 获取学生课程下所有作业
   */
  async handleGetMyWorkFileList() {
    let myWorkFileListRes = await globalFunctions.sendRequests(
      'getMyWorkFileList',
      this.data
    );
    // 获取成功
    if (myWorkFileListRes.success) {
      return myWorkFileListRes.data.workList;
    } else {
      // 获取失败
      return [];
    }
  },

  /**
   * 页面路由
   * @param {Object} e
   */
  pageNavigator(e) {
    // 获取真实 to 参数
    let realTo = switchTo[e.currentTarget.dataset.to]();
    // 更新 to 参数
    e.currentTarget.dataset.to = realTo;
    // 页面路由
    globalFunctions.pageNavigator(e, this.data);
  },
});
