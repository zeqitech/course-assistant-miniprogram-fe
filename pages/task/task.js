const app = getApp().globalData;

Page({
  /**
   * 页面初始数据
   */
  data: {
    token: '',
    chatId: '',
    isTeacher: app.isTeacher,
    taskArray: [],
  },

  /**
   * 页面加载时执行的生命周期函数
   * @param {Object} options
   */
  onLoad(options) {
    console.log('-----------task page--------------');
    console.log(options);
    console.log('----------------------------------');
    this.setData({
      token: options.token,
      chatId: options.chatId,
      cover: options.cover,
    });
  },

  /**
   * 页面显示生命周期函数
   */
  onShow() {
    this.getTask();
  },

  /**
   * 获取任务列表
   */
  getTask() {
    tt.request({
      url: app.urlConfig.getTaskUrl,
      data: {
        groupToken: this.data.token,
      },
      header: {
        'content-type': 'application/json',
      },
      success: (res) => {
        console.log(res);
        this.setData({
          taskArray: res.data.data.list,
        });
      },
      fail(res) {
        console.log(`request 调用失败`);
      },
    });
  },

  /**
   * 跳转到作业文档列表
   * @param {Object} e
   */
  navToDoc(e) {
    tt.navigateTo({
      url: '/pages/doc/doc?token=' + e.currentTarget.dataset.token,
    });
  },

  /**
   *
   */
  handleTapSign() {
    if (this.data.isTeacher) {
      tt.navigateTo({
        url: `/pages/viewSign/viewSign?token=${this.data.token}`,
      });
    } else {
      tt.navigateTo({
        url: '/pages/sign/sign?token=' + this.data.token,
      });
    }
  },

  /**
   * 跳转到发布作业页面
   */
  navToNewTask() {
    tt.navigateTo({
      url: `/pages/newTask/newTask?token=${this.data.token}&chatId=${this.data.chatId}`,
    });
  },
});
