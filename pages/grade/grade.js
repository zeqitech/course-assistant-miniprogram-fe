const app = getApp().globalData;

Page({
  /**
   * 页面初始数据
   */
  data: {
    score: '',
    remark: '',
  },

  onLoad(options) {
    console.log('---------------grade page--------------');
    console.log(options);
    console.log('---------------------------------------');
    this.setData({
      token: options.token,
      title: options.title,
    });
  },

  /**
   * 打开文档页面
   * @param {Object} e
   */
  handleOpenFile(e) {
    tt.openSchema({
      schema: 'https://uestc.feishu.cn/docs/' + this.data.token,
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
  handlePostGrade() {
    console.log(this.data.score, this.data.remark);
    if (this.data.score !== '') {
      if (this.data.remark === '') {
        this.setData({
          remark: '无',
        });
      }
      tt.showModal({
        title: '提示',
        content: `确认给 ${this.data.title} 作业打分 ${this.data.score}？`,
        success: (res) => {
          if (res.confirm) {
            tt.request({
              url: app.urlConfig.postGradeUrl,
              method: 'POST',
              data: {
                comment: this.data.remark,
                fileToken: this.data.token,
                openId: app.openId,
                score: parseInt(this.data.score),
              },
              header: {
                'content-type': 'application/json',
              },
              success(res) {
                console.log(res);
                tt.showModal({
                  title: '成功',
                  content: '分数添加成功',
                  success(res) {
                    tt.navigateBack({
                      delta: 1,
                    });
                  },
                });
              },
              fail(res) {
                console.log(`request 调用失败`);
              },
            });
          } else {
            tt.showToast({
              title: '已取消',
              icon: 'success',
            });
          }
        },
      });
    } else {
      tt.showModal({
        title: '失败',
        content: '请输入分数',
      });
    }
  },
});
