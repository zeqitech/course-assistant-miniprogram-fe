const app = getApp().globalData;

Page({
  /**
   * 页面初始数模
   */
  data: {
    token: '',
    docArray: [],
  },

  /**
   * 页面加载生命周期函数
   * @param {Object} options
   */
  onLoad(options) {
    console.log('--------------------doc page-------------------');
    console.log(options);
    console.log('-----------------------------------------------');
    this.setData({
      token: options.token,
    });
  },

  /**
   * 页面显示声明周期函数
   */
  onShow() {
    this.getDoc();
  },

  /**
   * 获取某次任务下所有作业文档列表
   */
  getDoc() {
    tt.request({
      url: app.urlConfig.getDocUrl,
      data: {
        workToken: this.data.token,
      },
      header: {
        'content-type': 'application/json',
      },
      success: (res) => {
        console.log(res);
        this.setData({
          docArray: res.data.data.list,
        });
      },
      fail(res) {
        console.log(`request 调用失败`);
      },
    });
  },

  /**
   * 跳转到打分页面
   * @param {Object} e
   */
  navToGrade(e) {
    let data = e.currentTarget.dataset;
    tt.navigateTo({
      url: `/pages/grade/grade?token=${data.token}&title=${data.title}`,
    });
  },
});
