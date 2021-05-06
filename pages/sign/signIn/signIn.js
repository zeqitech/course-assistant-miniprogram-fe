Page({
  /**
   * 页面初始数据
   */
  data: {
    token: '',
  },

  /**
   * 生命周期函数 - 监听页面加载
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
    tt.showToast({
      title: '定位中',
      icon: 'loading',
    });
    tt.getLocation({
      type: 'gcj02',
      success: (res) => {
        console.log(res);
        var latitude = res.latitude;
        var longitude = res.longitude;
        tt.request({
          url: 'https://baidu.com',
          data: {
            user_name: 'hello',
          },
          header: {
            'content-type': 'application/json',
          },
          success: (res) => {
            console.log(`请求发送成功`);
            tt.hideLoading({
              success(res) {
                console.log(`res`);
                tt.showModal({
                  title: '签到成功',
                  content: '请继续保持良好表现！',
                  icon: 'success',
                });
              },
            });
          },
          fail(res) {
            console.log(`request 调用失败`);
          },
        });
      },
      fail(res) {
        console.log('定位失败');
      },
    });
  },
});
