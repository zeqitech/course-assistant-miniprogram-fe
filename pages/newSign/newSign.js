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
  onLoad(options) {
    this.setData({
      token: options.token,
    });
  },

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
      // 计算签到起止时间
      let startTime = func.getCurrentTime(new Date().getTime());
      let endTime = func.getCurrentTime(
        new Date().getTime() + parseInt(this.data.duration) * 60000
      );
      // 获取当前老师位置
      tt.getLocation({
        type: 'gcj02',
        success: (res) => {
          var latitude = res.latitude.toString();
          var longitude = res.longitude.toString();
          console.log(endTime, this.data.token);
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
              console.log(res);
              if (res.data.success) {
                tt.showModal({
                  title: '成功',
                  content: '发布签到成功！',
                  success(res) {
                    tt.navigateBack({
                      delta: 1,
                    });
                  },
                });
              } else {
                tt.showModal({
                  title: '失败',
                  content: res.data.message,
                });
              }
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
