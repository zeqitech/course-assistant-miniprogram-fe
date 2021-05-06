const app = getApp().globalData;

Page({
  /**
   * 页面初始数据
   */
  data: {
    //作业名称
    name: '',
    //作业起始日期
    startDate: '',
    //作业截至日期
    endDate: '',
    // 课程 ID
    courseId: '',
    // 操作，分为新建和修改
    option: '',
    // 作业权重
    weight: '',
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
      option: options.option,
    });
    if (options.option === 'new') {
      this.setData({
        chatId: options.chatId,
        token: options.token,
      });
      tt.setNavigationBarTitle({
        title: '发布作业',
      });
    } else {
      this.setData({
        startDate: options.startDate,
        endDate: options.endDate,
        name: options.name,
        workToken: options.token,
        groupToken: options.groupToken,
      });
      tt.setNavigationBarTitle({
        title: '修改信息',
      });
    }
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
   * 处理输入作业权重事件
   * @param {Object} e
   */
  handleInputWeight(e) {
    this.setData({
      weight: e.detail,
    });
  },

  /**
   * 处理选择起止日期事件
   * @param {Object} e
   */
  handleSelectDate(e) {
    console.log(e);
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
  async handleAddWork() {
    // 首先判断 `作业名`，`开始时间`，`结束时间`，`权重` 是否为空
    if (
      this.data.name !== '' &&
      this.data.startDate !== '' &&
      this.data.endDate !== '' &&
      this.data.weight !== ''
    ) {
      if (this.data.startDate > this.data.endDate) {
        tt.showModal({
          title: '错误',
          content: '起始日期不能晚于结束日期！',
        });
      } else {
        // 展示加载中
        tt.showLoading({
          title: '发布中',
        });
        // 发送请求
        let addWorkRes = await new Promise((resolve) => {
          tt.request({
            url: app.urlConfig.addWorkUrl,
            method: 'POST',
            data: {
              startTime: this.data.startDate + ' 00:00:00',
              expireTime: this.data.endDate + ' 23:59:59',
              courseId: this.data.courseId,
              weight: parseInt(this.data.weight),
              openId: app.openId,
              workName: this.data.name,
            },
            header: {
              'content-type': 'application/json',
            },
            complete(res) {
              resolve(res.data);
            },
          });
        });
        console.log(addWorkRes);
        // 隐藏加载中
        tt.hideLoading();
      }
    } else {
      tt.showModal({
        title: '失败',
        content: '请完善作业信息！',
      });
    }
  },

  /**
   * 处理修改作业信息事件
   *
   */
  handleModifyTask() {
    if (
      this.data.name !== '' &&
      this.data.startDate !== '' &&
      this.data.endDate !== ''
    ) {
      if (this.data.startDate > this.data.endDate) {
        tt.showModal({
          title: '错误',
          content: '起始日期不能晚于结束日期！',
        });
      } else {
        tt.showLoading({
          title: '修改中',
        });
        tt.request({
          url: app.urlConfig.modifyTaskUrl,
          method: 'POST',
          data: {
            expireStatus: 0,
            expireTime: this.data.endDate + ' 23:59:59',
            groupToken: this.data.groupToken,
            updateTime: this.data.startDate + ' 11:59:59',
            workName: this.data.name,
            workToken: this.data.workToken,
          },
          header: {
            'content-type': 'application/json',
          },
          success(res) {
            console.log(res);
            tt.hideLoading({});
            if (res.data.success) {
              tt.showModal({
                title: '成功',
                content: '修改作业信息成功',
                success(res) {
                  tt.navigateBack({
                    delta: 2,
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
            console.log(`修改作业信息失败`);
            tt.hideLoading({});
            tt.showModal({
              title: '失败',
              content: '请完善作业信息！',
            });
          },
        });
      }
    }
  },
});
