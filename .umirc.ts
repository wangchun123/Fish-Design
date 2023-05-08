import { defineConfig } from 'umi';

export default defineConfig({
  // 改变路由hash解决服务端刷新页面404
  history: {
    type: 'hash',
  },
  // webpack 会在静态文件路径前加 publicPath 的值
  publicPath: './',
  nodeModulesTransform: {
    type: 'none',
  },
  title: '见光就死123',
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
        { path: '/editForm', component: 'editForm', title: 'editForm' },
        { path: '/editTable', component: 'editTable', title: 'editTable' },
        { path: '/g6Tree', component: 'g6Tree', title: 'g6Tree' },
        {
          path: '/g6BloodLineage',
          component: 'g6BloodLineage',
          title: 'g6BloodLineage',
        },
        {
          path: '/selectSearch',
          component: 'selectSearch',
          title: 'selectSearch',
        },
        { path: '/searchForm', component: 'searchForm', title: 'selectSearch' },
        {
          path: '/searchTable',
          component: 'searchTable',
          title: 'searchTable',
        },
        {
          path: '/echartSankey',
          component: 'echartSankey',
          title: 'echartSankey',
        },
        {
          path: '/editTextArea',
          component: 'editTextArea',
          title: 'editTextArea',
        },
        {
          path: '/SplitScreen',
          component: 'SplitScreen',
          title: 'SplitScreen',
        },
        {
          path: '/timer',
          component: 'timer',
          title: 'timer',
        },
      ],
    },
  ],
});
