const app = getApp().globalData;
const func = getApp();

Page({
  /**
   * 页面初始数据
   */
  data: {
    duration: '',
  },

  /**
   * 页面初始化生命周期函数
   * @param {Object} options
   */
  onLoad(options) {},

  /**
   * 输入签到时长事件
   * @param {Object} e
   */
  handleInputDuration(e) {
    this.setData({
      duration: e.detail,
    });
  },

  /**
   * 点击发起签到按钮事件
   */
  handleNewSign() {
    if (this.data.duration !== '') {
      let startTime = func.getCurrentTime();
      let endTime = new Date().getTime() + parseInt(this.data.duration) * 60;
      tt.getLocation({
        type: 'gcj02',
        success: function (res) {
          var latitude = res.latitude;
          var longitude = res.longitude;
          tt.request({
            url: app.urlConfig.newSignUrl,
            method: 'POST',
            data: {
              endTime: endTime,
              groupToken: this.data.token,
              latitude: latitude,
              longitude: longitude,
              startTime: startTime,
              teacherId: app.openId,
            },
            header: {
              'content-type': 'application/json',
            },
            success: (res) => {
              tt.showModal({
                title: '成功',
                content: '发布签到成功！',
                success(res) {
                  tt.navigateBack({
                    delta: 1,
                  });
                },
              });
            },
            fail(res) {
              console.log(`request 调用失败`);
            },
          });
        },
      });
    } else {
      tt.showModal({
        title: '失败',
        content: '请完善签到持续时间！',
      });
    }
  },
});
