const mongoose = require('mongoose');
const yaml = require('js-yaml');
const fs = require('fs');
const Site = require('./models/site');

// 加载YAML配置
const config = yaml.load(fs.readFileSync('config.yaml', 'utf8'));

// 连接MongoDB数据库
const { database } = config;
const mongoUri = `mongodb://${database.username}:${database.password}@${database.host}:${database.port}/${database.name}`;

mongoose.connect(mongoUri, database.options)
  .then(() => console.log('MongoDB连接成功'))
  .catch(err => console.error('MongoDB连接失败:', err));

// 模拟数据
const sampleSites = [
  {
    name: '阿里云',
    id: 'aliyun',
    logo: 'https://img.alicdn.com/tfs/TB1YHEpwUT1gK0jSZFhXXaAtVXa-28-27.svg',
    website: 'https://www.aliyun.com',
    description: '阿里云是全球领先的云计算及人工智能科技公司，致力于以在线公共服务的方式，提供安全、可靠的计算和数据处理能力，让计算和人工智能成为普惠科技。',
    contact: {
      qq: '800180188',
      name: '阿里云客服'
    },
    group: '阿里云官方交流群：123456789',
    images: [
      'https://img.alicdn.com/tfs/TB1G64epE67gK0jSZPfXXahhFXa-1426-685.jpg',
      'https://img.alicdn.com/tfs/TB1YHEpwUT1gK0jSZFhXXaAtVXa-28-27.svg'
    ]
  },
  {
    name: '腾讯云',
    id: 'tencentcloud',
    logo: 'https://imgcache.qq.com/open_proj/proj_qcloud_v2/gateway/portal/css/img/qcloud_logo.png',
    website: 'https://cloud.tencent.com',
    description: '腾讯云是腾讯集团旗下的云计算品牌，提供全球领先的云计算、大数据、人工智能等技术和服务，助力企业数字化转型。',
    contact: {
      qq: '8008208388',
      name: '腾讯云客服'
    },
    group: '腾讯云官方交流群：987654321',
    images: [
      'https://imgcache.qq.com/open_proj/proj_qcloud_v2/gateway/portal/img/banner/bg_202104281523.jpg',
      'https://imgcache.qq.com/open_proj/proj_qcloud_v2/gateway/portal/css/img/qcloud_logo.png'
    ]
  },
  {
    name: '华为云',
    id: 'huaweicloud',
    logo: 'https://res-static.hc-cdn.cn/cloudbu-site/china/zh-cn/resource/20210730/091543f6715a42f1929a6e3917c14f35.png',
    website: 'https://www.huaweicloud.com',
    description: '华为云是华为公司提供的云服务平台，提供弹性云服务器、云数据库、云存储等多种云服务，为企业提供稳定可靠、安全可信、可持续创新的云服务。',
    contact: {
      qq: '4000955988',
      name: '华为云客服'
    },
    group: '华为云官方交流群：555666777',
    images: [
      'https://res-static.hc-cdn.cn/cloudbu-site/china/zh-cn/resource/20210611/c5e06c72b84a4ae98e296c5a17801813.jpg',
      'https://res-static.hc-cdn.cn/cloudbu-site/china/zh-cn/resource/20210730/091543f6715a42f1929a6e3917c14f35.png'
    ]
  },
  {
    name: '百度智能云',
    id: 'baiducloud',
    logo: 'https://cloud.baidu.com/static/images/new-logo.png',
    website: 'https://cloud.baidu.com',
    description: '百度智能云是百度公司旗下的云计算平台，依托百度在人工智能领域的技术积累，提供AI、云计算、大数据等全方位的技术服务。',
    contact: {
      qq: '4008008888',
      name: '百度智能云客服'
    },
    group: '百度智能云官方交流群：333444555',
    images: [
      'https://cloud.baidu.com/static/images/homepage/banner/banner-bg.png',
      'https://cloud.baidu.com/static/images/new-logo.png'
    ]
  }
];

// 导入数据
const importData = async () => {
  try {
    await Site.deleteMany();
    await Site.insertMany(sampleSites);
    console.log('模拟数据导入成功');
    mongoose.connection.close();
  } catch (error) {
    console.error('模拟数据导入失败:', error);
    mongoose.connection.close();
  }
};

importData();