# 心青年咖啡助手 - 微信小程序部署指南

## 📋 项目概述

心青年咖啡助手微信小程序版本，基于原有的HTML5版本重构，提供更流畅的移动端体验和更好的系统集成能力。

---

## 📁 项目结构

```
weapp/
├── app.js              # 全局逻辑
├── app.json            # 全局配置
├── app.wxss            # 全局样式
├── project.config.json # 项目配置
├── sitemap.json        # 站点地图
├── assets/            # 静态资源
│   └── icons/        # 图标资源
└── pages/            # 页面文件
    ├── index/        # 首页
    ├── sceneSelect/  # 场景选择
    ├── levelSelect/  # 等级选择
    ├── steps/        # 步骤学习（核心页面）
    ├── complete/     # 完成页面
    ├── assessment/   # 能力评估
    ├── teacher/      # 老师端
    ├── dashboard/   # 数据看板
    ├── liquidDetection/ # 液位检测
    └── login/       # 登录页面
```

---

## 🚀 注册微信小程序账号

### 步骤1：注册账号

1. 访问 [微信公众平台](https://mp.weixin.qq.com/)
2. 点击"立即注册"
3. 选择"小程序"
4. 填写信息完成注册

### 步骤2：获取AppID

1. 登录微信公众平台
2. 进入"开发" -> "开发管理"
3. 获取你的 AppID

### 步骤3：配置项目

1. 打开 `project.config.json`
2. 将 `"YOUR_APPID"` 替换为你的真实 AppID

---

## 🛠️ 开发环境配置

### 1. 下载微信开发者工具

1. 访问 [微信开发者工具下载](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html)
2. 下载并安装最新版本

### 2. 导入项目

1. 打开微信开发者工具
2. 点击"导入项目"
3. 选择项目目录（`weapp/` 文件夹）
4. 填入 AppID
5. 点击"确定"

### 3. 添加图标资源

在 `weapp/assets/icons/` 目录下添加以下图标：
- `home.png` / `home-active.png` - 首页图标
- `teacher.png` / `teacher-active.png` - 老师端图标
- `data.png` / `data-active.png` - 数据看板图标
- `default-avatar.png` - 默认头像

---

## 📱 功能模块

### 学员端功能
- ✅ 首页（项目介绍、使用提醒）
- ✅ 初始能力评估量表
- ✅ 场景选择（训练前准备、美式咖啡制作）
- ✅ L1-L5等级选择
- ✅ 16步美式咖啡制作流程
- ✅ 步骤详情（时间、工具、风险、质量标准、预防措施）
- ✅ 语音播放（🔊 听语音、再听一遍）
- ✅ 安全提醒（高风险步骤警示）
- ✅ 语音快捷按钮（噪音环境备选）
- ✅ 老师干预记录
- ✅ 3分钟超时提醒
- ✅ 步骤跳过/回退
- ✅ 训练完成总结

### 老师端功能
- ✅ 学员列表管理
- ✅ 等级设置与调整
- ✅ 干预记录查看
- ✅ 训练建议（升级/降级）

### 数据看板功能
- ✅ 训练统计概览
- ✅ 训练趋势图
- ✅ 常错步骤排行
- ✅ L1-L5等级分布
- ✅ 近期训练记录

---

## 🔧 配置说明

### 语音功能配置

当前版本使用百度TTS API，如需更换请修改 `pages/steps/steps.js` 中的 `speakText` 方法。

**百度TTS API（免费使用）：**
```javascript
// 已配置，无需额外申请
```

如需使用其他语音服务（如腾讯云、阿里云），请替换相应的API地址和参数。

### 数据存储

当前版本使用本地存储（`wx.setStorageSync`），如需云端同步可配置微信云开发。

---

## 📝 页面配置说明

### 页面注册顺序

确保 `app.json` 中的页面顺序正确：

```json
{
  "pages": [
    "pages/index/index",
    "pages/sceneSelect/sceneSelect",
    "pages/levelSelect/levelSelect",
    "pages/steps/steps",
    "pages/complete/complete",
    "pages/assessment/assessment",
    "pages/teacher/teacher",
    "pages/dashboard/dashboard",
    "pages/liquidDetection/liquidDetection",
    "pages/login/login"
  ]
}
```

### TabBar 配置

确保 `app.json` 中的 tabBar 配置正确，图标路径需存在。

---

## 🐛 常见问题

### Q: 语音播放失败？
A: 检查网络连接，或替换为其他TTS服务。

### Q: 图标显示异常？
A: 确保 `assets/icons/` 目录下有对应的图标文件。

### Q: 页面空白？
A: 检查 `app.json` 页面路径是否正确，确保每个页面目录下有4个文件（.wxml, .js, .wxss, .json）。

---

## 📦 发布流程

### 1. 开发调试

1. 使用微信开发者工具进行调试
2. 确认所有功能正常运行

### 2. 代码检查

1. 点击"工具" -> "构建npm"（如使用）
2. 点击"工具" -> "代码检查"

### 3. 提交审核

1. 点击"上传"
2. 填写版本号和备注
3. 登录微信公众平台
4. 进入"版本管理"
5. 提交审核

### 4. 发布上线

审核通过后，点击"发布"即可上线。

---

## 🔐 隐私与安全

- 不采集敏感个人信息
- 数据仅存储在本地
- 语音数据通过HTTPS传输
- 学员案例展示必须匿名化

---

## 📞 技术支持

如有问题，请联系开发团队。

---

**版本**：v1.0
**日期**：2026年5月
**适用范围**：大连爱纳孤独症障碍者综合服务中心
