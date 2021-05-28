// 双语支持
import translate from '../../public/translate/index';
const _ = translate._;

Component({
  /**
   * 组件初始参数
   */
  properties: {
    height: {
      type: String,
      value: 'regular',
    },
    icon: {
      type: String,
      value: '',
    },
    title: {
      type: String,
      value: '',
    },
    value: {
      type: String,
      value: '',
    },
    action: {
      type: String,
      value: '',
    },
    type: {
      type: String,
      value: 'default',
    },
    color: {
      type: String,
      value: '',
    },
  },

  /**
   * 组件方法
   */
  methods: {
    handleMoreOptions(e) {
      console.log(e);
      tt.showActionSheet({
        itemList: [_('修改作业信息'), _('删除作业')],
        success: (res) => {
          this.triggerEvent('tapmore', res.tapIndex);
        },
        fail(res) {
          console.log(`showActionSheet failure`);
        },
      });
    },
  },
});
