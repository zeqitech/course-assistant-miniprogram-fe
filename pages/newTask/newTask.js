Page({
  /**
   * 页面初始数据
   */
  data: {
    name: '', //作业名称
    startDate: '', //作业起始日期
    endDate: '', //作业截至日期
  },

  /**
   * 页面加载生命周期函数
   * @param {Object} options
   */
  onLoad(options) {},

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
        startDate: e.detail.value,
      });
    } else {
      this.setData({
        endDate: e.detail.value,
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
        url: 'someurl',
        data: {
          user_name: 'hello',
        },
        header: {
          'content-type': 'application/json',
        },
        success: (res) => {
          console.log('发布作业成功');
          tt.navigateBack({
            delta: 1,
          });
        },
        fail(res) {
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
