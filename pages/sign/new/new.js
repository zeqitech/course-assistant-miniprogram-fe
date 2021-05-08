// 全局变量
const globalData = getApp().globalData;
// 全局函数
const globalFunction = getApp().globalFunction;
// 时间函数
const timeFunction = getApp();

Page({
  /**
   * 页面初始数据
   */
  data: {
    // 签到持续时长
    duration: '',
    // 课程 ID
    courseId: '',
  },

  /**
   * 生命周期函数 - 监听页面加载
   * @param {Object} options
   */
  onLoad(options) {
    this.setData({
      courseId: options.courseId,
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
   * 处理发布签到事件
   */
  async handleNewSign() {
    // 判断持续事件不为空
    if (this.data.duration !== '') {
      // 显示 Loading
      tt.showLoading({
        title: '请稍候',
      });
      // 计算签到起止时间
      let startTime = timeFunction.getCurrentTime(new Date().getTime());
      let endTime = timeFunction.getCurrentTime(
        new Date().getTime() + parseInt(this.data.duration) * 60000
      );
      // 获取当前老师位置
      let location = await new Promise((resolve) => {
        tt.getLocation({
          type: 'gcj02',
          success: (res) => {
            resolve(res);
          },
        });
      });
      // 获取签到请求返回值
      let newSignRes = await new Promise((resolve) => {
        // 使用开放 API 发送请求
        tt.request({
          url: globalData.urlConfig.releaseSignUrl,
          method: 'POST',
          data: {
            courseId: this.data.courseId,
            expireTime: endTime,
            latitude: location.latitude.toString(),
            longitude: location.longitude.toString(),
            startTime: startTime,
            teacherId: globalData.openId,
            validDistance: 100,
          },
          header: {
            'content-type': 'application/json',
          },
          complete(res) {
            resolve(res.data);
          },
        });
      });
      // 隐藏 Loading
      tt.hideLoading();
      // 成功发布签到
      if (newSignRes.success) {
        // 提示成功
        tt.showModal({
          title: '成功',
          content: '发布签到成功',
          success() {
            // 点击确认后返回上层
            tt.navigateBack({
              delta: 1,
            });
          },
        });
      } else {
        // 发布签到失败
        tt.showModal({
          title: '失败',
          content: newSignRes.message,
        });
      }
    } else {
      tt.showModal({
        title: '失败',
        content: '请完善签到持续时间！',
      });
    }
  },
});
