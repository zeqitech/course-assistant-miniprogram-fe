const app = getApp().globalData;

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
  },

  /**
   * 生命周期函数 - 监听页面加载
   * @param {Object} options
   */
  onLoad(options) {
    console.log('签到情况', options);
    this.setData({
      signId: options.signId,
    });
  },

  /**
   * 生命周期函数 - 监听页面展示
   */
  async onShow() {
    // 获取签到情况
    let signInfo = await this.handleGetSignInfo();
    this.setData({
      signedCount: signInfo.signedCount,
      unsignedList: signInfo.unsignedList,
    });
  },

  /**
   * 获取签到信息
   * @returns 返回签到人数和未签到人名单
   */
  async handleGetSignInfo() {
    // 获取签到人数
    let signedCount = await this.handleGetSignedCount();
    // 获取未签到名单
    let unsignedList = await this.handleGetUnsignedList();
    return {
      signedCount,
      unsignedList,
    };
  },

  /**
   * 获取签到人数函数
   * @returns 签到人数
   */
  async handleGetSignedCount() {
    // 发送请求
    let signedCountRes = await new Promise((resolve) => {
      tt.request({
        url: app.urlConfig.signedCountUrl,
        data: {
          signId: this.data.signId,
        },
        header: {
          'content-type': 'application/json',
        },
        complete(res) {
          resolve(res.data);
        },
      });
    });
    // 获取签到人数成功
    if (signedCountRes.success) {
      return signedCountRes.data.count;
    } else {
      // 获取失败
      tt.showModal({
        title: '失败',
        content: signedCountRes.message,
      });
      return 0;
    }
  },

  /**
   * 获取未签到名单函数
   * @returns 未签到人员名单
   */
  async handleGetUnsignedList() {
    // 发送请求
    let unsignedListRes = await new Promise((resolve) => {
      tt.request({
        url: app.urlConfig.unsignedListUrl,
        data: {
          signId: this.data.signId,
        },
        header: {
          'content-type': 'application/json',
        },
        complete(res) {
          resolve(res.data);
        },
      });
    });
    // 如果获取成功
    if (unsignedListRes.success) {
      return unsignedListRes.data.unsignedList;
    } else {
      // 获取失败
      tt.showModal({
        title: '失败',
        content: unsignedListRes.message,
      });
      return [];
    }
  },
});
