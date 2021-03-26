Component({
  /**
   * 组件参数
   */
  properties: {
    type: {
      type: 'String',
      value: 'default',
    },
    label: {
      type: String,
      value: '',
      required: true,
    },
    value: {
      type: String,
      value: '',
    },
    placeholder: {
      type: String,
      value: '',
    },
  },

  /**
   * 组件内部方法
   */
  methods: {
    handleInput(e) {
      this.triggerEvent('input', e.detail.value);
    },
  },
});
