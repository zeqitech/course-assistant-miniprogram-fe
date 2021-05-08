// 全局变量
const globalData = getApp().globalData;
// 全局函数
const globalFunction = getApp().globalFunction;
// 时间函数
const timeFunction = getApp();

// 根据用户类型，决定跳转到文件列表
const switchWorkFileList = {
  // 教务
  1() {},
  // 老师
  2() {},
  // 助教
  4() {},
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

  pageNavigator(e) {},

  /**
   * 跳转到作业文档列表
   * @param {Object} e
   */
  navToWorkFileList(e) {
    let data = e.currentTarget.dataset;
    // 如果是老师
    if (globalData.userType < 3) {
      tt.navigateTo({
        url: `/pages/work/file/list/list?workId=${data.workId}&startDate=${data.startTime}&endDate=${data.expireTime}&weight=${data.weight}&name=${data.workName}&courseId=${this.data.courseId}`,
      });
    } else if (globalData.userType === 4) {
      // 如果是助教
      if (data.assistantAuth) {
        // 如果助教可评阅
        tt.navigateTo({
          url: `/pages/work/file/list/list?workId=${data.workId}&startDate=${data.startTime}&endDate=${data.expireTime}&weight=${data.weight}&name=${data.workName}&courseId=${this.data.courseId}`,
        });
      } else {
        // 提示没有评阅权限
        tt.showModal({
          title: '提示',
          content: '暂无本次作业评阅权限',
        });
      }
    }
  },
});
