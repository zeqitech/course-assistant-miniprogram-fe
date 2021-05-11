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
    // ttml 双语支持
    _t: translate._t(),
    // 课程 ID
    courseId: '',
  },

  /**
   * 生命周期函数 - 监听页面加载
   * @param {Object} options
   */
  onLoad(options) {
    console.log('-------------------sign page------------------');
    console.log(options);
    console.log('----------------------------------------------');
    this.setData({
      courseId: options.courseId,
    });
  },

  /**
   * 生命周期函数 - 监听页面显示
   */
  onShow() {
    // 设置标题
    tt.setNavigationBarTitle({
      title: _('签到'),
    });
  },

  /**
   * 处理签到事件
   */
  async handleSignIn() {
    // 显示 Loading
    tt.showLoading({
      title: _('定位中'),
    });
    // 获取位置
    let location = await new Promise((resolve) => {
      tt.getLocation({
        type: 'gcj02',
        complete(res) {
          // 回传数据
          resolve(res);
        },
      });
    });
    // 发送签到请求
    let signInRes = await new Promise((resolve) => {
      tt.request({
        url: globalData.urlConfig.signInUrl,
        method: 'POST',
        data: {
          courseId: this.data.courseId,
          studentId: globalData.openId,
          latitude: location.latitude.toString(),
          longitude: location.longitude.toString(),
        },
        header: {
          'content-type': 'application/json',
        },
        complete(res) {
          resolve(res.data);
        },
      });
    });
    // 隐藏 Loading
    tt.hideLoading();
    // 签到成功
    if (signInRes.success) {
      globalFunctions.showSuccess(_('签到成功'), 1);
    } else {
      // 签到失败
      globalFunctions.showError(signInRes.message);
    }
  },
});
