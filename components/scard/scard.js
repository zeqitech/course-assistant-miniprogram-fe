// 双语支持
import translate from '../../public/translate/index';

Component({
  /**
   * 组件初始数据
   */
  properties: {
    cover: {
      type: String,
      value: '',
    },
    title: {
      type: String,
      value: '',
    },
    time: {
      type: String,
      value: '',
    },
    member: {
      type: String,
      value: '0',
    },
    state: {
      type: String,
      value: '',
    },
  },
  data: {
    _t: translate._t(),
  },
});
