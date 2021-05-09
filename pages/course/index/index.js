// 全局函数
import globalFunctions from '../../../public/function/index';
// 全局变量
const globalData = getApp().globalData;

// 根据不同路由目的地，执行不同判断操作
const switchTo = {
  // 跳转到签到相关页面
  sign() {
    return switchSign[globalData.userType]();
  },
  // 跳转到作业相关页面
  work() {
    return switchWork[globalData.userType]();
  },
  // 跳转到课件页面
  courseware() {
    return 'courseware';
  },
  // 跳转到助教管理页面
  assistant() {
    return 'assistant';
  },
};
// 根据不同用户类型，跳转到不同签到页面
const switchSign = {
  // 教务
  1() {
    // 查看签到列表
    return 'signList';
  },
  // 老师
  2() {
    // 查看签到列表
    return 'signList';
  },
  // 学生
  3() {
    // 进行签到
    return 'signIn';
  },
};
// 根据不同用户类型，跳转到不同作业页面
const switchWork = {
  // 教务
  1() {
    // 跳转到作业列表
    return 'workList';
  },
  // 老师
  2() {
    // 跳转到作业列表
    return 'workList';
  },
  // 学生
  3() {
    // 跳转到作业文档列表
    return 'workFileListStudent';
  },
  // 助教
  4() {
    // 跳转到作业列表
    return 'workList';
  },
};

Page({
  /**
   * 页面初始数据
   */
  data: {
    // 课程封面
    cover: '',
    // 课程 ID
    courseId: '',
    // 用户类型
    userType: globalData.userType,
  },

  /**
   * 页面加载生命周期函数
   * @param {Object} options
   */
  onLoad(options) {
    console.log('------------------class page----------------');
    console.log(options);
    console.log('--------------------------------------------');
    // 保存数据
    this.setData({
      courseId: options.courseId,
      cover: options.cover,
      coursewareToken: options.coursewareToken,
    });
  },

  /**
   * 页面路由
   * @param {Object} e
   */
  pageNavigator(e) {
    // 拦截 to 参数
    let realTo = switchTo[e.currentTarget.dataset.to]();
    // 更新 to 参数为真正路由目的地
    e.currentTarget.dataset.to = realTo;
    // 进行路由跳转
    globalFunctions.pageNavigator(e, this.data);
  },
});
