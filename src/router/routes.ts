import type { RouteRecordRaw } from 'vue-router'

// 统一的路由配置
export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: () => import('@/page/login/Login.vue'),
    name: 'login'
  },
  {
    path: '/home',
    component: () => import('@/page/home/Home.vue'),
    name: 'home',
    redirect: '/home/html/h5label',
    children: [
      // HTML
      { path: 'html/h5label', component: () => import('@/page/home/html/H5label.vue') },
      { path: 'html/h5NewFeatures', component: () => import('@/page/home/html/H5NewFeatures.vue') },
      
      // CSS
      { path: 'css/bfc', component: () => import('@/page/home/css/BFC.vue') },
      { path: 'css/boxModel', component: () => import('@/page/home/css/BoxModel.vue') },
      { path: 'css/grid', component: () => import('@/page/home/css/grid.vue') },
      
      // JS
      { path: 'js/closure', component: () => import('@/page/home/js/Closure.vue') },
      { path: 'js/promise', component: () => import('@/page/home/js/Promise.vue') },
      
      // ES6
      { path: 'es6/es6', component: () => import('@/page/home/es6/ES6.vue') },
      
      // Browser
      { path: 'browser/cache', component: () => import('@/page/home/browser/Cache.vue') },
      
      // Cases
      { path: 'cases/movieList', component: () => import('@/page/home/case/MovieList.vue') },
      { path: 'cases/uploadFiled', component: () => import('@/page/home/case/UploadFiled.vue') }
    ]
  },
  {
    path: '/codeEditor',
    component: () => import('@/page/CodeEditor/CodeEditor.vue'),
    name: 'codeEditor'
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/login'
  }
]