const routes = {
  // 添加课程页面
  courseAdd() {
    tt.navigateTo({
      url: '/pages/course/add/add',
    });
  },

  // 课程列表页面
  courseAll(data) {
    /**
     * filter - 过滤当前课程或往期课程
     * nowEmpty - 当前课程是否为空
     * pastEmpty - 往期课程是否为空
     */
    tt.navigateTo({
      url: `/pages/course/all/all?filter=${data.filter}&nowEmpty=${data.pageData.nowEmpty}&pastEmpty=${data.pageData.pastEmpty}`,
    });
  },

  // 课程功能页面
  courseIndex(data) {
    /**
     * courseId - 课程 ID，用于获取课程信息
     * cover - 课程封面图片地址
     * coursewareToken - 课件文档 Token
     */
    tt.navigateTo({
      url: `/pages/course/index/index?courseId=${data.courseId}&cover=${data.cover}&coursewareToken=${data.coursewareToken}`,
    });
  },

  // 打开课件文档
  courseware(data) {
    /**
     * coursewareToken - 课件 Token，用于打开课件文档
     */
    tt.openSchema({
      schema: 'https://uestc.feishu.cn/docs/' + data.pageData.coursewareToken,
      external: false,
    });
  },

  // 签到列表页面
  signList(data) {
    /**
     * courseId - 课程 ID，用于获取签到列表
     */
    tt.navigateTo({
      url: `/pages/sign/list/list?courseId=${data.pageData.courseId}`,
    });
  },

  // 签到页面
  signIn(data) {
    /**
     * courseId - 课程 ID，用于确定签到课程
     */
    tt.navigateTo({
      url: `/pages/sign/signIn/signIn?courseId=${data.pageData.courseId}`,
    });
  },

  // 作业列表
  workList(data) {
    /**
     * courseId - 通过课程 ID 获取该课程下所有作业
     */
    tt.navigateTo({
      url: `/pages/work/list/list?courseId=${data.pageData.courseId}`,
    });
  },

  // 作业文档列表 - 学生
  workFileListStudent(data) {
    /**
     * courseId - 通过课程 ID 获取学生在该课程下所有作业文档
     */
    tt.navigateTo({
      url: `/pages/work/file/list/list?courseId=${data.pageData.courseId}`,
    });
  },
};

module.exports = routes;
