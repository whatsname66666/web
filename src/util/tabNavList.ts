export interface NavItem {
  label: string
  path: string
}

export interface MainCategory {
  label: string
  name: string
  children: NavItem[]
}

// 统一导航配置
export const navConfig: MainCategory[] = [
  {
    label: 'HTML',
    name: 'html',
    children: [
      { label: 'H5标签', path: '/home/html/h5label' },
      { label: 'H5新增特性', path: '/home/html/h5NewFeatures' }
    ]
  },
  {
    label: 'CSS',
    name: 'css',
    children: [
      { label: 'BFC', path: '/home/css/bfc' },
      { label: '盒模型', path: '/home/css/boxModel' },
      { label: '网格布局', path: '/home/css/grid' }
    ]
  },
  {
    label: 'JS',
    name: 'js',
    children: [
      { label: '闭包', path: '/home/js/closure' },
      { label: 'Promise', path: '/home/js/promise' }
    ]
  },
  {
    label: 'ES6',
    name: 'es6',
    children: [
      { label: 'ES6新特性', path: '/home/es6/es6' }
    ]
  },
  {
    label: 'Browser',
    name: 'browser',
    children: [
      { label: '浏览器缓存', path: '/home/browser/cache' }
    ]
  },
  {
    label: '案例练习',
    name: 'cases',
    children: [
      { label: '表格分页案例', path: '/home/cases/movieList' },
      { label: '文件上传', path: '/home/cases/uploadFiled' }
    ]
  }
]

// 获取默认路径
export const getDefaultPath = (): string => {
  return navConfig[0].children[0].path
}