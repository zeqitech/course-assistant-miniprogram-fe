const app = getApp().globalData;
const func = getApp();

Page({
  /**
   * 页面初始数据
   */
  data: {
    token: '',
    chatId: '',
    isTeacher: app.isTeacher,
    workList: [],
    currentTime: '',
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
      courseId: options.courseId,
      cover: options.cover,
    });
  },

  /**
   * 页面显示生命周期函数
   */
  async onShow() {
    let workList = await this.handleGetWorkList();
    this.setData({
      currentTime: func.getCurrentTime(new Date()),
      workList: workList,
    });
  },

  /**
   * 获取任务列表
   */
  async handleGetWorkList() {
    tt.showLoading({
      title: '获取作业列表',
    });
    let getWorkListRes = await new Promise((resolve) => {
      tt.request({
        url: app.urlConfig.getWorkUrl,
        data: {
          courseId: this.data.courseId,
        },
        header: {
          'content-type': 'application/json',
        },
        complete(res) {
          resolve(res.data);
        },
      });
    });
    tt.hideLoading();
    if (getWorkListRes.success) {
      return getWorkListRes.data.workList;
    } else {
      tt.showModal({
        title: '失败',
        content: getWorkListRes.message,
      });
      return [];
    }
    console.log('获取作业列表成功', getWorkListRes);
  },

  /**
   * 跳转到作业文档列表
   * @param {Object} e
   */
  navToDoc(e) {
    let data = e.currentTarget.dataset;
    tt.navigateTo({
      url: `/pages/doc/doc?token=${data.token}&expireStatus=${data.expireStatus}&endDate=${data.expireTime}&startDate=${data.updateTime}&groupToken=${data.groupToken}&name=${data.workName}`,
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
      url: `/pages/newTask/newTask?token=${this.data.token}&chatId=${this.data.chatId}&option=new`,
    });
  },
});
