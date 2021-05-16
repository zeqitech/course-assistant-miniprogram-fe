// 全局函数
import globalFunctions from '../../../public/function/index';
// 全局变量
const globalData = getApp().globalData;

// 双语支持
import translate from '../../../public/translate/index';
const _ = translate._;

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
    return courseware[globalData.userType]();
  },
  // 跳转到助教管理页面
  assistant() {
    return 'assistant';
  },
  // 跳转到班级成绩统计页面
  score() {
    return 'scoreStatistics';
  },
  // 提示课堂测试开发中
  test() {
    return 'test';
  },
};
// 根据不同用户类型，跳转到不同签到页面
const switchSign = {
  // 教务
  manager() {
    // 查看签到列表
    return 'signList';
  },
  // 老师
  teacher() {
    // 查看签到列表
    return 'signList';
  },
  // 学生
  student() {
    // 进行签到
    return 'signIn';
  },
};
// 根据不同用户类型，跳转到不同作业页面
const switchWork = {
  // 教务
  manager() {
    // 跳转到作业列表
    return 'workList';
  },
  // 老师
  teacher() {
    // 跳转到作业列表
    return 'workList';
  },
  // 学生
  student() {
    // 跳转到作业文档列表
    return 'workFileListStudent';
  },
  // 助教
  assistant() {
    // 跳转到作业列表
    return 'workList';
  },
};
// 根据不同的用户类型，跳转到课件页面
const courseware = {
  // 老师
  teacher() {
    return 'courseware';
  },
  // 教管
  manager() {
    return 'coursewareFile';
  },
  // 学生
  student() {
    return 'coursewareFile';
  },
  // 助教
  assistant() {
    return 'coursewareFile';
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
    // 用户 openId
    openId: globalData.openId,
    // 用户类型
    userType: globalData.userType,
    // 课程名
    courseName: '',
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
      courseName: options.courseName,
    });
  },

  /**
   * 生命周期函数 - 监听页面显示
   */
  async onShow() {
    // 设置标题
    tt.setNavigationBarTitle({
      title: this.data.courseName,
    });
    // ttml 双语支持
    this.setData({
      _t: translate._t(),
    });
    // 区分学生和助教
    if (this.data.userType === 'student') {
      await this.handleGetUserType();
    }
  },

  /**
   * 获取用户类型，区分学生和助教
   */
  async handleGetUserType() {
    let res = await globalFunctions.sendRequests('getUserType', this.data);
    console.log(res);
    // 获取成功
    if (res.success) {
      this.setData({
        userType: res.data.userType,
      });
      globalData.userType = res.data.userType;
    } else {
      globalFunctions.showError(res.message);
    }
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
