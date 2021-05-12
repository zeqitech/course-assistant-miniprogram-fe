import urlConfig from './public/requests/config';

App({
  /**
   * 整个小程序启动时执行的生命周期函数
   * @param {Object} args
   */
  onLaunch: function (args) {
    // 设置语言缓存，默认语言为系统语言
    let systemInfo = tt.getSystemInfoSync();
    console.log(systemInfo);
    tt.setStorageSync('language', systemInfo.language);
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
   * 全局变量，用于存储用户登录态以及 openid
   */
  globalData: {
    // 用户是否登录
    hasLogin: false,
    // 用户 openId
    openId: null,
    // 用户类型，1教务，2老师，3学生，4助教
    userType: null,
    // 课程列表
    courseList: [],
    // 请求地址
    urlConfig,
  },

  globalFunction: {},

  /**
   * 获取当前时间 格式：yyyy-MM-dd HH:MM:SS
   */
  getCurrentTime(time) {
    var date = new Date(time); //当前时间
    var month = this.zeroFill(date.getMonth() + 1); //月
    var day = this.zeroFill(date.getDate()); //日
    var hour = this.zeroFill(date.getHours()); //时
    var minute = this.zeroFill(date.getMinutes()); //分
    var second = this.zeroFill(date.getSeconds()); //秒

    //当前时间
    var curTime =
      date.getFullYear() +
      '-' +
      month +
      '-' +
      day +
      ' ' +
      hour +
      ':' +
      minute +
      ':' +
      second;

    return curTime;
  },

  /**
   * 补零
   */
  zeroFill(i) {
    if (i >= 0 && i <= 9) {
      return '0' + i;
    } else {
      return i;
    }
  },
});
