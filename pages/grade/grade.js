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
    let data = e.currentTarget.dataset;
    tt.openSchema({
      schema: 'https://uestc.feishu.cn/docs/' + data.token,
      external: false,
      success(res) {
        console.log('打开成功');
      },
      fail(res) {
        console.log('打开失败');
      },
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
      tt.request({
        url: 'someurl',
        method: 'POST',
        data: {
          user_name: 'hello',
        },
        header: {
          'content-type': 'application/json',
        },
        success(res) {
          console.log(`request 调用成功 res`);
        },
        fail(res) {
          console.log(`request 调用失败`);
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
