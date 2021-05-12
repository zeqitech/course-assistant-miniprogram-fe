// 全局函数
import globalFunctions from '../../../../public/function/index';
// 全局变量
const globalData = getApp().globalData;

// 双语支持
import translate from '../../../../public/translate/index';
const _ = translate._;

Page({
  /**
   * 页面初始数据
   */
  data: {
    // 分数
    score: '',
    // 评语
    remark: '',
    // 文件 Token
    fileToken: '',
    // 文件名
    fileName: '',
    // 用户 openId
    openId: globalData.openId,
  },

  /**
   * 生命周期函数 - 监听页面加载
   * @param {Object} options
   */
  onLoad(options) {
    console.log('---------------grade page--------------');
    console.log(options);
    console.log('---------------------------------------');
    this.setData({
      fileToken: options.fileToken,
      fileName: options.fileName,
      score: options.score === 'null' ? '' : options.score,
      remark: options.comment === 'null' ? '' : options.comment,
      courseId: options.courseId,
    });
  },

  /**
   * 生命周期函数 - 监听页面显示
   */
  async onShow() {
    // 设置标题
    tt.setNavigationBarTitle({
      title: _('作业评分'),
    });
    // ttml 双语支持
    this.setData({
      _t: translate._t(),
    });
    await this.handleGetWorkFileRecord();
  },

  /**
   * 获取单个文件记录
   */
  async handleGetWorkFileRecord() {
    let res = await globalFunctions.sendRequests(
      'getWorkFileRecord',
      this.data
    );
    console.log(res);
    // 获取成功
    if (res.success) {
      // 如果学生查看过文档
      if (res.data.viewRecord) {
        this.setData({
          createTime: res.data.viewRecord.createTime,
          updateTime: res.data.viewRecord.updateTime,
          count: res.data.viewRecord.count,
        });
      } else {
        this.setData({
          count: 0,
        });
      }
    }
  },

  /**
   * 页面路由
   * @param {Object} e
   */
  pageNavigator(e) {
    globalFunctions.pageNavigator(e, this.data);
  },

  /**
   * 处理输入分数事件
   * @param {Object} e
   */
  handleScoreInput(e) {
    this.setData({
      score: e.detail,
    });
  },

  /**
   * 处理输入评语事件
   * @param {Object} e
   */
  handleRemarkInput(e) {
    this.setData({
      remark: e.detail,
    });
  },

  /**
   * 提交评分数据
   */
  async handlePostGrade() {
    console.log(this.data.score, this.data.remark);
    // 判断分数是否为空
    if (this.data.score !== '') {
      // 判断分数是否在正确的范围内
      if (parseInt(this.data.score) >= 0 && parseInt(this.data.score) <= 100) {
        // 判断评语是否为空
        if (this.data.remark === '') {
          // 若评语为空，则添加 “无”
          this.setData({
            remark: _('无'),
          });
        }
        // 提示用户打分情况，并获取用户确认
        let confirmRes = await new Promise((resolve) => {
          tt.showModal({
            title: _('提示'),
            content: `${this.data.fileName} ${_('确认打分')} ${
              this.data.score
            }? `,
            complete(res) {
              resolve(res);
            },
          });
        });
        // 若点击确定
        if (confirmRes.confirm) {
          // 发送打分请求
          let gradeRes = await globalFunctions.sendRequests(
            'postGrade',
            this.data
          );
          if (gradeRes.success) {
            // 提示打分成功
            globalFunctions.showSuccess(_('打分成功'), 1);
          } else {
            // 打分失败，显示报错信息
            globalFunctions.showError(gradeRes.message);
          }
        } else {
          // 若取消打分
          tt.showToast({
            title: _('已取消'),
            icon: 'success',
          });
        }
      } else {
        globalFunctions.showError(_('分数区间为'));
      }
    } else {
      globalFunctions.showError(_('请输入分数'));
    }
  },
});
