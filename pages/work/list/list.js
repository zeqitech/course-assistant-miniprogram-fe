const app = getApp().globalData;
const func = getApp();

Page({
  /**
   * 页面初始数据
   */
  data: {
    // 用户类型
    userType: app.userType,
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
    let workList = await this.handleGetWorkList();
    console.log('获取作业列表成功', workList);
    this.setData({
      currentTime: func.getCurrentTime(new Date()),
      workList: workList,
    });
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
        url: app.urlConfig.getWorkUrl,
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
   * 跳转到作业文档列表
   * @param {Object} e
   */
  navToWorkFileList(e) {
    let data = e.currentTarget.dataset;
    tt.navigateTo({
      url: `/pages/work/file/list/list?workId=${data.workId}&startDate=${data.startTime}&endDate=${data.expireTime}&weight=${data.weight}&name=${data.workName}`,
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
  navToWorkNew() {
    tt.navigateTo({
      url: `/pages/work/new/new?courseId=${this.data.courseId}&option=new`,
    });
  },
});
