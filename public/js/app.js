// Vue应用初始化
const { createApp } = Vue;

// 创建Vue应用实例
function createIdcApp() {
  const app = createApp({
    data() {
      return {
        message: '欢迎使用IDC百站计划',
        sites: [],
        loading: false
      };
    },
    methods: {
      // 加载站点数据
      async loadSites() {
        this.loading = true;
        try {
          const response = await fetch('/api/sites');
          this.sites = await response.json();
        } catch (error) {
          console.error('加载站点数据失败:', error);
          window.ElementPlus.ElMessage.error('加载站点数据失败');
        } finally {
          this.loading = false;
        }
      },
      // 随机获取一个站点
      async getRandomSite() {
        try {
          const response = await fetch('/api/random');
          const site = await response.json();
          if (site) {
            window.location.href = `/site/${site.id}`;
          }
        } catch (error) {
          console.error('获取随机站点失败:', error);
          window.ElementPlus.ElMessage.error('获取随机站点失败');
        }
      }
    },
    mounted() {
      // 注册Element Plus的全局属性
      this.$message = window.ElementPlus.ElMessage;
      this.$notification = window.ElementPlus.ElNotification;
      this.$confirm = window.ElementPlus.ElMessageBox.confirm;
    }
  });

  // 使用Element Plus插件
  app.use(ElementPlus);
  
  return app;
}

// 注意：首页的应用创建和挂载在index.ejs文件中处理