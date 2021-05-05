const app = getApp().globalData;

Page({
  /**
   * 页面初始数模
   */
  data: {
    workId: '',
    docArray: [],
    itemList: ['修改作业信息', '删除作业', '取消'],
    showPopup: false,
  },

  /**
   * 页面加载生命周期函数
   * @param {Object} options
   */
  onLoad(options) {
    console.log('--------------------workFileList page-------------------');
    console.log(options);
    console.log('-----------------------------------------------');
    this.setData({
      workId: options.workId,
    });
    let workFileList = this.handleGetWorkFileList();
    console.log(workFileList);
  },

  /**
   * 页面显示声明周期函数
   */
  onShow() {
    this.getDoc();
  },

  /**
   * 获取某次作业之下所有作业文件列表
   */
  async handleGetWorkFileList() {
    let workFileListRes = new Promise((resolve) => {
      tt.request({
        url: app.urlConfig.getWorkFileListUrl,
        data: {
          workId: this.data.workId,
        },
        header: {
          'content-type': 'application/json',
        },
        complete(res) {
          resolve(res);
        },
      });
    });
    console.log('获取作业文档列表成功', workFileListRes);
    return workFileListRes;
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
