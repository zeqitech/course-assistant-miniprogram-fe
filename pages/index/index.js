const app = getApp().globalData;

Page({
  /**
   * 页面数据
   */
  data: {
    forArray: ['1', '2', '3'],
    isTeacher: app.isTeacher,
  },

  /**
   * 当前页面首次加载时执行的生命周期函数
   * @param {Object} options
   */
  onLoad(options) {
    if (!app.hasLogin || app.openId === '') {
      // 首次进入主页时，登录
      tt.login({
        // 登录成功回调
        success: (res) => {
          if (res.code) {
            // 登录完成后，把code发送到服务端
            console.log(res);
            tt.request({
              url: app.urlConfig.loginUrl,
              data: {
                code: res.code,
              },
              header: {
                'content-type': 'application/json',
              },
              success: (res) => {
                // 登录成功后，设置全局变量值
                console.log(res);
                app.hasLogin = true;
                app.isTeacher = res.data.data.is_teacher;
                app.openId = res.data.data.open_id;
                this.setData({
                  isTeacher: res.data.data.is_teacher,
                });
              },
              fail(res) {
                console.log('调用 /butler/login 失败');
              },
            });
          } else {
            console.log('获取 code 失败');
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
