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
      tt.request({
        url: 'someurl',
        data: {
          user_name: 'hello',
        },
        header: {
          'content-type': 'application/json',
        },
        success: (res) => {
          console.log('发起新的签到任务成功');
          tt.navigateBack({
            delta: 1,
          });
        },
        fail(res) {
          console.log(`request 调用失败`);
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
