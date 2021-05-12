function getLanguage() {
  //返回缓存中的language属性 (en / zh_CN)
  return tt.getStorageSync('language') || 'zh_CN';
}

function translate() {
  //返回翻译的对照信息

  return require('./i18n/' + getLanguage() + '.js').languageMap;
}

function translateTxt(desc) {
  //翻译
  return translate()[desc] || '竟然没有翻译';
}

module.exports = {
  getLanguage: getLanguage,
  _t: translate,
  _: translateTxt,
};
