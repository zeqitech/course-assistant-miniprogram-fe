const openIdUrl = require('./config').openIdUrl;

App({
  /**
   * 整个小程序启动时执行的生命周期函数
   * @param {Object} args
   */
  onLaunch: function (args) {
    console.log('App Launch');
    console.log(args.query);
    // 获取系统状态栏信息
    tt.getSystemInfo({
      success: (e) => {
        this.globalData.StatusBar = e.statusBarHeight;
        let capsule = tt.getMenuButtonBoundingClientRect();
        if (capsule) {
          this.globalData.Custom = capsule;
          this.globalData.CustomBar =
            capsule.bottom + capsule.top - e.statusBarHeight;
        } else {
          this.globalData.CustomBar = e.statusBarHeight + 50;
        }
      },
    });
  },
  /**
   * 小程序显示时运行的生命周期函数
   * @param {Object} args
   */
  onShow: function (args) {
    console.log('App Show');
    console.log(args);
    console.log('-------------');
    // 检查小程序版本更新
    let updateManager = tt.getUpdateManager();
    updateManager.onCheckForUpdate((result) => {
      console.log('is there any update?：' + result.hasUpdate);
    });
    updateManager.onUpdateReady((result) => {
      tt.showModal({
        title: '有更新可用',
        content: '新版本已准备就绪，是否重启以使用新版本？',
        // 如果点击按钮
        success: (res) => {
          console.log(JSON.stringify(res));
          // 如果选择使用新版本
          if (res.confirm) {
            updateManager.applyUpdate();
          }
        },
      });
    });
    // 如果小程序版本更新失败
    updateManager.onUpdateFailed((result) => {
      console.log('更新失败，请联系开发者反馈！');
    });
  },
  /**
   * 小程序不可见时执行的生命周期函数
   */
  onHide: function () {
    console.log('App Hide');
  },
  /**
   * 全局变量，用于存储用户登录态以及 openid
   */
  globalData: {
    hasLogin: false,
    openid: null,
    isTeacher: true,
  },
});
