import axios from './axios'

// 提交注册信息
export const RegisterUserInfo = () =>{
    return axios.request({
        url:'/RegisterUserInfo',
        method: 'post'
    })
}