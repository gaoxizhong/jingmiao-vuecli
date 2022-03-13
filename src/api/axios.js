// 封装axios 拦截器
// 1. 引入组件
import axios from 'axios'
import config from './config'
import store from '../store'
import router from '../router'

// 设置配置 根据开发和生产环境不一样
// const baseURL = process.env.NODE_ENV === 'development'? config.baseURL.dev : config.baseURL.pro;

const baseURL = config.baseURL.dev;

class HttpRequst {

    constructor(baseURL){
        this.baseURL = baseURL
    }
    getInsideConfig(){

        const config = {
            baseURL: this.baseURL,
            header:{
              'Content-Type':'application/x-www-form-urlencoded',
            },

        }
        return config
    }
    //  拦截器方法
    interceptors(instanse){
        // 添加请求拦截器
        instanse.interceptors.request.use(function (config) {
            // 在发送请求之前做些什么
            // 设置统一的header
            if(localStorage.getItem('token')){
              config.headers.token = localStorage.getItem('token')
            }
            // console.log('请求拦截器');
            return config;
        }, function (error) {
            // 对请求错误做些什么
            return Promise.reject(error);
        });

        // 添加响应拦截器
        instanse.interceptors.response.use(function (response) {
            // 对响应数据做点什么
            // console.log('响应拦截器')
              switch (response.data.code) {
                case 101:
                store.dispatch('delToken');
                store.dispatch('setStateurl',router.currentRoute.fullPath);
                router.replace({path: '/'})
                break;
                case 777:
                store.dispatch('delToken');
                store.dispatch('setStateurl',router.currentRoute.fullPath);
                router.replace({path: '/'})
              }
            return response;
        }, function (error) {
            // 对响应错误做点什么
            console.log(error)

            return Promise.reject(error);
        });
    }

    // 2. 请求
    request (options) {
        // 创建axios实例
            // 创建 axios 实例
          const instanse = axios.create();
        // 请求拦截器
        this.interceptors(instanse)
        // 处理用户传过来的数据对象,如果有相同的key值 后者覆盖前者
        options = { ...(this.getInsideConfig()),...options }
        return instanse(options)
    }
}


export default new HttpRequst(baseURL)
