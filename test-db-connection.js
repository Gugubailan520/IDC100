const mongoose = require('mongoose');
const yaml = require('js-yaml');
const fs = require('fs');
const dotenv = require('dotenv');

// 加载环境变量
dotenv.config();

// 加载YAML配置
const config = yaml.load(fs.readFileSync('config.yaml', 'utf8'));

// 使用config.yaml中的配置，连接到admin数据库进行身份验证
const authDb = 'admin'; // 使用admin数据库进行身份验证
const mongoUri = `mongodb://${config.database.username}:${config.database.password}@${config.database.host}:${config.database.port}/${authDb}`;

console.log('尝试连接到MongoDB...');
console.log('连接字符串格式:', mongoUri.replace(/:\/\/[^:]+:[^@]+@/, '://[用户名]:[密码]@')); // 不显示实际密码

// 连接MongoDB
try {
    mongoose.connect(mongoUri, config.database.options);
    
    const db = mongoose.connection;
    
    db.on('error', (err) => {
        console.error('MongoDB连接错误:', err);
        process.exit(1);
    });
    
    db.once('open', () => {
        console.log('MongoDB连接成功!');
        // 切换到IDC100数据库
        const idc100Db = db.useDb(config.database.name);
        console.log(`已切换到数据库: ${config.database.name}`);
        
        // 测试查询
        console.log('尝试在IDC100数据库上执行简单查询...');
        
        // 在IDC100数据库上创建一个简单的模型来测试
        const TestModel = idc100Db.model('Test', new mongoose.Schema({}));
        
        TestModel.find({}).limit(1).then(() => {
            console.log('查询成功，数据库访问权限正常!');
            db.close();
        }).catch(err => {
            console.error('查询失败:', err);
            db.close();
        });
    });
} catch (err) {
    console.error('连接过程中发生异常:', err);
    process.exit(1);
}