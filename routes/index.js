const express = require('express');
const router = express.Router();
const Site = require('../models/site');

// 首页 - 显示所有站点
router.get('/', async (req, res) => {
  try {
    const sites = await Site.find().sort({ createdAt: -1 });
    // 传递空的message对象，避免模板中引用未定义的变量
    res.render('index', { sites, message: null });
  } catch (err) {
    console.error(err);
    res.render('error', { message: '获取站点列表失败' });
  }
});

// 详情页 - 显示单个站点的详细信息
router.get('/site/:id', async (req, res) => {
  try {
    const site = await Site.findOne({ id: req.params.id });
    if (!site) {
      return res.render('error', { message: '站点不存在' });
    }
    res.render('site-detail', { site });
  } catch (err) {
    console.error(err);
    res.render('error', { message: '获取站点详情失败' });
  }
});

module.exports = router;