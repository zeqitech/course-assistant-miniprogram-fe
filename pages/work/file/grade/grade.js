// 全局函数
import globalFunctions from '../../../../public/function/index';
// 全局变量
const globalData = getApp().globalData;

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
  },

  onLoad(options) {
    console.log('---------------grade page--------------');
    console.log(options);
    console.log('---------------------------------------');
    this.setData({
      fileToken: options.fileToken,
      fileName: options.fileName,
      score: options.score === 'null' ? '' : options.score,
      remark: options.comment === 'null' ? '' : options.comment,
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
            remark: '无',
          });
        }
        // 提示用户打分情况，并获取用户确认
        let confirmRes = await new Promise((resolve) => {
          tt.showModal({
            title: '提示',
            content: `确认给 ${this.data.fileName} 作业打分 ${this.data.score}？`,
            complete(res) {
              resolve(res);
            },
          });
        });
        // 若点击确定
        if (confirmRes.confirm) {
          // 发送打分请求
          let gradeRes = await new Promise((resolve) => {
            tt.request({
              url: globalData.urlConfig.gradeUrl,
              method: 'POST',
              data: {
                comment: this.data.remark,
                fileToken: this.data.fileToken,
                openId: globalData.openId,
                score: parseInt(this.data.score),
              },
              header: {
                'content-type': 'application/json',
              },
              complete(res) {
                resolve(res.data);
              },
            });
          });
          if (gradeRes.success) {
            // 提示打分成功
            tt.showModal({
              title: '成功',
              content: '打分成功',
              // 点击确认后返回
              success() {
                tt.navigateBack({
                  delta: 1,
                });
              },
            });
          } else {
            // 打分失败，显示报错信息
            tt.showModal({
              title: '失败',
              content: gradeRes.message,
            });
          }
        } else {
          // 若取消打分
          tt.showToast({
            title: '已取消',
            icon: 'success',
          });
        }
      } else {
        tt.showModal({
          title: '错误',
          content: '分数区间为0~100',
        });
      }
    } else {
      tt.showModal({
        title: '失败',
        content: '请输入分数',
      });
    }
  },
});
