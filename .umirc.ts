import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    {
      path: '/',
      component: '@/pages/index',
      routes: [
        { path: '/button', component: 'button' },
        { path: '/dialog', component: 'dialog' },
        { path: '/menu', component: 'menu' },
      ],
    },
  ],
});
