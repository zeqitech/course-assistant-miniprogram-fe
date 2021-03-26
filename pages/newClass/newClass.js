import { classTimeArray } from './data';

Page({
  /**
   * 页面初始数据
   */
  data: {
    name: '', //班级名称
    time: '', //上课时间
    timeIndex: [0, 0, 0, 0, 0], //上课时间索引
    classTimeArray,
  },

  /**
   * 页面加载生命周期函数
   * @param {Object} options
   */
  onLoad(options) {
    console.log(this.data.classTimeArray);
  },

  handleSelectClassTime(e) {
    console.log(e);
  },
});
