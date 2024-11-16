//导入request.js请求工具
import request from '@/utils/request.js'

//注册接口
export const registerAPI = (data)=>{
    return request({
        url:'/api/user/register',
        method: 'POST',
        data
    })
}

//登录接口
export const loginAPI = (data) => {
    return request({
        url:'/api/user/login',
        method: 'POST',
        data
    })
}

export const setUserAPI = (data) => {
    return request({
        url:'/api/user/update',
        method: 'POST',
        data
    })
}

export const getUserAPI = (id) => {
    return request ({
        url:`/api/user/${id}`,
        method: 'GET'
    })
}






