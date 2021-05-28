// 全局函数
import globalFunctions from '../../../public/function/index';
// 全局变量
const globalData = getApp().globalData;
// 时间函数
const timeFunction = getApp();

// 双语支持
import translate from '../../../public/translate/index';
const _ = translate._;

Page({
  /**
   * 页面初始数据
   */
  data: {
    // 签到持续时长
    duration: '',
    // 课程 ID
    courseId: '',
    // 用户 openId
    openId: globalData.openId,
    // 所有签到列表
    signList: [],
    // 用户类型
    userType: globalData.userType,
  },

  /**
   * 生命周期函数 - 监听页面加载
   * @param {Object} options
   */
  onLoad(options) {
    // 保存数据
    this.setData({
      courseId: options.courseId,
    });
  },

  /**
   * 生命周期函数 - 监听页面显示
   */
  async onShow() {
    // 设置标题
    tt.setNavigationBarTitle({
      title: _('发起签到'),
    });
    // ttml 双语支持
    this.setData({
      _t: translate._t(),
      duration: '',
    });
    // 首先获取签到列表
    let signList = await this.handleGetSignList();
    // 保存数据
    this.setData({
      signList: signList,
    });
  },

  /**
   * 监听下拉刷新事件
   */
  async onPullDownRefresh() {
    await this.onShow();
    // 加载完成，停止下拉刷新
    tt.stopPullDownRefresh();
  },

  /**
   * 获取签到记录列表
   * @returns 返回签到记录列表
   */
  async handleGetSignList() {
    // 发送获取签到列表请求
    let getSignListRes = await globalFunctions.sendRequests(
      'getSignList',
      this.data
    );
    // 获取成功
    if (getSignListRes.success) {
      // 返回签到列表
      return getSignListRes.data.signList;
    } else {
      // 获取失败，报错
      globalFunctions.showError(getSignListRes.message);
      // 返回空数组
      return [];
    }
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
    console.log(globalData);
    // 判断持续时间不为空
    if (this.data.duration !== '') {
      // 获取签到起止时间
      let times = this.handleGetSignTime();
      // 已授权，显示 Loading
      // 显示 Loading
      globalFunctions.showLoading(_('定位中'), false);
      // 获取当前老师位置
      let location = await this.handleGetLocation();
      // 保存数据
      this.setData({
        latitude: location.latitude.toString(),
        longitude: location.longitude.toString(),
        startTime: times.startTime,
        endTime: times.endTime,
      });
      // 获取签到请求返回值
      let postNewSignRes = await globalFunctions.sendRequests(
        'postNewSign',
        this.data
      );
      // 已授权，隐藏 Loading
      // 隐藏 Loading
      globalFunctions.hideLoading();
      // 成功发布签到
      if (postNewSignRes.success) {
        // 提示成功
        await globalFunctions.showSuccess(_('发布成功'), 0);
        // 刷新页面数据
        this.setData({
          signList: await this.handleGetSignList(),
          duration: '',
        });
      } else {
        // 发布签到失败
        globalFunctions.showError(postNewSignRes.message);
      }
    } else {
      // 提示完善签到持续时间
      globalFunctions.showError(_('请完善签到持续时间'));
    }
  },

  /**
   * 获取签到起止时间
   */
  handleGetSignTime() {
    // 计算签到起止时间
    let startTime = timeFunction.getCurrentTime(new Date().getTime());
    let endTime = timeFunction.getCurrentTime(
      new Date().getTime() + parseInt(this.data.duration) * 60000
    );
    // 返回时间对象
    return {
      startTime,
      endTime,
    };
  },

  /**
   * 获取位置信息（经纬度）
   */
  async handleGetLocation() {
    // 获取位置信息
    let getLocationRes = await new Promise((resolve) => {
      tt.getLocation({
        type: 'gcj02',
        complete(res) {
          resolve(res);
        },
      });
    });
    // 返回数据
    return getLocationRes;
  },

  /**
   * 获取地理位置授权信息
   */
  async handleGetLocationAuth() {
    return await globalFunctions.getScope('userLocation');
  },

  /**
   * 页面路由
   * @param {Object} e
   */
  pageNavigator(e) {
    globalFunctions.pageNavigator(e, this.data);
  },
});
