// 封装axios 拦截器
// 1. 引入组件
import axios from 'axios'
import config from './config'
// 设置配置 根据开发和生产环境不一样
const baseURL = process.env.NODE_ENV === 'development'? config.baseURL.dev : config.baseURL.pro;


class HttpRequst {

    constructor(baseURL){
        this.baseURL = baseURL
    }

    getInsideConfig(){

        const config = {
            baseURL: this.baseURL,
            header: {

            }
        }
        return config
    }
    //  拦截器方法
    interceptors(){
        // 添加请求拦截器
        axios.interceptors.request.use(function (config) {
            // 在发送请求之前做些什么
            console.log('拦截处理请求');
            return config;
        }, function (error) {
            // 对请求错误做些什么
            return Promise.reject(error);
        });

        // 添加响应拦截器
        axios.interceptors.response.use(function (response) {
            // 对响应数据做点什么
            return response;
        }, function (error) {
            // 对响应错误做点什么
            return Promise.reject(error);
        });
    }

    // 2. 请求
    request (options) {
        // 创建axios实例
        const instanse = axios.create();
        // 请求拦截器
        // 处理用户传过来的数据对象,如果有相同的key值 后者覆盖前者
        options = { ...(this.getInsideConfig()),...options }
        this.interceptors(instanse)
        return instanse(options)
    }
}


export default new HttpRequst(baseURL)