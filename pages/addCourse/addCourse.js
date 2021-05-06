const app = getApp().globalData;

Page({
  /**
   * 页面初始数据
   */
  data: {
    // 开课学期
    term: '',
    // 文件路径
    file: '',
    // 文件名
    fileName: '',
  },

  /**
   * 生命周期函数 - 监听页面装载
   * @param {Object} options
   */
  onLoad(options) {},

  /**
   * 处理输入学期事件
   * @param {Object} e
   */
  handleInputTerm(e) {
    console.log(e);
    this.setData({
      term: e.detail,
    });
  },

  /**
   * 处理选择 Excel 表格事件
   */
  handleSelectFile() {
    // 调用飞书开放 API
    tt.filePicker({
      // 最大选择文件数量为 1
      maxNum: 1,
      success: (res) => {
        console.log(res);
        // 保存文件路径和文件名
        this.setData({
          file: res.list[0].path,
          fileName: res.list[0].name,
        });
      },
    });
  },

  /**
   * 处理点击添加课程事件
   */
  handleAddCourse() {
    // 首先判断输入的内容是否为空
    if (this.data.term !== '') {
      // 若输入不为空，则判断是否已经选择文件
      if (this.data.file !== '') {
        // 若已经选择文件，则判断文件类型是否正确
        if (
          this.data.file.split('.')[this.data.file.length - 1] === 'xlsx' ||
          this.data.file.split('.')[this.data.file.length - 1] === 'xls'
        ) {
          // 若文件类型正确，则发起请求
          var addCourseRes = new Promise((resolve) => {
            tt.uploadFile({
              url: app.urlConfig.addCourseUrl,
              filePath: this.data.file,
              name: this.data.fileName,
              data: {
                managerId: app.openId,
                term: this.data.term,
              },
              complete(res) {
                resolve(res);
              },
            });
          });
        } else {
          // 若文件类型不正确，则进行提示
          tt.showModal({
            title: '错误',
            content: '文件类型不正确，请上传 xlsx 或 xls 文件',
          });
        }
      } else {
        // 若未选择文件，则提示
        tt.showModal({
          title: '错误',
          content: '请选择文件',
        });
      }
    } else {
      // 若输入内容为空，则提示
      tt.showModal({
        title: '错误',
        content: '请填写开课学期',
      });
    }
    console.log(addCourseRes);
  },
});
