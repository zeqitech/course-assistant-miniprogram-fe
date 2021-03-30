const app = getApp().globalData;

Page({
  /**
   * 页面初始数据
   */
  data: {
    name: '', //作业名称
    startDate: '', //作业起始日期
    endDate: '', //作业截至日期
    chatId: '', //群聊ID
    token: '', //班级Token
  },

  /**
   * 页面加载生命周期函数
   * @param {Object} options
   */
  onLoad(options) {
    console.log('-------------new task---------------');
    console.log(options);
    console.log('------------------------------------');
    this.setData({
      chatId: options.chatId,
      token: options.token,
    });
  },

  /**
   * 处理输入作业名称事件
   * @param {Object} e
   */
  handleInputName(e) {
    this.setData({
      name: e.detail,
    });
  },

  /**
   * 处理选择起止日期事件
   * @param {Object} e
   */
  handleSelectDate(e) {
    if (e.currentTarget.dataset.name === 'start') {
      this.setData({
        startDate: e.detail.value + ' 00:00:00',
      });
    } else {
      this.setData({
        endDate: e.detail.value + ' 23:59:59',
      });
    }
  },

  /**
   * 处理发布作业事件
   */
  handleNewTask() {
    if (
      this.data.name !== '' &&
      this.data.startDate !== '' &&
      this.data.endDate !== ''
    ) {
      tt.request({
        url: app.urlConfig.newTaskUrl,
        method: 'POST',
        data: {
          chatId: this.data.chatId,
          expireTime: this.data.endDate,
          groupToken: this.data.token,
          openId: app.openId,
          workName: this.data.name,
        },
        header: {
          'content-type': 'application/json',
        },
        success: (res) => {
          console.log(res);
          if (res.data.success) {
            tt.showModal({
              title: '成功',
              content: '发布作业成功',
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
          console.log(res);
          console.log('发布作业失败');
        },
      });
    } else {
      tt.showModal({
        title: '失败',
        content: '请完善作业信息！',
      });
    }
  },
});
