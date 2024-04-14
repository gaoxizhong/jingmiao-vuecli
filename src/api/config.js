const httpUrl = window.location.host;
export default {
    title:'admin',
    baseURL: {  // 主站
        // 正式环境
        pro: '/api'+'/jmjk/'
        // pro: 'http://' + httpUrl +'/jmjk/',
    },
    researchURL: {  // 科研探索
        //测试环境
        dev: '/api'+'/jmjk/'
    //    dev: 'http://' + httpUrl +'/jmjk/',
    },
    iframeURL: {  // 外部网站内嵌访问--科研探索

        pro: 'https://literature.carecancer.cn/jmjk/'
    }
}
