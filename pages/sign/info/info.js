// 全局函数
import globalFunctions from '../../../public/function/index';
// 全局变量
const globalData = getApp().globalData;

// 双语支持
import translate from '../../../public/translate/index';
const _ = translate._;

Page({
  /**
   * 页面初始数据
   */
  data: {
    // 签到 ID
    signId: '',
    // 已签到人数
    signedCount: 0,
    // 未签到名单
    unsignedList: [],
    // 已结束
    expireStatus: false,
  },

  /**
   * 生命周期函数 - 监听页面加载
   * @param {Object} options
   */
  onLoad(options) {
    // 保存数据
    this.setData({
      signId: options.signId,
      expireStatus: options.expireStatus === 'true' ? true : false,
    });
  },

  /**
   * 生命周期函数 - 监听页面展示
   */
  async onShow() {
    // ttml 双语支持
    this.setData({
      _t: translate._t(),
    });
    // 获取签到情况
    await this.handleGetSignInfo();
    // 设置标题
    tt.setNavigationBarTitle({
      title: _('签到情况'),
    });
  },

  /**
   * 监听下拉刷新
   */
  async onPullDownRefresh() {
    await this.onShow();
    tt.stopPullDownRefresh();
  },

  /**
   * 提前结束签到
   */
  async handleEndSign() {
    // 提示用户确认
    let confirm = await new Promise((resolve) => {
      tt.showModal({
        title: _('提示'),
        content: _('结束签到提醒'),
        confirmText: _('确认'),
        cancelText: _('取消'),
        success(res) {
          resolve(res);
        },
      });
    });
    // 用户确认后，结束签到
    if (confirm.confirm) {
      let res = await globalFunctions.sendRequests('endSign', this.data);
      console.log(res);
      // 结束成功
      if (res.success) {
        globalFunctions.showSuccess(_('结束签到成功'), 1);
      } else {
        globalFunctions.showError(res.message);
      }
    }
  },

  /**
   * 获取签到信息
   * @returns 返回签到人数和未签到人名单
   */
  async handleGetSignInfo() {
    // 获取签到人数
    let signData = await this.handleGetSignedCount();
    // 获取未签到名单
    let unsignedList = await this.handleGetUnsignedList();
    this.setData({
      signedCount: signData.signedCount,
      unsignedCount: signData.unsignedCount,
      attendance: parseInt(signData.attendance) * 100 + '%',
      unsignedList,
    });
  },

  /**
   * 获取签到人数函数
   * @returns 签到人数
   */
  async handleGetSignedCount() {
    // 发送请求
    let getSignedCountRes = await globalFunctions.sendRequests(
      'getSignedCount',
      this.data
    );
    // 获取签到人数成功
    if (getSignedCountRes.success) {
      // 返回签到人数
      return getSignedCountRes.data;
    } else {
      // 获取失败，提示错误
      globalFunctions.showError(getSignedCountRes.message);
      // 返回 0 值
      return 0;
    }
  },

  /**
   * 获取未签到名单函数
   * @returns 未签到人员名单
   */
  async handleGetUnsignedList() {
    // 发送请求
    let getUnsignedListRes = await globalFunctions.sendRequests(
      'getUnsignedList',
      this.data
    );
    // 如果获取成功
    if (getUnsignedListRes.success) {
      // 返回未签到名单
      return getUnsignedListRes.data.unsignedList;
    } else {
      // 获取失败，显示报错
      globalFunctions.showError(getUnsignedListRes.message);
      // 返回空数组
      return [];
    }
  },
});
