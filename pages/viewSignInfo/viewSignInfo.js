const app = getApp().globalData;
const func = getApp();

Page({
  /**
   * 页面初始数据
   */
  data: {
    startTime: '',
    endTime: '',
    signId: '',
    teacherId: '',
    token: '',
    currentTime: '',
  },

  /**
   * 页面加载生命周期函数
   * @param {Object} options
   */
  onLoad(options) {
    this.setData({
      startTime: options.startTime,
      endTime: options.endTime,
      signId: options.signId,
      teacherId: options.teacherId,
      token: options.token,
    });
  },

  onShow() {
    this.setData({
      currentTime: func.getCurrentTime(new Date()),
    });
  },

  /**
   * 提前结束某次签到
   * @param {Object} e
   */
  endSign() {
    if (this.data.endTime < func.getCurrentTime(new Date())) {
      tt.showModal({
        title: '提示',
        content: '当前签到已结束，无需手动结束',
      });
    } else {
      tt.showModal({
        title: '确认',
        content: `是否确定结束 ${this.data.startTime} 发布的签到？`,
        success: (res) => {
          if (res.confirm) {
            tt.request({
              url: app.urlConfig.endSignUrl + '?signId=' + this.data.signId,
              method: 'POST',
              header: {
                'content-type': 'application/json',
              },
              success: (res) => {
                console.log(res);
                if (res.data.success) {
                  tt.showModal({
                    title: '成功',
                    content: '成功结束签到',
                  });
                  this.setData({
                    endTime: '',
                  });
                } else {
                  tt.showModal({
                    title: '失败',
                    content: res.data.message,
                  });
                }
              },
              fail(res) {
                console.log(`结束签到失败`);
              },
            });
          }
        },
      });
    }
  },
});
