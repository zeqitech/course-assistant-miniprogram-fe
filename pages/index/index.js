const app = getApp().globalData;

Page({
  /**
   * 页面数据
   */
  data: {
    forArray: ['1', '2', '3'],
    classArray: [],
    isTeacher: app.isTeacher,
    avatar: '',
    nowEmpty: true,
    pastEmpty: true,
  },

  /**
   * 当前页面首次加载时执行的生命周期函数
   * @param {Object} options
   */
  onLoad(options) {
    if (!app.hasLogin || app.openId === '') {
      tt.showLoading({
        title: '加载中',
      });
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
                tt.getUserInfo({
                  success: (res) => {
                    this.setData({
                      avatar: res.userInfo.avatarUrl,
                      nickName: res.userInfo.nickName,
                    });
                  },
                });
                this.getClass(() => {
                  tt.hideLoading({});
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

  onShow() {
    if (app.hasLogin) {
      tt.showLoading({
        title: '加载中',
      });
      this.getClass(() => {
        tt.hideLoading({});
      });
    }
  },

  getClass(cb) {
    tt.request({
      url: app.urlConfig.getClassUrl,
      data: {
        openId: app.openId,
      },
      header: {
        'content-type': 'application/json',
      },
      success: (res) => {
        console.log('获取班级列表成功');
        console.log(res);
        res.data.data.list.forEach((item, index) => {
          if (!item.expireStatus) {
            this.setData({
              nowEmpty: false,
            });
            return;
          } else {
            this.setData({
              pastEmpty: false,
            });
          }
        });
        this.setData({
          classArray: res.data.data.list,
        });
        cb();
      },
      fail(res) {
        console.log('获取班级列表失败');
      },
    });
  },

  /**
   * 跳转到班级作业列表页面
   * @param {Object} e
   */
  navToClass(e) {
    console.log(e);
    tt.navigateTo({
      url: `/pages/class/class?token=${e.currentTarget.dataset.token}&chatId=${e.currentTarget.dataset.chatId}&cover=${e.currentTarget.dataset.cover}`,
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
  navToAllClass(e) {
    let filter = e.currentTarget.dataset.filter;
    tt.navigateTo({
      url: `/pages/allClass/allClass?filter=${filter}&classArray=${JSON.stringify(
        this.data.classArray
      )}&nowEmpty=${JSON.stringify(
        this.data.nowEmpty
      )}&pastEmpty=${JSON.stringify(this.data.pastEmpty)}`,
    });
  },
});
