import url from './config';

const requests = {
  /**
   * 用户
   */
  // 用户登录
  async login(data) {
    // 发送用户登录请求
    let res = await new Promise((resolve) => {
      tt.request({
        url: url.loginUrl,
        data: {
          code: data.pageData.code,
        },
        header: {
          'content-type': 'application/json',
        },
        complete(res) {
          // 返回数据
          resolve(res.data);
        },
      });
    });
    // 返回数据
    return res;
  },
  // 用户类型
  async getUserType(data) {
    let res = await new Promise((resolve) => {
      tt.request({
        url: url.getUserTypeUrl,
        data: {
          openId: data.pageData.openId,
          courseId: data.pageData.courseId,
        },
        header: {
          'content-type': 'application/json',
        },
        complete(res) {
          resolve(res.data);
        },
      });
    });
    return res;
  },

  /**
   * 课程
   */
  // 课程列表
  async getCourseList(data) {
    // 发送获取课程列表请求
    let res = await new Promise((resolve) => {
      tt.request({
        url: url.getCourseUrl,
        data: {
          openId: data.pageData.openId,
        },
        header: {
          'content-type': 'application/json',
        },
        complete(res) {
          resolve(res.data);
        },
      });
    });
    return res;
  },
  // 添加课程
  async addCourse(data) {
    let res = await new Promise((resolve) => {
      tt.uploadFile({
        url: `${url.addCourseUrl}?managerId=${data.pageData.openId}&term=${data.pageData.term}`,
        header: {
          'content-type': 'multipart/form-data',
        },
        filePath: data.pageData.file,
        name: 'courseExcel',
        complete(res) {
          resolve(res.data);
        },
      });
    });
    return res;
  },
  // 课程成绩
  async getScoreList(data) {
    let res = await new Promise((resolve) => {
      tt.request({
        url: url.getScoreListUrl,
        method: 'POST',
        data: {
          courseId: data.pageData.courseId,
          force: data.pageData.force,
          openId: data.pageData.openId,
        },
        header: {
          'content-type': 'application/json',
        },
        complete(res) {
          resolve(res.data);
        },
      });
    });
    return res;
  },

  /**
   * 作业
   */
  // 发布作业
  async postWorkNew(data) {
    let res = await new Promise((resolve) => {
      tt.request({
        url: url.addWorkUrl,
        method: 'POST',
        data: {
          startTime: data.pageData.startDate + ' 00:00:00',
          expireTime: data.pageData.endDate + ' 23:59:59',
          courseId: data.pageData.courseId,
          weight: parseInt(data.pageData.weight),
          openId: data.pageData.openId,
          workName: data.pageData.name,
          assistantAuth: data.pageData.assistantAuth,
          tag: data.pageData.tag,
        },
        header: {
          'content-type': 'application/json',
        },
        complete(res) {
          resolve(res.data);
        },
      });
    });
    return res;
  },
  // 修改作业信息
  async postWorkModify(data) {
    let res = await new Promise((resolve) => {
      tt.request({
        url: url.modifyWorkUrl,
        method: 'POST',
        data: {
          workId: data.pageData.workId,
          startTime: data.pageData.startDate + ' 00:00:00',
          expireTime: data.pageData.endDate + ' 23:59:59',
          workName: data.pageData.name,
          weight: parseInt(data.pageData.weight),
          courseId: data.pageData.courseId,
          assistantAuth: data.pageData.assistantAuth,
          tag: data.pageData.tag,
        },
        header: {
          'content-type': 'application/json',
        },
        // 回传数据
        complete(res) {
          resolve(res.data);
        },
      });
    });
    return res;
  },
  // 作业打分
  async postGrade(data) {
    let res = await new Promise((resolve) => {
      tt.request({
        url: url.gradeUrl,
        method: 'POST',
        data: {
          comment: data.pageData.remark,
          fileToken: data.pageData.fileToken,
          openId: data.pageData.openId,
          score: parseInt(data.pageData.score),
          courseId: data.pageData.courseId,
        },
        header: {
          'content-type': 'application/json',
        },
        complete(res) {
          resolve(res.data);
        },
      });
    });
    return res;
  },
  // 获取作业文档列表 - 老师
  async getWorkFileList(data) {
    let res = await new Promise((resolve) => {
      // 使用飞书开放 API
      tt.request({
        url: url.getWorkFileListUrl,
        data: {
          workId: data.pageData.workId,
        },
        header: {
          'content-type': 'application/json',
        },
        complete(res) {
          // 回传数据
          resolve(res.data);
        },
      });
    });
    return res;
  },
  // 获取作业文档列表 -学生
  async getMyWorkFileList(data) {
    let res = await new Promise((resolve) => {
      tt.request({
        url: url.getMyWorkUrl,
        data: {
          courseId: data.pageData.courseId,
          studentId: data.pageData.openId,
        },
        header: {
          'content-type': 'application/json',
        },
        complete(res) {
          resolve(res.data);
        },
      });
    });
    return res;
  },
  // 删除作业
  async deleteWork(data) {
    let res = await new Promise((resolve) => {
      tt.request({
        url: `${url.delWorkUrl}?workId=${data.pageData.workId}&openId=${data.pageData.openId}`,
        method: 'DELETE',
        header: {
          'content-type': 'application/json',
        },
        complete(res) {
          resolve(res.data);
        },
      });
    });
    return res;
  },
  // 获取作业列表 - 老师
  async getWorkList(data) {
    let res = await new Promise((resolve) => {
      // 调用飞书 HTTP 能力
      tt.request({
        url: url.getWorkUrl,
        data: {
          courseId: data.pageData.courseId,
          tag: data.pageData.tag,
        },
        header: {
          'content-type': 'application/json',
        },
        // 请求成功，回传数据
        complete(res) {
          resolve(res.data);
        },
      });
    });
    return res;
  },
  // 获取分类列表
  async getTagList(data) {
    let res = await new Promise((resolve) => {
      tt.request({
        url: url.getTagListUrl,
        data: {
          courseId: data.pageData.courseId,
        },
        header: {
          'content-type': 'application/json',
        },
        complete(res) {
          resolve(res.data);
        },
      });
    });
    return res;
  },
  // 获取作业浏览记录
  async getWorkRecord(data) {
    let res = await new Promise((resolve) => {
      tt.request({
        url: url.getWorkRecordUrl,
        data: {
          workId: data.pageData.workId,
        },
        header: {
          'content-type': 'application/json',
        },
        complete(res) {
          resolve(res.data);
        },
      });
    });
    return res;
  },
  // 获取单个作业记录
  async getWorkFileRecord(data) {
    let res = await new Promise((resolve) => {
      tt.request({
        url: url.getWorkFileRecordUrl,
        data: {
          fileToken: data.pageData.fileToken,
        },
        header: {
          'content-type': 'application/json',
        },
        complete(res) {
          resolve(res.data);
        },
      });
    });
    return res;
  },

  /**
   * 签到
   */
  // 未签到名单
  async getUnsignedList(data) {
    // 发送请求获取未签到名单
    let res = await new Promise((resolve) => {
      tt.request({
        url: url.unsignedListUrl,
        data: {
          signId: data.pageData.signId,
        },
        header: {
          'content-type': 'application/json',
        },
        complete(res) {
          resolve(res.data);
        },
      });
    });
    return res;
  },
  // 签到人数
  async getSignedCount(data) {
    // 发送请求获取签到人数
    let res = await new Promise((resolve) => {
      tt.request({
        url: url.signedCountUrl,
        data: {
          signId: data.pageData.signId,
        },
        header: {
          'content-type': 'application/json',
        },
        complete(res) {
          resolve(res.data);
        },
      });
    });
    return res;
  },
  // 获取发布的所有签到
  async getSignList(data) {
    let res = await new Promise((resolve) => {
      tt.request({
        url: url.getAllSignUrl,
        data: {
          courseId: data.pageData.courseId,
        },
        header: {
          'content-type': 'application/json',
        },
        complete(res) {
          // 回传参数
          resolve(res.data);
        },
      });
    });
    return res;
  },
  // 发布签到
  async postNewSign(data) {
    // 发起签到请求
    console.log(data);
    let res = await new Promise((resolve) => {
      tt.request({
        url: url.releaseSignUrl,
        method: 'POST',
        data: {
          courseId: data.pageData.courseId,
          expireTime: data.pageData.endTime,
          latitude: data.pageData.latitude,
          longitude: data.pageData.longitude,
          startTime: data.pageData.startTime,
          teacherId: data.pageData.openId,
        },
        header: {
          'content-type': 'application/json',
        },
        complete(res) {
          resolve(res.data);
        },
      });
    });
    return res;
  },
  // 学生签到
  async postSignIn(data) {
    let res = await new Promise((resolve) => {
      tt.request({
        url: url.signInUrl,
        method: 'POST',
        data: {
          courseId: data.pageData.courseId,
          studentId: data.pageData.openId,
          latitude: data.pageData.latitude,
          longitude: data.pageData.longitude,
        },
        header: {
          'content-type': 'application/json',
        },
        complete(res) {
          resolve(res.data);
        },
      });
    });
    return res;
  },
  // 提前结束签到
  async endSign(data) {
    console.log(data);
    let res = await new Promise((resolve) => {
      tt.request({
        url: url.closeSignUrl + '?signId=' + data.pageData.signId,
        method: 'POST',
        header: {
          'content-type': 'application/json',
        },
        complete(res) {
          resolve(res.data);
        },
      });
    });
    return res;
  },
  async getMySignRecord(data) {
    let res = await new Promise((resolve) => {
      tt.request({
        url: url.signRecordStudent,
        data: {
          courseId: data.pageData.courseId,
          openId: data.pageData.openId,
        },
        header: {
          'content-type': 'application/json',
        },
        complete(res) {
          resolve(res.data);
        },
      });
    });
    return res;
  },

  /**
   * 助教
   */
  // 添加助教
  async addAssistant(data) {
    // 发送添加助教请求
    let res = await new Promise((resolve) => {
      tt.request({
        url: url.addAssistantUrl,
        method: 'POST',
        data: {
          assistantName: data.pageData.assistantName,
          courseId: data.pageData.courseId,
          openId: data.pageData.openId,
          teacherId: data.pageData.teacherId,
        },
        header: {
          'content-type': 'application/json',
        },
        complete(res) {
          resolve(res.data);
        },
      });
    });
    return res;
  },
  // 获取助教列表
  async getAssistantList(data) {
    let res = await new Promise((resolve) => {
      tt.request({
        url: url.getAssistantListUrl,
        data: {
          courseId: data.pageData.courseId,
        },
        header: {
          'content-type': 'application/json',
        },
        complete(res) {
          resolve(res.data);
        },
      });
    });
    return res;
  },

  /**
   * 课件
   */
  // 获取课件浏览记录
  async getCoursewareViewInfo(data) {
    console.log(data);
    let res = await new Promise((resolve) => {
      tt.request({
        url: url.getViewInfoUrl,
        data: {
          fileToken: data.pageData.coursewareToken,
        },
        header: {
          'content-type': 'application/json',
        },
        complete(res) {
          resolve(res.data);
        },
      });
    });
    return res;
  },
};

export default requests;
