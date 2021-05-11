// 全局函数
import globalFunctions from '../../../../public/function/index';
// 全局变量
const globalData = getApp().globalData;

// 根据 to 参数值，确定真实 to 参数
const switchTo = {
  // 打分相关页面
  grade() {
    return switchGrade[globalData.userType]();
  },
  // 修改作业页面
  work() {
    return 'WorkModify';
  },
};
// 根据用户类型，决定是否打开打分页面
const switchGrade = {
  // 教务
  manager() {
    // 打开打分页面
    return 'workFileGrade';
  },
  // 老师
  teacher() {
    // 打开打分页面
    return 'workFileGrade';
  },
  // 学生
  student() {
    // 直接打开文档
    return 'openWorkFileStudent';
  },
  // 助教
  assistant() {
    // 打开打分页面
    return 'workFileGrade';
  },
};

Page({
  /**
   * 页面初始数模
   */
  data: {
    // 作业 ID
    workId: '',
    // 文档列表
    workFileList: [],
    // 操作列表
    itemList: ['修改作业信息', '删除作业', '取消'],
    // 显示弹出层
    showPopup: false,
    // 用户类型
    userType: globalData.userType,
    // 课程 ID
    courseId: '',
  },

  /**
   * 生命周期函数 - 监听页面加载
   * @param {Object} options
   */
  onLoad(options) {
    console.log('--------------------workFileList page-------------------');
    console.log(options);
    console.log('-----------------------------------------------');
    // 如果用户不是学生
    if (globalData.userType !== 'student') {
      this.setData({
        workId: options.workId,
        startDate: options.startDate.split(' ')[0],
        endDate: options.endDate.split(' ')[0],
        weight: options.weight,
        name: options.name,
        courseId: options.courseId,
      });
    } else {
      this.setData({
        courseId: options.courseId,
      });
    }
  },

  /**
   * 生命周期函数 - 监听页面显示
   */
  async onShow() {
    // 如果用户不是学生
    if (globalData.userType !== 'student') {
      // 获取文件列表
      let workFileList = await this.handleGetWorkFileList();
      // 保存数据
      this.setData({
        workFileList: workFileList,
      });
    } else {
      // 用户为学生
      let workFileList = await this.handleGetMyWorkFileList();
      // 保存数据
      this.setData({
        workFileList: workFileList,
      });
    }
  },

  /**
   * 获取某次作业之下所有作业文件列表
   */
  async handleGetWorkFileList() {
    // 获取返回值
    let workFileListRes = await new Promise((resolve) => {
      // 使用飞书开放 API
      tt.request({
        url: globalData.urlConfig.getWorkFileListUrl,
        data: {
          workId: this.data.workId,
        },
        header: {
          'content-type': 'application/json',
        },
        complete(res) {
          // 回传数据
          resolve(res.data);
        },
      });
    });
    console.log('获取作业文档列表成功', workFileListRes);
    // 若获取成功
    if (workFileListRes.success) {
      // 返回文档列表
      return workFileListRes.data.workFileList;
    } else {
      // 获取失败，返回空数组
      return [];
    }
  },

  /**
   * 获取学生课程下所有作业
   */
  async handleGetMyWorkFileList() {
    let myWorkFileListRes = await new Promise((resolve) => {
      tt.request({
        url: globalData.urlConfig.getMyWorkUrl,
        data: {
          courseId: this.data.courseId,
          studentId: globalData.openId,
        },
        header: {
          'content-type': 'application/json',
        },
        complete(res) {
          resolve(res.data);
        },
      });
    });
    console.log(myWorkFileListRes.data);
    // 获取成功
    if (myWorkFileListRes.success) {
      return myWorkFileListRes.data.workList;
    } else {
      // 获取失败
      return [];
    }
  },

  /**
   * 页面路由
   * @param {Object} e
   */
  pageNavigator(e) {
    // 获取真实 to 参数
    let realTo = switchTo[e.currentTarget.dataset.to]();
    // 更新 to 参数
    e.currentTarget.dataset.to = realTo;
    // 页面路由
    globalFunctions.pageNavigator(e, this.data);
  },

  /**
   * 点击更多按钮
   */
  handleTapMoreBtn() {
    // 获取系统信息
    tt.getSystemInfo({
      success: (res) => {
        console.log(res);
        // 移动端
        if (res.platform === 'ios' || res.platform === 'android') {
          // 调用开放 API 显示菜单
          tt.showActionSheet({
            itemList: this.data.itemList,
            success: (res) => {
              if (res.tapIndex === 0) {
                // 修改作业
                let obj = {
                  currentTarget: {
                    dataset: {
                      to: 'work',
                    },
                  },
                };
                this.pageNavigator(obj);
              } else if (res.tapIndex === 1) {
                // 删除作业
                this.handleDelWork();
              } else {
                //取消
              }
            },
            fail(res) {
              console.log(`showActionSheet failure`);
            },
          });
        } else {
          // PC 端，展示弹出层
          this.setData({
            showPopup: true,
          });
        }
      },
    });
  },

  /**
   * 处理选择更多功能事件
   * @param {Object} e
   */
  handleMoreOption(e) {
    let index = e.currentTarget.dataset.index;
    if (index === 0) {
      // 修改作业信息
      this.setData({
        showPopup: false,
      });
      let obj = {
        currentTarget: {
          dataset: {
            to: 'work',
          },
        },
      };
      this.pageNavigator(obj);
    } else if (index === 1) {
      // 删除作业
      this.setData({
        showPopup: false,
      });
      this.handleDelWork();
    } else {
      // 取消
      this.setData({
        showPopup: false,
      });
    }
  },

  /**
   * 处理删除作业事件
   */
  async handleDelWork() {
    // 用户确认删除
    let confirmRes = await new Promise((resolve) => {
      tt.showModal({
        title: '确认',
        content: `即将删除本次作业的所有文档，是否确定删除作业：${this.data.name}`,
        complete(res) {
          resolve(res);
        },
      });
    });
    // 如果点击确认
    if (confirmRes.confirm) {
      // 显示 Loading
      tt.showLoading({
        title: '请稍候',
      });
      // 发送删除作业请求
      let delWorkRes = await new Promise((resolve) => {
        tt.request({
          url: `${globalData.urlConfig.delWorkUrl}?workId=${this.data.workId}&openId=${globalData.openId}`,
          method: 'DELETE',
          header: {
            'content-type': 'application/json',
          },
          complete(res) {
            resolve(res.data);
          },
        });
      });
      // 如果删除成功
      if (delWorkRes.success) {
        tt.hideLoading();
        tt.showModal({
          title: '成功',
          content: '成功删除作业',
          success() {
            // 点击确认，返回上层
            tt.navigateBack({
              delta: 1,
            });
          },
        });
      } else {
        // 删除失败
        tt.showModal({
          title: '失败',
          content: delWorkRes.message,
        });
      }
    }
  },
});
