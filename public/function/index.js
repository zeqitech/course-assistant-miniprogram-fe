// 路由
import routes from '../router/index';
// 请求
import requests from '../requests/index';

// 双语支持
import translate from '../translate/index';
const _ = translate._;

export default {
  // 显示 Loading
  showLoading(title) {
    tt.showLoading({
      title: title,
      mask: true,
    });
  },

  // 隐藏 Loading
  hideLoading() {
    tt.hideLoading();
  },

  // 显示成功提示
  async showSuccess(content, delta) {
    tt.showModal({
      title: _('成功'),
      content: content,
      confirmText: _('确认'),
      cancelText: _('取消'),
      success() {
        // 点击确定返回 delta 层
        if (delta > 0) {
          tt.navigateBack({
            delta: delta,
          });
        }
      },
    });
  },

  // 显示错误提示
  showError(content) {
    tt.showModal({
      title: _('错误'),
      content: content,
      confirmText: _('确认'),
      cancelText: _('取消'),
    });
  },

  // 页面路由跳转
  pageNavigator(event, pageData) {
    // 数据
    let data = event.currentTarget.dataset;
    // 传入页面默认数据
    data.pageData = pageData;
    // 路由目的地
    let to = data.to;
    // 调用函数，发起路由跳转
    routes[to](data);
  },

  // 发送请求
  async sendRequests(url, pageData, event = {}) {
    // 数据
    let data = {};
    // 数据存在
    if (event.currentTarget) {
      data = event.currentTarget.dataset;
    }
    // 存入页面默认数据
    data.pageData = pageData;
    // 发起请求
    let res = await requests[url](data);
    return res;
  },

  // 查询授权状态
  async getScope(auth) {
    let scope = await new Promise((resolve) => {
      tt.getSetting({
        complete(res) {
          resolve(res);
        },
      });
    });
    return scope[auth];
  },
};
