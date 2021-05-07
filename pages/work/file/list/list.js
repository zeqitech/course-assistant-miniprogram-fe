const app = getApp().globalData;

Page({
  /**
   * 页面初始数模
   */
  data: {
    // 作业 ID
    workId: '',
    // 文档列表
    workFileList: [],
    // 操作列表
    itemList: ['修改作业信息', '删除作业', '取消'],
    // 显示弹出层
    showPopup: false,
    // 用户类型
    userType: app.userType,
    // 课程 ID
    courseId: '',
  },

  /**
   * 生命周期函数 - 监听页面加载
   * @param {Object} options
   */
  onLoad(options) {
    console.log('--------------------workFileList page-------------------');
    console.log(options);
    console.log('-----------------------------------------------');
    this.setData({
      workId: options.workId,
      startDate: options.startDate.split(' ')[0],
      endDate: options.endDate.split(' ')[0],
      weight: options.weight,
      name: options.name,
      courseId: options.courseId,
    });
  },

  /**
   * 生命周期函数 - 监听页面显示
   */
  async onShow() {
    // 获取文件列表
    let workFileList = await this.handleGetWorkFileList();
    // 保存数据
    this.setData({
      workFileList: workFileList,
    });
  },

  /**
   * 获取某次作业之下所有作业文件列表
   */
  async handleGetWorkFileList() {
    // 获取返回值
    let workFileListRes = await new Promise((resolve) => {
      // 使用飞书开放 API
      tt.request({
        url: app.urlConfig.getWorkFileListUrl,
        data: {
          workId: this.data.workId,
        },
        header: {
          'content-type': 'application/json',
        },
        complete(res) {
          // 回传数据
          resolve(res.data);
        },
      });
    });
    console.log('获取作业文档列表成功', workFileListRes);
    // 若获取成功
    if (workFileListRes.success) {
      // 返回文档列表
      return workFileListRes.data.workFileList;
    } else {
      // 获取失败，返回空数组
      return [];
    }
  },

  /**
   * 跳转到打分页面
   * @param {Object} e
   */
  navToWorkFileGrade(e) {
    let data = e.currentTarget.dataset;
    tt.navigateTo({
      url: `/pages/work/file/grade/grade?fileToken=${data.fileToken}&fileName=${data.fileName}&comment=${data.comment}&score=${data.score}`,
    });
  },

  /**
   * 点击更多按钮
   */
  handleTapMoreBtn() {
    // 获取系统信息
    tt.getSystemInfo({
      success: (res) => {
        console.log(res);
        // 移动端
        if (res.platform === 'ios' || res.platform === 'android') {
          // 调用开放 API 显示菜单
          tt.showActionSheet({
            itemList: this.data.itemList,
            success: (res) => {
              if (res.tapIndex === 0) {
                // 修改作业
                this.handleModifyWork();
              } else if (res.tapIndex === 1) {
                // 删除作业
                this.handleDelWork();
              } else {
                //取消
              }
            },
            fail(res) {
              console.log(`showActionSheet failure`);
            },
          });
        } else {
          // PC 端，展示弹出层
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
      // 修改作业信息
      this.setData({
        showPopup: false,
      });
      this.handleModifyWork();
    } else if (index === 1) {
      // 删除作业
      this.setData({
        showPopup: false,
      });
      this.handleDelWork();
    } else {
      // 取消
      this.setData({
        showPopup: false,
      });
    }
  },

  /**
   * 跳转到修改作业信息页面
   */
  handleModifyWork() {
    tt.navigateTo({
      url: `/pages/work/new/new?option=modify&startDate=${this.data.startDate}&endDate=${this.data.endDate}&name=${this.data.name}&weight=${this.data.weight}&workId=${this.data.workId}&courseId=${this.data.courseId}`,
    });
  },

  /**
   * 处理删除作业事件
   */
  async handleDelWork() {
    // 用户确认删除
    let confirmRes = await new Promise((resolve) => {
      tt.showModal({
        title: '确认',
        content: `即将删除本次作业的所有文档，是否确定删除作业：${this.data.name}`,
        complete(res) {
          resolve(res);
        },
      });
    });
    // 如果点击确认
    if (confirmRes.confirm) {
      // 显示 Loading
      tt.showLoading({
        title: '请稍候',
      });
      // 发送删除作业请求
      let delWorkRes = await new Promise((resolve) => {
        tt.request({
          url: `${app.urlConfig.delWorkUrl}?workId=${this.data.workId}&openId=${app.openId}`,
          method: 'DELETE',
          header: {
            'content-type': 'application/json',
          },
          complete(res) {
            resolve(res.data);
          },
        });
      });
      // 如果删除成功
      if (delWorkRes.success) {
        tt.hideLoading();
        tt.showModal({
          title: '成功',
          content: '成功删除作业',
          success() {
            // 点击确认，返回上层
            tt.navigateBack({
              delta: 1,
            });
          },
        });
      } else {
        // 删除失败
        tt.showModal({
          title: '失败',
          content: delWorkRes.message,
        });
      }
    }
  },
});
