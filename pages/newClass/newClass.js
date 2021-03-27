import { classTimeArray } from './data';
const app = getApp().globalData;

Page({
  /**
   * 页面初始数据
   */
  data: {
    name: '', //班级名称
    time: '', //上课时间
    timeIndex: [0, 0, 0, 0, 0], //上课时间索引
    classTimeArray, //上课时间列表
    startDate: '', //课程开始时间
    endDate: '', //课程结束时间
    chatId: '111',
    chatAvatar: '',
  },

  /**
   * 页面加载生命周期函数
   * @param {Object} options
   */
  onLoad(options) {
    console.log(this.data.classTimeArray);
  },

  /**
   * 处理输入班级名称事件
   * @param {Object} e
   */
  handleInputName(e) {
    this.setData({
      name: e.detail,
    });
  },

  /**
   * 处理选择上课时间事件，只有在点击确定的时候才会触发
   * @param {Object} e
   */
  handleSelectClassTime(e) {
    let time = '';
    // 拼接上课时间字符串
    e.detail.value.forEach((item, index) => {
      if (item !== 0) {
        time +=
          this.data.classTimeArray[index][0] +
          ' ' +
          this.data.classTimeArray[index][item] +
          ', ';
      }
    });
    // 去掉字符串最后的逗号和空格
    time = time
      .split('')
      .slice(0, time.length - 2)
      .join('');
    // 设置上课时间数据
    this.setData({
      time: time,
    });
  },

  /**
   * 处理选择起止日期事件
   * @param {Object} e
   */
  handleSelectDate(e) {
    if (e.currentTarget.dataset.name === 'start') {
      this.setData({
        startDate: e.detail.value + ' 00:00:00',
      });
    } else {
      this.setData({
        endDate: e.detail.value + ' 23:59:59',
      });
    }
  },

  /**
   * 处理选择群聊事件
   * @param {Object} e
   */
  handleSelectChat(e) {
    tt.chooseChat({
      allowCreateGroup: false,
      multiSelect: false,
      selectType: 1,
      confirmTitle: '从群聊创建班级',
      confirmDesc: '请确保班级同学已全部在群聊中',
      success: (res) => {
        console.log(res);
        this.setData({
          chatId: res.data[0].id,
          // chatAvatar: res.data[0].avatarUrls[0],
        });
        // tt.getChatInfo({
        //   openChatId: this.data.chatId,
        //   type: 1,
        //   success: (res) => {
        //     this.setData({
        //       chatAvatar: res.data[0].avatarUrls[0],
        //     });
        //   },
        // });
      },
      fail(res) {
        console.log(`chooseChat failure`);
      },
    });
  },

  /**
   *
   * 处理新建班级事件
   */
  handleNewClass() {
    console.log(this.data.name);
    console.log(this.data.time);
    console.log(this.data.startDate);
    console.log(this.data.endDate);
    console.log(this.data.chatId);
    if (
      this.data.name !== '' &&
      this.data.time !== '' &&
      this.data.startDate !== '' &&
      this.data.endDate !== '' &&
      this.data.chatId !== ''
    ) {
      tt.showToast({
        title: '创建中',
        icon: 'loading',
      });
      tt.request({
        url: app.urlConfig.newClassUrl,
        method: 'POST',
        data: {
          chatId: this.data.chatId,
          classTime: this.data.time,
          coverUrl: 'https://pic.chinaz.com/picmap/201907191721549523_0.jpg',
          startTime: this.data.startDate,
          expireTime: this.data.endDate,
          groupName: this.data.name,
          teacherId: app.openId,
        },
        header: {
          'content-type': 'application/json',
        },
        success: (res) => {
          console.log(res);
          if (res.data.data.success) {
            tt.showModal({
              title: '成功',
              content: '创建新班级成功',
              success(res) {
                tt.navigateBack({
                  delta: 1,
                });
              },
            });
          } else {
            tt.showModal({
              title: '失败',
              content: '创建新班级失败，请联系开发者反馈问题！',
              success(res) {
                tt.navigateBack({
                  delta: 1,
                });
              },
            });
          }
        },
        fail(res) {
          console.log('创建新班级失败');
        },
      });
    } else {
      tt.showModal({
        title: '失败',
        content: '请完善课程信息！',
      });
    }
  },
});
