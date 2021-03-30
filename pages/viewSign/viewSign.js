const app = getApp().globalData;

Page({
  /**
   * 页面初始数据
   */
  data: {
    token: '',
    signArray: [],
  },

  /**
   * 监听页面初始化生命周期
   * @param {Object} options
   */
  onLoad(options) {
    console.log('-----------------view sign-------------------');
    console.log(options);
    console.log('---------------------------------------------');
    this.setData({
      token: options.token,
    });
  },

  /**
   * 监听页面显示
   */
  onShow() {
    this.getSign();
  },

  /**
   * 获取签到信息
   */
  getSign() {
    tt.request({
      url: app.urlConfig.getSignUrl,
      data: {
        groupToken: this.data.token,
      },
      header: {
        'content-type': 'application/json',
      },
      success: (res) => {
        console.log(res);
        this.setData({
          signArray: res.data.data.list,
        });
      },
      fail(res) {
        console.log(`获取签到列表信息失败`);
      },
    });
  },

  /**
   * 跳转到发布签到页面
   */
  navToNewSign() {
    tt.navigateTo({
      url: '/pages/newSign/newSign?token=' + this.data.token,
    });
  },

  /**
   * 跳转到签到详情页面
   * @param {Object} e
   */
  navToViewSignInfo(e) {
    let data = e.currentTarget.dataset;
    tt.navigateTo({
      url: `/pages/viewSignInfo/viewSignInfo?token=${this.data.token}&teacherId=${data.teacherId}&signId=${data.signId}`,
    });
  },
});
