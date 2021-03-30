Page({
  /**
   * 页面初始数据
   */
  data: {
    filter: '',
    expireStatus: false,
    classArray: [],
    nowEmpty: true,
    pastEmpty: true,
  },

  /**
   * 页面加载生命周期函数
   * @param {Object} options
   */
  onLoad(options) {
    console.log(this.data.expireStatus);
    console.log('-----------------all class-----------------');
    console.log(options);
    console.log('-------------------------------------------');
    this.setData({
      filter: options.filter,
      expireStatus: options.filter === 'now' ? false : true,
      classArray: JSON.parse(options.classArray),
      nowEmpty: JSON.parse(options.nowEmpty),
      pastEmpty: JSON.parse(options.pastEmpty),
    });
    if (options.filter === 'now') {
      tt.setNavigationBarTitle({
        title: '当前课程列表',
      });
    } else if (options.filter === 'past') {
      tt.setNavigationBarTitle({
        title: '往期课程列表',
      });
    }
  },

  /**
   * 跳转到班级功能页面
   * @param {Object} e
   */
  navToClass(e) {
    console.log(e);
    tt.navigateTo({
      url: `/pages/class/class?token=${e.currentTarget.dataset.token}&chatId=${e.currentTarget.dataset.chatId}&cover=${e.currentTarget.dataset.cover}`,
    });
  },
});
