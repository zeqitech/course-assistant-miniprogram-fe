// 双语支持
import translate from '../../public/translate/index';
const _ = translate._;

Component({
  /**
   * 组件初始数据
   */
  data: {},

  // 动态加载组件数据
  attached() {
    this.setData({
      emptyMessage: _('页面空空如也'),
    });
  },
});
