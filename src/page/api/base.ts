import { request } from '@/util/fetch'
//登录类型
interface LoginType {
    email:string,
    password:string
}
//电影列表类型
interface MoveType {
    page:number,
    pageSize:number
}

//登录
export const login = (params:LoginType): Promise<any> => {
    return request.post('/api/auth/login',params)
}
//注册
export const register = (params:LoginType): Promise<any> => {
    return request.post('/api/auth/register',params)
}

//获取电影列表
export const moveList = (params:MoveType): Promise<any> => {
    return request.post('/api/example/movieList',params)
}