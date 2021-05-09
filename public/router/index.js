const routes = {
  // 助教管理页面
  assistant(data) {
    tt.navigateTo({
      url: `/pages/assistant/assistant?courseId=${data.pageData.courseId}`,
    });
  },

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

  // 签到信息
  signInfo(data) {
    /**
     * signId - 通过 signId 获取某次签到的信息
     */
    tt.navigateTo({
      url: `/pages/sign/info/info?signId=${data.signId}`,
    });
  },

  // 发布签到页面
  signNew(data) {
    /**
     * courseId - 向指定课程下添加签到任务
     */
    tt.navigateTo({
      url: `/pages/sign/new/new?courseId=${data.pageData.courseId}`,
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

  // 发布作业
  workNew(data) {
    /**
     * courseId - 在某个课程之下发布新的作业
     */
    tt.navigateTo({
      url: `/pages/work/new/new?courseId=${data.pageData.courseId}&option=new`,
    });
  },

  // 作业文档列表 - 老师
  workFileListTeacher(data) {
    tt.navigateTo({
      url: `/pages/work/file/list/list?workId=${data.workId}&startDate=${data.startTime}&endDate=${data.expireTime}&weight=${data.weight}&name=${data.workName}&courseId=${data.pageData.courseId}`,
    });
  },

  // 作业文档列表 - 助教
  workFileListAssistant(data) {
    if (data.assistantAuth) {
      // 如果助教可评阅
      tt.navigateTo({
        url: `/pages/work/file/list/list?workId=${data.workId}&startDate=${data.startTime}&endDate=${data.expireTime}&weight=${data.weight}&name=${data.workName}&courseId=${data.pageData.courseId}`,
      });
    } else {
      // 提示没有评阅权限
      tt.showModal({
        title: '提示',
        content: '暂无本次作业评阅权限',
      });
    }
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

  // 打开作业文档 - 老师
  openWorkFileTeacher(data) {
    /**
     * fileToken - 用于打开作业文档
     */
    tt.openSchema({
      schema: 'https://uestc.feishu.cn/docs/' + data.pageData.fileToken,
      external: false,
    });
  },

  // 打开作业文档 - 学生
  openWorkFileStudent(data) {
    tt.openSchema({
      schema: 'https://uestc.feishu.cn/docs/' + data.fileToken,
      external: false,
    });
  },

  // 作业打分页面
  workFileGrade(data) {
    /**
     * fileToken - 指定打分作业
     * fileName - 作业名称
     * comment - 老师评语
     * score - 作业得分
     */
    tt.navigateTo({
      url: `/pages/work/file/grade/grade?fileToken=${data.fileToken}&fileName=${data.fileName}&comment=${data.comment}&score=${data.score}`,
    });
  },

  // 修改作业信息
  workModify(data) {
    tt.navigateTo({
      /**
       * option - 页面操作类型，新建 or 修改
       * startDate - 作业开始日期
       * endDate - 作业截至日期
       * name - 作业名称
       * weight - 作业权重
       * workId - 作业 ID 值
       * courseId - 课程 ID 值
       */
      url: `/pages/work/new/new?option=modify&startDate=${data.pageData.startDate}&endDate=${data.pageData.endDate}&name=${data.pageData.name}&weight=${data.pageData.weight}&workId=${data.pageData.workId}&courseId=${data.pageData.courseId}`,
    });
  },
};

module.exports = routes;
