const routerList = [
    {
        path:'/',
        redirect:'login'
    },
    {
        path:'/home',
        component:()=>import('@/page/home/Home.vue'),
        name:'home',
        children:[
            {
                name:'movieList',
                path:'movieList',
                component:()=>import('@/page/home/case/MovieList.vue'),
            },
            {
                name:'boxModel',
                path:'boxModel',
                component:()=>import('@/page/home/css/BoxModel.vue'),
            },
            {
                name:'bfc',
                path:'bfc',
                component:()=>import('@/page/home/css/BFC.vue'),
            },
            {
                name:'closure',
                path:'closure',
                component:()=>import('@/page/home/js/Closure.vue'),
            },
            {
                name:'promise',
                path:'promise',
                component:()=>import('@/page/home/js/Promise.vue'),
            },
            {
                name:'h5label',
                path:'h5label',
                component:()=>import('@/page/home/html/H5label.vue'),
            },
            {
                name:'h5NewFeatures',
                path:'h5NewFeatures',
                component:()=>import('@/page/home/html/H5NewFeatures.vue'),
            },
            {
                name:'es6',
                path:'es6',
                component:()=>import('@/page/home/es6/ES6.vue'),
            },
            {
                name:'cache',
                path:'cache',
                component:()=>import('@/page/home/browser/Cache.vue'),
            },
        ]
    },
    {
        path:'/login',
        component:()=>import('@/page/login/Login.vue'),
        name:'login'
    },
    // {
    //     path:'/login',
    //     component:()=>import('@/page/b.vue'),
    //     name:'login'
    // },
    {
        path:'/notfount',
        component:()=>import('@/page/NotFount.vue'),
        name:'notfount',
    },
    {
        path:'/:pathMatch(.*)*',
        redirect:'notfount'
    }
]
export default routerList