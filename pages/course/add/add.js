// 全局函数
import globalFunctions from '../../../public/function/index';
// 全局变量
const globalData = getApp().globalData;
// 模板文件地址
const fileUrl =
  'https://butler-resource.oss-cn-beijing.aliyuncs.com/%E8%AF%BE%E7%A8%8B%E4%BF%A1%E6%81%AF%E8%A1%A8%E8%8C%83%E4%BE%8B.xlsx';

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
    // 临时文件路径
    tempFilePath: '',
    // 进度条
    progress: 0,
  },

  /**
   * 处理下载 Excel 模板事件
   */
  async handleDownloadExcel() {
    // 显示 Loading
    globalFunctions.showLoading('正在下载');
    // 创建下载任务
    let downloadTask = tt.downloadFile({
      url: fileUrl,
      filePath: 'ttfile://temp/添加课程模板.xlsx',
      success: (res) => {
        // 下载成功
        if (res.statusCode === 200) {
          console.log(res);
          // 保存临时文件地址
          this.setData({
            tempFilePath: res.tempFilePath,
          });
          // 判断 OS
          let os = tt.getSystemInfoSync();
          console.log(os);
          // 移动端
          if (os.platform === 'android' || os.platform === 'ios') {
            // 打开文件
            tt.openDocument({
              filePath: this.data.tempFilePath,
            });
          } else {
            // PC 端
            // 保存文件
            tt.saveFileAs({
              filePath: this.data.tempFilePath,
              success: function (res) {
                // 保存成功
                console.log(res);
              },
            });
          }
        }
      },
      fail(res) {
        console.log(`downloadFile 调用失败`);
      },
    });
    // 监听下载进度变化
    downloadTask.onProgressUpdate((res) => {
      console.log(res);
      this.setData({
        progress: parseInt(res.progress),
      });
      if (this.data.progress === 100) {
        tt.showToast({
          title: '下载完成',
          icon: 'success',
          duration: 1500,
        });
      }
    });
    console.log(downloadTask);
  },

  /**
   * 处理输入学期事件
   * @param {Object} e
   */
  handleInputTerm(e) {
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
      isSystem: true,
      success: (res) => {
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
  async handleAddCourse() {
    // 首先判断输入的内容是否为空
    if (this.data.term !== '') {
      // 若输入不为空，则判断是否已经选择文件
      if (this.data.file !== '') {
        // 若已经选择文件，则判断文件类型是否正确
        if (
          this.data.file.split('.')[1] === 'xlsx' ||
          this.data.file.split('.')[1] === 'xls'
        ) {
          // 显示 Loading
          tt.showLoading({
            title: '创建中',
          });
          console.log(globalData.openId, this.data.term);
          // 若文件类型正确，则发起请求
          var addCourseRes = await new Promise((resolve) => {
            tt.uploadFile({
              url: `${globalData.urlConfig.addCourseUrl}?managerId=${globalData.openId}&term=${this.data.term}`,
              header: {
                'content-type': 'multipart/form-data',
              },
              filePath: this.data.file,
              name: 'courseExcel',
              complete(res) {
                resolve(res.data);
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
    if (addCourseRes.success) {
      // 提示成功
      tt.showModal({
        title: '成功',
        content: '成功添加课程',
        success(res) {
          // 点击确认返回上层
          tt.navigateBack({
            delta: 1,
          });
        },
      });
    } else {
      // 提示失败
      tt.showModal({
        title: '失败',
        content: addCourseRes.message,
      });
    }
    // 隐藏 Loading
    tt.hideLoading();
  },
});
