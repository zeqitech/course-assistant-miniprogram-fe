// 获取全局函数
import globalFunctions from '../../public/function/index';
// 获取全局变量
const globalData = getApp().globalData;

// 双语支持
import translate from '../../public/translate/index';
const _ = translate._;

// 切换语言
const switchLanguage = {
  // 当前使用英语
  en() {
    // 设置使用的语言为中文
    tt.setStorageSync('language', 'zh_CN');
    // 刷新页面翻译对象
    this.setData({
      _t: translate._t(),
    });
  },
  // 当前使用中文
  zh_CN() {
    // 设置使用的语言为英文
    tt.setStorageSync('language', 'en');
    // 刷新页面翻译对象
    this.setData({
      _t: translate._t(),
    });
  },
};

Page({
  /**
   * 页面数据
   */
  data: {
    // 班级列表
    courseList: [],
    // 用户角色信息
    userType: globalData.userType,
    // 用户 openId
    openId: globalData.openId,
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
    // ttml 双语支持
    this.setData({
      _t: translate._t(),
    });
    // 用户未登录
    if (this.data.openId === null) {
      // 显示 Loading
      globalFunctions.showLoading();
      // 登录
      await this.handleLogin();
      // 隐藏 Loading
      globalFunctions.hideLoading();
    }
    // 显示 Loading
    globalFunctions.showLoading(_('获取课程列表'));
    // 登录成功后获取数据
    let courseList = await this.handleGetCourseList();
    // 保存数据
    this.setData({
      courseList: courseList,
    });
    globalData.courseList = courseList;
    // 隐藏 Loading
    globalFunctions.hideLoading();
    // 检查当前课程和往期课程是否为空
    this.checkEmpty();
  },

  /**
   * 获取用户信息
   * @returns 返回用户信息
   */
  async handleGetUserInfo() {
    // 获取用户信息
    let userInfo = await new Promise((resolve) => {
      // 调用飞书开放接口
      tt.getUserInfo({
        complete(res) {
          resolve(res.userInfo);
        },
      });
    });
    return userInfo;
  },

  /**
   * 调用 `tt.login` 获取临时授权码
   * @returns 返回临时授权码
   */
  async handleGetCode() {
    // 获取临时授权码
    let code = await new Promise((resolve, reject) => {
      tt.login({
        success: function (res) {
          // 成功获取 Code
          if (res.code) {
            // 返回 Code
            resolve(res.code);
          } else {
            // 获取 Code 失败，返回报错信息
            reject(res.errMsg);
          }
        },
      });
    });
    // 保存临时授权码
    this.setData({
      code: code,
    });
    // 返回临时授权码
    return code;
  },

  /**
   * 用户登录
   */
  async handleLogin() {
    // 获取临时授权码 `code`
    await this.handleGetCode();
    // 获取用户信息
    let userInfo = await this.handleGetUserInfo();
    console.log(userInfo);
    // 把 `code` 发送到服务端
    let loginRes = await globalFunctions.sendRequests('login', this.data);
    // 登录成功
    if (loginRes.success) {
      // 保存数据
      this.setData({
        nickName: userInfo.nickName,
        openId: loginRes.data.open_id,
      });
      globalData.openId = loginRes.data.open_id;
      globalData.userType = loginRes.data.userType;
    } else {
      // 登录失败
      globalFunctions.showError(loginRes.message);
    }
  },

  /**
   * 获取课程列表
   * @returns 返回课程列表
   */
  async handleGetCourseList() {
    // 获取课程返回结果
    let getCourseListRes = await globalFunctions.sendRequests(
      'getCourseList',
      this.data
    );
    // 获取课程列表成功
    if (getCourseListRes.success) {
      // 返回数据
      return getCourseListRes.data.courseList;
    } else {
      // 获取失败，进行提示
      globalFunctions.showError(getCourseListRes.message);
      // 返回空数组
      return [];
    }
  },

  /**
   * 检查当前课程和往期课程是否为空
   */
  checkEmpty() {
    // 遍历 courseList，检查当前课程和往期课程是否为空
    this.data.courseList.forEach((item) => {
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
  },

  /**
   * 页面路由
   * @param {Object} e
   */
  pageNavigator(e) {
    globalFunctions.pageNavigator(e, this.data);
  },

  /**
   * 切换语言
   */
  handleSwitchLanguage() {
    // 获取当前使用语言
    let language = tt.getStorageSync('language');
    // 切换语言
    let switchFunc = switchLanguage[language].bind(this);
    switchFunc();
  },
});
