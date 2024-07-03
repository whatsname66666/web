import { createRouter,createWebHistory } from 'vue-router'
import routerList from './routes'

const router = createRouter({
    history:createWebHistory(),
    routes:routerList,
})
export default router