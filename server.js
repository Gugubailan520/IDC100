const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const yaml = require('js-yaml');
const fs = require('fs');
// 加载环境变量
require('dotenv').config();

// 加载YAML配置
const config = yaml.load(fs.readFileSync('config.yaml', 'utf8'));

// 创建Express应用
const app = express();

// 设置模板引擎
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// 静态文件中间件
app.use(express.static(path.join(__dirname, 'public')));

// 解析JSON和URL编码的请求体
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 使用admin数据库进行身份验证，然后切换到IDC100数据库
const authDb = 'admin';
const mongoUri = `mongodb://${config.database.username}:${config.database.password}@${config.database.host}:${config.database.port}/${authDb}`;

// 连接MongoDB并使用admin数据库进行身份验证
mongoose.connect(mongoUri, config.database.options).then(() => {
    console.log('MongoDB连接成功');
    // 切换到IDC100数据库
    mongoose.connection.useDb(config.database.name);
    console.log(`已切换到数据库: ${config.database.name}`);
}).catch(err => {
    console.error('MongoDB连接失败:', err);
    process.exit(1);
});

// 导入路由
const indexRoute = require('./routes/index');
const adminRoute = require('./routes/admin');
const apiRoute = require('./routes/api');

// 使用路由
app.use('/', indexRoute);
app.use('/admin', adminRoute);
app.use('/api', apiRoute);

// 启动服务器
const PORT = config.server.port || 3000;
app.listen(PORT, () => {
  console.log(`服务器运行在 http://localhost:${PORT}`);
});