Page({
  /**
   * 页面初始数据
   */
  data: {
    token: '',
  },

  /**
   * 监听页面加载事件
   * @param {Object} options
   */
  onLoad(options) {
    console.log('-------------------sign page------------------');
    console.log(options);
    console.log('----------------------------------------------');
    this.setData({
      token: options.token,
    });
  },

  /**
   * 处理签到事件
   */
  handleSignIn() {
    tt.getLocation({
      type: 'gcj02',
      success: (res) => {
        console.log(res);
        var latitude = res.latitude;
        var longitude = res.longitude;
      },
      fail: () => {
        console.log('fail');
      },
    });
  },
});
