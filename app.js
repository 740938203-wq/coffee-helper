App({
  globalData: {
    userInfo: null,
    isLoggedIn: false,
    isTeacherLoggedIn: false,
    teacherPassword: 'teacher123',
    currentStudent: null,
    students: [
      { id: 1, name: '小明', level: 2, totalTrained: 45, successRate: 72, avgTime: '14分钟', trend: '↑', consecutiveDays: 5 },
      { id: 2, name: '小红', level: 3, totalTrained: 62, successRate: 85, avgTime: '11分钟', trend: '↑', consecutiveDays: 8 },
      { id: 3, name: '小华', level: 1, totalTrained: 28, successRate: 45, avgTime: '18分钟', trend: '→', consecutiveDays: 3 },
      { id: 4, name: '小丽', level: 4, totalTrained: 78, successRate: 92, avgTime: '10分钟', trend: '↑', consecutiveDays: 12 },
      { id: 5, name: '小刚', level: 2, totalTrained: 35, successRate: 68, avgTime: '15分钟', trend: '↑', consecutiveDays: 7 }
    ]
  },

  onLaunch() {
    if (wx.cloud) {
      wx.cloud.init({
        env: 'your-env-id'
      });
    }
    this.checkLoginStatus();
    this.initLocalData();
  },

  checkLoginStatus() {
    const userInfo = wx.getStorageSync('userInfo');
    if (userInfo) {
      this.globalData.userInfo = userInfo;
      this.globalData.isLoggedIn = true;
    }
    const isTeacherLoggedIn = wx.getStorageSync('isTeacherLoggedIn');
    if (isTeacherLoggedIn) {
      this.globalData.isTeacherLoggedIn = true;
    }
  },

  initLocalData() {
    const trainingRecords = wx.getStorageSync('trainingRecords');
    if (!trainingRecords) {
      wx.setStorageSync('trainingRecords', []);
    }
    const interventionRecords = wx.getStorageSync('interventionRecords');
    if (!interventionRecords) {
      wx.setStorageSync('interventionRecords', []);
    }
  },

  login(userInfo) {
    return new Promise((resolve, reject) => {
      wx.setStorageSync('userInfo', userInfo);
      this.globalData.userInfo = userInfo;
      this.globalData.isLoggedIn = true;
      resolve(userInfo);
    });
  },

  logout() {
    wx.removeStorageSync('userInfo');
    this.globalData.userInfo = null;
    this.globalData.isLoggedIn = false;
  },

  teacherLogin(password) {
    if (password === this.globalData.teacherPassword) {
      wx.setStorageSync('isTeacherLoggedIn', true);
      this.globalData.isTeacherLoggedIn = true;
      return true;
    }
    return false;
  },

  teacherLogout() {
    wx.removeStorageSync('isTeacherLoggedIn');
    this.globalData.isTeacherLoggedIn = false;
  },

  saveTrainingRecord(record) {
    const records = wx.getStorageSync('trainingRecords') || [];
    records.push({
      ...record,
      id: Date.now(),
      timestamp: new Date().toISOString()
    });
    wx.setStorageSync('trainingRecords', records);
    return records;
  },

  getTrainingRecords(studentId) {
    const records = wx.getStorageSync('trainingRecords') || [];
    if (studentId) {
      return records.filter(r => r.studentId === studentId);
    }
    return records;
  },

  saveIntervention(intervention) {
    const records = wx.getStorageSync('interventionRecords') || [];
    records.push({
      ...intervention,
      id: Date.now(),
      timestamp: new Date().toISOString()
    });
    wx.setStorageSync('interventionRecords', records);
    return records;
  },

  getInterventions(studentId) {
    const records = wx.getStorageSync('interventionRecords') || [];
    if (studentId) {
      return records.filter(r => r.studentId === studentId);
    }
    return records;
  }
})