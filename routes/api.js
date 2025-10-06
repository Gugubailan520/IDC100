const express = require('express');
const router = express.Router();
const Site = require('../models/site');

// 共享API - 随机返回JSON数据
router.get('/random', async (req, res) => {
  try {
    const count = await Site.countDocuments();
    if (count === 0) {
      return res.json({ status: 'error', message: '暂无站点数据' });
    }
    
    const randomIndex = Math.floor(Math.random() * count);
    const randomSite = await Site.findOne().skip(randomIndex);
    
    res.json({
      status: 'success',
      data: randomSite
    });
  } catch (err) {
    console.error(err);
    res.json({ status: 'error', message: '获取随机站点失败' });
  }
});

// 共享API - 指定ID返回详细信息
router.get('/site/:id', async (req, res) => {
  try {
    const site = await Site.findOne({ id: req.params.id });
    if (!site) {
      return res.json({ status: 'error', message: '站点不存在' });
    }
    
    res.json({
      status: 'success',
      data: site
    });
  } catch (err) {
    console.error(err);
    res.json({ status: 'error', message: '获取站点详情失败' });
  }
});

module.exports = router;