const app = getApp().globalData;

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
    userType: app.userType,
  },

  /**
   * 页面加载生命周期函数
   * @param {Object} options
   */
  onLoad(options) {
    console.log('------------------class page----------------');
    console.log(options);
    console.log('--------------------------------------------');
    this.setData({
      courseId: options.courseId,
      cover: options.cover,
      coursewareToken: options.coursewareToken,
    });
  },

  /**
   * 跳转到签到页面
   */
  navToSign() {
    // 如果是老师
    if (app.userType < 3) {
      // 查看签到列表
      tt.navigateTo({
        url: `/pages/sign/list/list?courseId=${this.data.courseId}`,
      });
    } else if (app.userType === 4) {
      // 如果是助教
      tt.showModal({
        title: '提示',
        content: '助教无需签到',
      });
    } else {
      // 当前用户是学生
      // 直接跳转到签到页面
      tt.navigateTo({
        url: `/pages/sign/signIn/signIn?courseId=${this.data.courseId}`,
      });
    }
  },

  /**
   * 跳转到作业列表页面
   */
  navToWorkList() {
    // 如果用户不是学生
    if (app.userType !== 3) {
      tt.navigateTo({
        url: `/pages/work/list/list?courseId=${this.data.courseId}`,
      });
    } else {
      // 用户是学生
      tt.navigateTo({
        url: `/pages/work/file/list/list?courseId=${this.data.courseId}`,
      });
    }
  },

  /**
   * 打开课件
   */
  navToCourseware() {
    tt.openSchema({
      schema: 'https://uestc.feishu.cn/docs/' + this.data.coursewareToken,
      external: false,
    });
  },
});
