// 获取全局变量
const globalData = getApp().globalData;
// 获取全局函数
const globalFunction = getApp().globalFunction;
// // 路由
// import routes from '../../public/router/routes';

Page({
  /**
   * 页面数据
   */
  data: {
    // 班级列表
    classList: [],
    // 用户角色信息
    userType: globalData.userType,
    // 本学期课程列表是否为空
    nowEmpty: true,
    // 往期课程是否为空
    pastEmpty: true,
    // 用户昵称，用于首部问候
    nickName: '',
  },

  /**
   * 生命周期函数 - 监听页面显示
   */
  async onShow() {
    // 若未登录
    if (!globalData.hasLogin || globalData.openId === '') {
      // 显示 `Loading`
      globalFunction.showLoading('加载中');
      // 用户登录，获取用户信息
      let userInfo = await this.handleLogin();
      // 如果登录成功
      if (userInfo.success) {
        // 保存全局变量
        globalData.hasLogin = true;
        globalData.openId = userInfo.openId;
        globalData.userType = userInfo.userType;
      } else {
        // 登录失败，显示报错信息
        tt.showModal({
          title: '失败',
          content: userInfo.message,
        });
      }
      // 获取班级列表
      let courseList = await this.handleGetCourseList();
      globalData.courseList = courseList;
      // 更新当前页面的数据
      this.setData({
        userType: userInfo.userType,
        nickName: userInfo.nickName,
        courseList: courseList,
      });
    } else {
      // 展示 `Loading`
      tt.showLoading({
        title: '获取课程信息',
      });
      // 获取班级列表
      let courseList = await this.handleGetCourseList();
      // 隐藏 `Loading`
      tt.hideLoading();
      // 更新当前页面数据
      this.setData({
        courseList: courseList,
      });
    }
  },

  /**
   * 用户登录
   */
  async handleLogin() {
    // 获取用户信息
    let userInfo = await new Promise((resolve) => {
      // 调用飞书获取用户信息接口
      tt.getUserInfo({
        // 完成后回传 `userInfo`
        complete(res) {
          resolve(res.userInfo);
        },
      });
    });
    // 获取临时授权码 `code`
    let code = await new Promise((resolve) => {
      // 调用飞书登录接口
      tt.login({
        // 完成后回传 `code`
        complete(res) {
          resolve(res.code);
        },
      });
    });
    // 把 `code` 发送到服务端
    let loginRes = await new Promise((resolve) => {
      // 调用飞书 HTTP 请求接口
      tt.request({
        url: globalData.urlConfig.loginUrl,
        data: {
          code: code,
        },
        header: {
          'content-type': 'application/json',
        },
        complete(res) {
          // 请求完成，隐藏加载模块
          tt.hideLoading();
          // 返回请求数据
          resolve(res.data);
        },
      });
    });
    // 返回用户信息数据
    return {
      // 用户名
      nickName: userInfo.nickName,
      // `openId`
      openId: loginRes.data.open_id,
      // 用户类型
      userType: loginRes.data.userType,
      // 接口调用状态
      success: loginRes.success,
      // 接口调用报错信息
      message: loginRes.message,
    };
  },

  /**
   * 获取课程列表
   * @returns 返回课程列表
   */
  async handleGetCourseList() {
    // 展示加载中
    tt.showLoading({
      title: '获取课程信息',
    });
    // 获取课程返回结果
    let getCourseRes = await new Promise((resolve) => {
      tt.request({
        url: globalData.urlConfig.getCourseUrl,
        data: {
          openId: globalData.openId,
        },
        header: {
          'content-type': 'application/json',
        },
        complete(res) {
          resolve(res.data);
        },
      });
    });
    console.log(getCourseRes);
    if (getCourseRes.success) {
      // 查看是否存在未过期课程
      getCourseRes.data.courseList.forEach((item) => {
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
    }
    // 隐藏加载中
    tt.hideLoading();
    return getCourseRes.data.courseList;
  },

  /**
   * 页面路由
   * @param {Object} e
   */
  pageNavigator(e) {
    globalFunction.pageNavigator(e, this.data);
  },
});
