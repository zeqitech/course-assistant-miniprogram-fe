// 全局函数
import globalFunctions from '../../../public/function/index';
// 全局变量
const globalData = getApp().globalData;
// 时间函数
const timeFunction = getApp();

// 双语支持
import translate from '../../../public/translate/index';
const _ = translate._;

// 根据路由目的地，返回 to 参数值
const switchTo = {
  // 发布作业
  new() {
    return 'workNew';
  },
  // 文件列表
  workFileList() {
    return switchWorkFileList[globalData.userType]();
  },
  // 修改作业信息
  workModify() {
    return 'workModify';
  },
};
// 根据用户类型，决定跳转到文件列表
const switchWorkFileList = {
  // 教务
  manager() {
    return 'workFileListTeacher';
  },
  // 老师
  teacher() {
    return 'workFileListTeacher';
  },
  // 助教
  assistant() {
    return 'workFileListAssistant';
  },
};

Page({
  /**
   * 页面初始数据
   */
  data: {
    // 用户类型
    userType: globalData.userType,
    // 作业列表
    workList: [],
    // 当前时间
    currentTime: '',
    // 课程 ID
    courseId: '',
    // 作业分类
    tag: '',
    // 分类列表
    tagList: [],
    // 用户 openId
    openId: globalData.openId,
  },

  /**
   * 页面加载时执行的生命周期函数
   * @param {Object} options
   */
  onLoad(options) {
    console.log('-----------work page--------------');
    console.log(options);
    console.log('----------------------------------');
    this.setData({
      courseId: options.courseId,
    });
  },

  /**
   * 页面显示生命周期函数
   */
  async onShow() {
    // 设置标题
    tt.setNavigationBarTitle({
      title: _('课程作业列表'),
    });
    // ttml 双语支持
    this.setData({
      _t: translate._t(),
    });
    // 若为老师，则获取作业列表
    if (globalData.userType !== 'student') {
      let workList = await this.handleGetWorkList();
      let tagList = await this.handleGetTagList();
      tagList.unshift(_('所有作业'));
      this.setData({
        currentTime: timeFunction.getCurrentTime(new Date()),
        workList: workList,
        tagList: tagList,
      });
    }
  },

  /**
   * 监听下拉刷新
   */
  async onPullDownRefresh() {
    await this.onShow();
    tt.stopPullDownRefresh();
  },

  /**
   * 选择分类
   */
  async handleSelectTag(e) {
    // 若查看所有作业
    if (e.detail.value === '0') {
      this.setData({
        tag: '',
      });
    } else {
      this.setData({
        tag: this.data.tagList[parseInt(e.detail.value)],
      });
    }

    let workList = await this.handleGetTagedWork();
    this.setData({
      workList: workList,
    });
  },

  async handleMoreOptions(e) {
    console.log(e);
    // 判断操作类型，0修改，1删除
    if (e.detail === 0) {
      // 修改路由目的地
      e.currentTarget.dataset.to = 'workModify';
      // 修改作业信息
      this.pageNavigator(e);
    } else {
      // 删除作业
      await this.handleDelWork(e);
    }
  },

  /**
   * 获取某个分类下的文章
   * @param {String} tag
   */
  async handleGetTagedWork() {
    let res = await globalFunctions.sendRequests('getWorkList', this.data);
    // 获取成功
    if (res.success) {
      return res.data.workList;
    } else {
      return [];
    }
  },

  /**
   * 获取分类列表
   */
  async handleGetTagList() {
    let getTagListRes = await globalFunctions.sendRequests(
      'getTagList',
      this.data
    );
    console.log(getTagListRes);
    if (getTagListRes.success) {
      return getTagListRes.data.tagList;
    } else {
      return [];
    }
  },

  /**
   * 获取作业列表
   * @returns 作业列表数组
   */
  async handleGetWorkList() {
    // 展示 `Loading`
    globalFunctions.showLoading(_('获取作业列表'));
    // 获取作业列表返回值
    let getWorkListRes = await globalFunctions.sendRequests(
      'getWorkList',
      this.data
    );
    // 隐藏 `Loading`
    globalFunctions.hideLoading();
    // 若成功获取作业列表
    if (getWorkListRes.success) {
      // 返回作业列表
      return getWorkListRes.data.workList;
    } else {
      // 获取作业列表失败
      globalFunctions.showError(getWorkListRes.message);
      // 返回空数组
      return [];
    }
  },

  /**
   * 处理删除作业事件
   */
  async handleDelWork(e) {
    // 用户确认删除
    let confirmRes = await new Promise((resolve) => {
      tt.showModal({
        title: _('确认'),
        content: `${_('删除提示')}${e.currentTarget.dataset.workName}`,
        complete(res) {
          resolve(res);
        },
      });
    });
    // 如果点击确认
    if (confirmRes.confirm) {
      // 显示 Loading
      tt.showLoading({
        title: _('请稍候'),
      });
      // 发送删除作业请求
      let delWorkRes = await globalFunctions.sendRequests(
        'deleteWork',
        this.data,
        e
      );
      // 如果删除成功
      if (delWorkRes.success) {
        globalFunctions.hideLoading();
        await globalFunctions.showSuccess(_('删除作业成功'), 0);
        await this.onShow();
      } else {
        // 删除失败
        globalFunctions.showError(delWorkRes.message);
      }
    }
  },

  /**
   * 页面路由
   * @param {Object} e
   */
  pageNavigator(e) {
    // 转换真实 to 参数
    let realTo = switchTo[e.currentTarget.dataset.to]();
    // 替换 to 参数
    e.currentTarget.dataset.to = realTo;
    // 进行路由
    globalFunctions.pageNavigator(e, this.data);
  },
});
