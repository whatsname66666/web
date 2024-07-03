// 注册全局组件
import Icon from './icon/index.vue'
import Tab from './tab/index.vue'
const globalComponents = {Icon,Tab}
export default {
    install(app){
        Object.keys(globalComponents).forEach((key)=>{
            app.component(key,globalComponents[key])
        })
    }
}