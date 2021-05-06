const app = getApp().globalData;

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
    });
  },

  /**
   * 打开文档页面
   * @param {Object} e
   */
  handleOpenFile(e) {
    tt.openSchema({
      schema: 'https://uestc.feishu.cn/docs/' + this.data.fileToken,
      external: false,
    });
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
        tt.showModal({
          title: '提示',
          content: `确认给 ${this.data.fileName} 作业打分 ${this.data.score}？`,
          success: async (res) => {
            // 若确认打分
            if (res.confirm) {
              let gradeRes = await new Promise((resolve) => {
                tt.request({
                  url: app.urlConfig.gradeUrl,
                  method: 'POST',
                  data: {
                    comment: this.data.remark,
                    fileToken: this.data.fileToken,
                    openId: app.openId,
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
              console.log(gradeRes);
              // 若添加分数成功
              if (gradeRes.success) {
                tt.showModal({
                  title: '成功',
                  content: '打分成功',
                  success() {
                    tt.navigateBack({
                      delta: 1,
                    });
                  },
                });
              }
            } else {
              // 若取消打分
              tt.showToast({
                title: '已取消',
                icon: 'success',
              });
            }
          },
        });
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
