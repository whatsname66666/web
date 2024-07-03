import './assets/main.css'
import 'element-plus/dist/index.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import globalComponents from '@/components'
const app = createApp(App)
// 国际化
app.use(ElementPlus, {
    locale: zhCn,
})
app.use(router)
app.use(globalComponents)
app.mount('#app')
