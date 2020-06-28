import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { path: '/', component: '@/pages/index' },
    { path: '/button', component: '@/pages/button/index' },
    { path: '/dialog', component: '@/pages/dialog/index' },
  ],
});
