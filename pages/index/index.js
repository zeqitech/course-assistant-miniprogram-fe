const app = getApp();

Page({
  /**
   * 页面数据
   */
  data: {
    forArray: ['1', '2', '3'],
  },

  /**
   * 当前页面首次加载时执行的生命周期函数
   * @param {Object} options
   */
  onLoad(options) {
    if (!app.globalData.hasLogin) {
      tt.login({
        success: function (res) {
          if (res.code) {
            console.log(res);
          } else {
            console.log(res.errMsg);
          }
        },
      });
    }
  },

  /**
   * 跳转到班级作业列表页面
   * @param {Object} e
   */
  navToTask(e) {
    tt.navigateTo({
      url: '/pages/task/task?token=' + e.currentTarget.dataset.token,
    });
  },

  /**
   * 跳转到新建班级页面
   */
  navToNewClass() {
    tt.navigateTo({
      url: '/pages/newClass/newClass',
    });
  },

  /**
   * 跳转到所有班级列表页面
   */
  navToAllClass() {
    tt.navigateTo({
      url: `/pages/allClass/allClass?filter=all&classArray=${classArray}`,
    });
  },
});
