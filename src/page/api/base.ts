import { request } from '@/util/fetch'
interface LoginType {
    email:string,
    password:string
}
//登录
export const login = (params:LoginType): Promise<any> => {
    return request.post('/api/auth/login',params)
}
//注册
export const register = (params:LoginType): Promise<any> => {
    return request.post('/api/auth/register',params)
}