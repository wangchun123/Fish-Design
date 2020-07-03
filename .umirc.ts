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
        { path: '/', component: 'button' },
        { path: '/button', component: 'button' },
        { path: '/dialog', component: 'dialog' },
        { path: '/menu', component: 'menu' },
      ],
    },
  ],
});
