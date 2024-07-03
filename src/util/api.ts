import axios from 'axios'
// import 
import { ElMessage } from 'element-plus'
// 封装请求
const requset = axios.create({
    baseURL:import.meta.env.VITE_APP_BASE_API,
    timeout: 5000
})
// 请求拦截器
requset.interceptors.request.use((config)=>{ 
    return config
})
// 响应拦截器
requset.interceptors.response.use((response)=>{
    return response.data;
},(error)=>{
    let message = ''
    let status = error.response.status;
    switch(status){
        case 401 : 
            message = '没有找到资源'
        break;
        case 403 : 
            message = '没有权限访问'
        break;
        case 404 : 
            message = '访问的地址不存在'
        break;
        case 500 : 
            message = '服务器异常'
        break;
        case 504 : 
            message = '请求超时'
        break;
        default:
            message = '未知错误'
    }
    ElMessage({
        message,
        type: 'error',
        plain: true,
    })   
    return Promise.reject(error)
})

export default requset
