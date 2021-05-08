const app = getApp().globalData;

Page({
  /**
   * 页面初始数据
   */
  data: {
    // 课程 ID
    courseId: '',
  },

  /**
   * 生命周期函数 - 监听页面加载
   * @param {Object} options
   */
  onLoad(options) {
    console.log('-------------------sign page------------------');
    console.log(options);
    console.log('----------------------------------------------');
    this.setData({
      courseId: '',
    });
  },

  /**
   * 处理签到事件
   */
  async handleSignIn() {
    // 显示 Loading
    tt.showToast({
      title: '定位中',
      icon: 'loading',
    });
    // 获取位置
    let location = await new Promise((resolve) => {
      tt.getLocation({
        type: 'gcj02',
        complete(res) {
          // 回传数据
          resolve(res);
        },
      });
    });
    // 发送签到请求
    let signInRes = await new Promise((resolve) => {
      tt.request({
        url: app.urlConfig.signInUrl,
        method: 'POST',
        data: {
          courseId: this.data.courseId,
          studentId: app.openId,
          latitude: location.latitude.toString(),
          longitude: location.longitude.toString(),
        },
        header: {
          'content-type': 'application/json',
        },
        complete(res) {
          resolve(res.data);
        },
      });
    });
    // 签到成功
    if (signInRes.success) {
      tt.showModal({
        title: '成功',
        content: '签到成功',
        success() {
          tt.navigateBack({
            delta: 1,
          });
        },
      });
    } else {
      // 签到失败
      tt.showModal({
        title: '失败',
        content: signInRes.message,
      });
    }
  },
});
