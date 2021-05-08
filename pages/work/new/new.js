// 全局变量
const globalData = getApp().globalData;
// 全局函数
const globalFunction = getApp().globalFunction;

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
    // 作业 ID
    workId: '',
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
      courseId: options.courseId,
    });
    if (options.option === 'new') {
      tt.setNavigationBarTitle({
        title: '发布作业',
      });
    } else {
      this.setData({
        startDate: options.startDate,
        endDate: options.endDate,
        name: options.name,
        weight: options.weight,
        workId: options.workId,
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
    // 选择起始日期
    if (e.currentTarget.dataset.name === 'start') {
      this.setData({
        startDate: e.detail.value,
      });
    } else {
      // 选择结束日期
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
        // 发送发布作业请求
        let addWorkRes = await new Promise((resolve) => {
          tt.request({
            url: globalData.urlConfig.addWorkUrl,
            method: 'POST',
            data: {
              startTime: this.data.startDate + ' 00:00:00',
              expireTime: this.data.endDate + ' 23:59:59',
              courseId: this.data.courseId,
              weight: parseInt(this.data.weight),
              openId: globalData.openId,
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
        // 若添加成功
        if (addWorkRes.success) {
          // 显示发布成功
          tt.showModal({
            title: '成功',
            content: '发布成功',
            success() {
              // 自动跳转回上一页
              tt.navigateBack({
                delta: 1,
              });
            },
          });
        } else {
          // 若添加失败
          tt.showModal({
            title: '失败',
            content: addWorkRes.message,
          });
        }
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
  async handleModifyTask() {
    // 判断数据是否为空
    if (
      this.data.name !== '' &&
      this.data.startDate !== '' &&
      this.data.endDate !== '' &&
      this.data.weight !== ''
    ) {
      // 起止日期需符合逻辑
      if (this.data.startDate > this.data.endDate) {
        // 不符合逻辑报错
        tt.showModal({
          title: '错误',
          content: '起始日期不能晚于结束日期！',
        });
      } else {
        // 符合逻辑
        tt.showLoading({
          title: '修改中',
        });
        // 发送修改作业请求
        let modifyWorkRes = await new Promise((resolve) => {
          // 调用飞书请求 API
          tt.request({
            url: globalData.urlConfig.modifyWorkUrl,
            method: 'POST',
            data: {
              workId: this.data.workId,
              startTime: this.data.startDate + ' 00:00:00',
              expireTime: this.data.endDate + ' 23:59:59',
              workName: this.data.name,
              weight: parseInt(this.data.weight),
              courseId: this.data.courseId,
            },
            header: {
              'content-type': 'application/json',
            },
            // 回传数据
            complete(res) {
              resolve(res.data);
            },
          });
        });
        console.log(modifyWorkRes);
        // 隐藏 Loading
        tt.hideLoading();
        // 如果修改作业信息成功
        if (modifyWorkRes.success) {
          // 提示信息
          tt.showModal({
            title: '成功',
            content: '修改作业信息成功',
            success() {
              tt.navigateBack({
                delta: 2,
              });
            },
          });
        } else {
          tt.showModal({
            title: '失败',
            content: modifyWorkRes.message,
          });
        }
      }
    }
  },
});
