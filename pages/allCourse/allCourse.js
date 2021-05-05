const app = getApp().globalData;

Page({
  /**
   * 页面初始数据
   */
  data: {
    filter: '',
    expireStatus: false,
    courseList: [],
    nowEmpty: true,
    pastEmpty: true,
  },

  /**
   * 页面加载生命周期函数
   * @param {Object} options
   */
  onLoad(options) {
    console.log('-----------------all class-----------------');
    console.log(options);
    console.log('-------------------------------------------');
    this.setData({
      filter: options.filter,
      expireStatus: options.filter === 'now' ? false : true,
      courseList: app.courseList,
      nowEmpty: options.nowEmpty === 'true' ? true : false,
      pastEmpty: options.pastEmpty === 'true' ? true : false,
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
  navToCourse(e) {
    console.log(e);
    tt.navigateTo({
      url: `/pages/course/course?courseId=${e.currentTarget.dataset.courseId}&cover=${e.currentTarget.dataset.cover}`,
    });
  },
});