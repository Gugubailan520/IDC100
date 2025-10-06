const express = require('express');
const router = express.Router();
const Site = require('../models/site');

// 同行添加页面 - 显示表单
router.get('/add', (req, res) => {
  res.render('admin/add');
});

// 同行添加页面 - 提交表单（支持JSON格式）
router.post('/add', async (req, res) => {
  try {
    // 创建新站点
    const newSite = new Site({
      name: req.body.name,
      id: req.body.id,
      logo: req.body.logo,
      website: req.body.website,
      description: req.body.description,
      contact: {
        qq: req.body.qq,
        name: req.body.contactName
      },
      group: req.body.group,
      images: req.body.images || [] // 已经在前端处理成数组了
    });
    
    await newSite.save();
    
    // 返回JSON响应而不是重定向
    res.json({
      success: true,
      message: '站点添加成功！'
    });
  } catch (err) {
    console.error('添加站点失败:', err);
    
    // 返回错误JSON
    res.status(400).json({
      success: false,
      message: err.message || '添加站点失败'
    });
  }
});

module.exports = router;