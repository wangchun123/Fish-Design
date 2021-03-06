import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  title: 'hi',
  favicon:
    'https://img.alicdn.com/tps/TB19O79MVXXXXcZXVXXXXXXXXXX-1024-1024.jpg',
  routes: [
    {
      path: '/',
      component: '@/pages/index',
      routes: [
        { path: '/', component: 'button', title: 'button' },
        { path: '/button', component: 'button', title: 'button' },
        { path: '/dialog', component: 'dialog', title: 'dialog' },
        { path: '/menu', component: 'menu', title: 'menu' },
        { path: '/loading', component: 'loading', title: 'loading' },
        { path: '/message', component: 'message', title: 'message' },
        { path: '/axios-test', component: 'axios-test', title: 'axios-test' },
        { path: '/carousel', component: 'carousel', title: 'carousel' },
      ],
    },
  ],
});
