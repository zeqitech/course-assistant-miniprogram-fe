// 全局函数
import globalFunctions from '../../../public/function/index';
// 全局变量
const globalData = getApp().globalData;

// 双语支持
import translate from '../../../public/translate/index';
const _ = translate._;

const dataValidator = {
  // 判断数据是否非空
  isFull(data) {
    // 数据非空
    if (data) {
      return true;
    } else {
      // 数据为空
      return false;
    }
  },
  // 判断第一个时间是否在第二个时间之前
  earlyThan(a, b) {
    // a 在 b 之前
    if (a < b) {
      return true;
    } else {
      // a 在 b 之后
      return false;
    }
  },
};

Page({
  /**
   * 页面初始数据
   */
  data: {
    //作业名称
    name: '',
    //作业截止时刻
    endTime: '',
    //作业截至日期
    endDate: '',
    // 课程 ID
    courseId: '',
    // 操作，分为新建和修改
    option: '',
    // 作业权重
    weight: '',
    // 作业 ID
    workId: '',
    // 助教拥有批改作业权限
    assistantAuth: false,
    // 用户 openId
    openId: globalData.openId,
    // 作业分类
    tag: '',
    // 作业详情文档链接
    docUrl: null,
    // 作业详情文档名称
    fileName: '',
  },

  /**
   * 页面加载生命周期函数
   * @param {Object} options
   */
  onLoad(options) {
    console.log('-------------new task---------------');
    console.log(options);
    console.log('------------------------------------');
    // 保存通用数据
    this.setData({
      option: options.option,
      courseId: options.courseId,
    });
    // 如果操作为发布作业
    if (options.option === 'new') {
      tt.setNavigationBarTitle({
        title: _('发布作业'),
      });
    } else {
      // 如果操作为修改作业信息
      this.setData({
        endTime: options.endTime,
        endDate: options.endDate,
        name: options.name,
        weight: options.weight,
        workId: options.workId,
        assistantAuth: options.assistantAuth === 'true' ? true : false,
        tag: options.tag,
        docUrl: options.url,
      });
      tt.setNavigationBarTitle({
        title: _('修改信息'),
      });
    }
  },

  /**
   * 生命周期函数 - 监听页面显示
   */
  onShow() {
    // 设置标题
    tt.setNavigationBarTitle({
      title: _('发布作业'),
    });
    // ttml 双语支持
    this.setData({
      _t: translate._t(),
    });
  },

  /**
   * 老师选择题目要求
   */
  handleSelectDoc() {
    tt.docsPicker({
      maxNum: 1,
      pickerTitle: _('请选择题目要求云文档'),
      success: (res) => {
        console.log(res);
        // 保存数据
        this.setData({
          fileName: res.fileList[0].fileName,
          docUrl: res.fileList[0].filePath,
        });
      },
    });
  },

  /**
   * 修改助教批改作业权限
   * @param {Object} e
   */
  handleAuthChange(e) {
    this.setData({
      assistantAuth: e.detail.value,
    });
  },

  /**
   * 处理输入作业名称事件
   * @param {Object} e
   */
  handleInputName(e) {
    this.setData({
      name: e.detail,
    });
  },

  /**
   * 处理输入作业权重事件
   * @param {Object} e
   */
  handleInputWeight(e) {
    this.setData({
      weight: e.detail,
    });
  },

  /**
   * 处理输入作业分类事件
   * @param {Object} e
   */
  handleInputTag(e) {
    this.setData({
      tag: e.detail,
    });
  },

  /**
   * 处理选择起止日期事件
   * @param {Object} e
   */
  handleSelectDate(e) {
    // 选择起始日期
    if (e.currentTarget.dataset.name === 'time') {
      // 保存数据
      this.setData({
        endTime: e.detail.value,
      });
    } else {
      // 选择结束日期
      this.setData({
        endDate: e.detail.value,
      });
    }
  },

  /**
   * 判断数据是否符合格式要求
   */
  handleValidateData() {
    // 判断作业名、开始时间、截止时间、权重、作业分类是否非空
    if (
      dataValidator.isFull(this.data.name) &&
      dataValidator.isFull(this.data.endTime) &&
      dataValidator.isFull(this.data.endDate) &&
      dataValidator.isFull(this.data.weight) &&
      dataValidator.isFull(this.data.tag) &&
      dataValidator.isFull(this.data.docUrl)
    ) {
      // 判断开始时间是否早于结束时间
      if (dataValidator.earlyThan(this.data.endTime, this.data.endDate)) {
        return true;
      } else {
        // 提示开始时间需早于截止时间
        globalFunctions.showError(_('开始时间需早于截止时间'));
      }
    } else {
      // 数据不完善，提示完善数据
      globalFunctions.showError(_('请完善数据'));
    }
    // 以上两项同时满足返回 true，有一项不满足即返回 false
    return false;
  },

  /**
   * 处理发布作业事件
   */
  async handleAddWork() {
    // 首先判断 `作业名`，`开始时间`，`结束时间`，`权重` 是否为空
    if (this.handleValidateData()) {
      // 显示 Loading
      globalFunctions.showLoading(_('发布中'));
      // 发送发布作业请求
      let postWorkNewRes = await globalFunctions.sendRequests(
        'postWorkNew',
        this.data
      );
      // 隐藏 Loading
      globalFunctions.hideLoading();
      // 若添加成功
      if (postWorkNewRes.success) {
        // 显示发布成功
        globalFunctions.showSuccess(_('发布成功'), 1);
      } else {
        // 若添加失败
        globalFunctions.showError(postWorkNewRes.message);
      }
    }
  },

  /**
   * 处理修改作业信息事件
   *
   */
  async handleModifyWork() {
    // 数据验证
    if (this.handleValidateData()) {
      // 显示 Loading
      globalFunctions.showLoading(_('修改中'));
      // 发送修改作业请求
      let postWorkModifyRes = await globalFunctions.sendRequests(
        'postWorkModify',
        this.data
      );
      // 隐藏 Loading
      globalFunctions.hideLoading();
      // 如果修改作业信息成功
      if (postWorkModifyRes.success) {
        // 成功提示
        globalFunctions.showSuccess(_('修改作业信息成功'), 2);
      } else {
        // 失败提示
        globalFunctions.showError(postWorkModifyRes.message);
      }
    }
  },
});
