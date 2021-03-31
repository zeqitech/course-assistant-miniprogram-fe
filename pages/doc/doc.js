const app = getApp().globalData;

Page({
  /**
   * 页面初始数模
   */
  data: {
    token: '',
    expireStatus: '',
    endDate: '',
    startDate: '',
    groupToken: '',
    name: '',
    docArray: [],
    itemList: ['修改作业信息', '删除作业', '取消'],
    showPopup: false,
  },

  /**
   * 页面加载生命周期函数
   * @param {Object} options
   */
  onLoad(options) {
    console.log('--------------------doc page-------------------');
    console.log(options);
    console.log('-----------------------------------------------');
    this.setData({
      token: options.token,
      expireStatus: options.expireStatus,
      endDate: options.endDate.split(' ')[0],
      startDate: options.startDate.split(' ')[0],
      groupToken: options.groupToken,
      name: options.name,
    });
  },

  /**
   * 页面显示声明周期函数
   */
  onShow() {
    this.getDoc();
  },

  /**
   * 获取某次任务下所有作业文档列表
   */
  getDoc() {
    tt.request({
      url: app.urlConfig.getDocUrl,
      data: {
        workToken: this.data.token,
      },
      header: {
        'content-type': 'application/json',
      },
      success: (res) => {
        console.log(res);
        let that = this;
        let docArray = JSON.parse(JSON.stringify(res.data.data.list));
        docArray.forEach((item, index) => {
          item.fileName =
            item.fileName.split('-')[1] + '-' + item.fileName.split('-')[2];
          if (index === docArray.length - 1) {
            that.setData({
              docArray: docArray,
            });
          }
        });
        // this.setData({
        //   docArray: res.data.data.list,
        // });
      },
      fail(res) {
        console.log(`request 调用失败`);
      },
    });
  },

  /**
   * 跳转到打分页面
   * @param {Object} e
   */
  navToGrade(e) {
    let data = e.currentTarget.dataset;
    tt.navigateTo({
      url: `/pages/grade/grade?token=${data.token}&title=${data.title}`,
    });
  },

  /**
   * 点击更多按钮
   */
  handleTapMoreBtn() {
    tt.getSystemInfo({
      success: (res) => {
        console.log(res);
        if (res.platform === 'ios' || res.platform === 'android') {
          tt.showActionSheet({
            itemList: this.data.itemList,
            success: (res) => {
              if (res.tapIndex === 0) {
                this.modifyTask();
              } else if (res.tapIndex === 1) {
              }
            },
            fail(res) {
              console.log(`showActionSheet failure`);
            },
          });
        } else {
          this.setData({
            showPopup: true,
          });
        }
      },
    });
  },

  /**
   * 处理选择更多功能事件
   * @param {Object} e
   */
  handleMoreOption(e) {
    let index = e.currentTarget.dataset.index;
    if (index === 0) {
      this.setData({
        showPopup: false,
      });
      this.modifyTask();
    } else if (index === 1) {
      this.setData({
        showPopup: false,
      });
      this.deleteTask();
    } else {
      this.setData({
        showPopup: false,
      });
    }
  },

  /**
   * 修改作业信息
   */
  modifyTask() {
    tt.navigateTo({
      url: `/pages/newTask/newTask?token=${this.data.token}&expireStatus=${this.data.expireStatus}&endDate=${this.data.endDate}&startDate=${this.data.startDate}&groupToken=${this.data.groupToken}&name=${this.data.name}&option=modify`,
    });
  },

  /**
   * 删除作业
   */
  deleteTask() {
    tt.showModal({
      title: '确认',
      content: `即将删除本次作业的所有文档，是否确定删除作业：${this.data.name}`,
      success: (res) => {
        if (res.confirm) {
          tt.showLoading({
            title: '请稍候',
          });
          tt.request({
            url: app.urlConfig.delTaskUrl + '?workToken=' + this.data.token,
            method: 'DELETE',
            header: {
              'content-type': 'application/json',
            },
            success(res) {
              console.log(res);
              tt.hideLoading({});
              if (res.data.success) {
                tt.showModal({
                  title: '成功',
                  content: '成功删除作业',
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
              tt.hideLoading({});
              console.log(res);
            },
          });
        }
      },
    });
  },
});
