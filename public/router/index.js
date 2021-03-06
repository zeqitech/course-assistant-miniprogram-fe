import translate from '../translate/index';
const _ = translate._;

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
      url: `/pages/course/index/index?courseId=${data.courseId}&cover=${data.cover}&coursewareToken=${data.coursewareToken}&courseName=${data.courseName}`,
    });
  },

  // 打开课件文档
  coursewareFile(data) {
    /**
     * coursewareToken - 课件 Token，用于打开课件文档
     */
    tt.openSchema({
      schema: 'https://uestc.feishu.cn/docs/' + data.pageData.coursewareToken,
      external: false,
    });
  },

  // 课件页面
  courseware(data) {
    /**
     * couresewareToken - 课件 Token
     * openId - 用户 openId
     */
    tt.navigateTo({
      url: `/pages/courseware/index/index?coursewareToken=${data.pageData.coursewareToken}`,
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
      url: `/pages/sign/info/info?signId=${data.signId}&expireStatus=${data.expireStatus}`,
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
      url: `/pages/work/file/list/list?workId=${data.workId}`,
    });
  },

  // 作业文档列表 - 助教
  workFileListAssistant(data) {
    if (data.assistantAuth) {
      // 如果助教可评阅
      tt.navigateTo({
        url: `/pages/work/file/list/list?workId=${data.workId}&courseId=${data.pageData.courseId}`,
      });
    } else {
      // 提示没有评阅权限
      tt.showModal({
        title: _('提示'),
        content: _('暂无本次作业评阅权限'),
        confirmText: _('确认'),
        cancelText: _('取消'),
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
      url: `/pages/work/file/grade/grade?fileToken=${data.fileToken}&fileName=${data.fileName}&score=${data.score}&courseId=${data.pageData.courseId}`,
    });
  },

  // 修改作业信息
  workModify(data) {
    tt.navigateTo({
      /**
       * option - 页面操作类型，新建 or 修改
       * endTime - 作业截止时刻
       * endDate - 作业截至日期
       * name - 作业名称
       * weight - 作业权重
       * workId - 作业 ID 值
       * courseId - 课程 ID 值
       */
      url: `/pages/work/new/new?option=modify&endDate=${data.expireTime}&name=${data.workName}&weight=${data.weight}&workId=${data.workId}&courseId=${data.pageData.courseId}&assistantAuth=${data.assistantAuth}&tag=${data.tag}&url=${data.url}`,
    });
  },

  // 课程成绩页面
  scoreStatistics(data) {
    tt.navigateTo({
      url: `/pages/score/index/index?courseId=${data.pageData.courseId}`,
    });
  },

  // 作业情况统计
  workFileInfo(data) {
    tt.navigateTo({
      url: `/pages/work/file/info/info?workId=${data.pageData.workId}`,
    });
  },

  // 课堂测试功能开发中，暂时使用飞书问卷
  test() {
    tt.openSchema({
      schema: 'https://wenjuan.feishu.cn/project/',
      external: false,
    });
  },

  // 问题反馈
  feedback() {
    tt.openSchema({
      schema:
        'https://applink.feishu.cn/client/helpdesk/open?id=6959197447251820547&extra=%7B%22channel%22%3A1%2C%22created_at%22%3A1622461617%7D',
      external: false,
    });
  },
};

module.exports = routes;
