// 全局函数
import globalFunctions from '../../../public/function/index';
// 全局变量
const globalData = getApp().globalData;
// 时间函数
const timeFunction = getApp();

// 根据路由目的地，返回 to 参数值
const switchTo = {
  // 发布作业
  new() {
    return 'workNew';
  },
  // 文件列表
  workFileList() {
    return switchWorkFileList[globalData.userType]();
  },
};
// 根据用户类型，决定跳转到文件列表
const switchWorkFileList = {
  // 教务
  1() {
    return 'workFileListTeacher';
  },
  // 老师
  2() {
    return 'workFileListTeacher';
  },
  // 助教
  4() {
    return 'workFileListAssistant';
  },
};

Page({
  /**
   * 页面初始数据
   */
  data: {
    // 用户类型
    userType: globalData.userType,
    // 作业列表
    workList: [],
    // 当前时间
    currentTime: '',
    // 课程 ID
    courseId: '',
  },

  /**
   * 页面加载时执行的生命周期函数
   * @param {Object} options
   */
  onLoad(options) {
    console.log('-----------work page--------------');
    console.log(options);
    console.log('----------------------------------');
    this.setData({
      courseId: options.courseId,
    });
  },

  /**
   * 页面显示生命周期函数
   */
  async onShow() {
    // 若为老师，则获取作业列表
    if (globalData.userType !== 3) {
      let workList = await this.handleGetWorkList();
      this.setData({
        currentTime: timeFunction.getCurrentTime(new Date()),
        workList: workList,
      });
    }
  },

  /**
   * 获取作业列表
   * @returns 作业列表数组
   */
  async handleGetWorkList() {
    // 展示 `Loading`
    tt.showLoading({
      title: '获取作业列表',
    });
    // 获取作业列表返回值
    let getWorkListRes = await new Promise((resolve) => {
      // 调用飞书 HTTP 能力
      tt.request({
        url: globalData.urlConfig.getWorkUrl,
        data: {
          courseId: this.data.courseId,
        },
        header: {
          'content-type': 'application/json',
        },
        // 请求成功，回传数据
        complete(res) {
          resolve(res.data);
        },
      });
    });
    // 隐藏 `Loading`
    tt.hideLoading();
    // 若成功获取作业列表
    if (getWorkListRes.success) {
      // 返回作业列表
      return getWorkListRes.data.workList;
    } else {
      // 获取作业列表失败
      tt.showModal({
        title: '失败',
        content: getWorkListRes.message,
      });
      // 返回空数组
      return [];
    }
  },

  /**
   * 页面路由
   * @param {Object} e
   */
  pageNavigator(e) {
    // 转换真实 to 参数
    let realTo = switchTo[e.currentTarget.dataset.to]();
    // 替换 to 参数
    e.currentTarget.dataset.to = realTo;
    // 进行路由
    globalFunctions.pageNavigator(e, this.data);
  },
});
