// 双语支持
import translate from '../../public/translate/index';
const _ = translate._;

Component({
  /**
   * 组件初始数据
   */
  properties: {
    emptyMessage: {
      type: String,
      value: '',
    },
  },

  // // 动态加载组件数据
  // attached() {
  //   if (this.properties.emptyMessage === '') {
  //     this.setData({
  //       emptyMessage: _('页面空空如也'),
  //     });
  //   }
  // },
});
