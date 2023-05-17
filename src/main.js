import Vue from 'vue'
import App from './App.vue'
// import './registerServiceWorker'
import router from './router'
import store from './store'
import axios from 'axios'
import './assets/js/rem'
import * as echarts from 'echarts'
import 'echarts-wordcloud'
import { Tag,Popover,Upload,Result,Footer,DatePicker,Radio,DropdownItem,RadioButton,RadioGroup,CheckboxGroup,Checkbox,Table,TableColumn,Breadcrumb,BreadcrumbItem,TabPane,Tabs,Switch,Pagination,Form,FormItem,Dialog,Card,Autocomplete,Empty,Dropdown,Loading,Button, Select,Container,Aside,Header,Main,Menu,MenuItem,MenuItemGroup,Submenu,Input,Message,Option,Row,Col,Collapse,CollapseItem, DropdownMenu   } from 'element-ui';
Vue.config.productionTip = false
Vue.use(Tag);
Vue.use(Popover);
Vue.use(Upload);
Vue.use(Loading);
Vue.use(Result);
Vue.use(Footer);
Vue.use(DatePicker);
Vue.use(Radio);
Vue.use(DropdownItem);
Vue.use(RadioButton);
Vue.use(RadioGroup);
Vue.use(CheckboxGroup);
Vue.use(Checkbox);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Breadcrumb);
Vue.use(BreadcrumbItem);
Vue.use(TabPane);
Vue.use(Tabs);
Vue.use(Button);
Vue.use(Select);
Vue.use(Container);
Vue.use(Aside);
Vue.use(Header);
Vue.use(Main);
Vue.use(Menu);
Vue.use(MenuItem);
Vue.use(MenuItemGroup);
Vue.use(Submenu);
Vue.use(Input);
Vue.use(Option);
Vue.use(Row);
Vue.use(Col);
Vue.use(Collapse);
Vue.use(CollapseItem);
Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(Empty);
Vue.use(Autocomplete);
Vue.use(Card);
Vue.use(Dialog);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Pagination);
Vue.use(Switch);
// http.defaults.headers.common['Authentication-Token'] = store.state.token;
Vue.prototype.axios = axios;
Vue.prototype.$message = Message;
Vue.prototype.$loading = Loading.service;
Vue.prototype.$echarts = echarts;
Vue.prototype.$getViewportSize = function() {
  return {
    width: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
    height: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight,
  }
}
//  ============ 发布项目清除缓存  以下  ===========================
const VUE_APP_VERSION = require('../package.json').version
console.log('当前版本号:' + VUE_APP_VERSION)
const vers = window.localStorage.getItem("appVersion");
console.log('缓存版本号:' + vers)
if(VUE_APP_VERSION != vers){
  // localStorage.clear()
  window.localStorage.setItem("appVersion", VUE_APP_VERSION);
  window.location.reload(true);
}

//  ============ 发布项目清除缓存  以上  ===========================

new Vue({
  router,
  data: function(){
    return {
      activeIndex: '2',
      main_bg:{    // 内容页背景图
        backgroundImage:'url(' + require('./assets/image/home/icon_bjt.png') + ')',
        backgroundRepeat:'no-repeat',
        backgroundSize: '100% 100%'
      },  // 登录注册页背景图
      login_bgurl:{
        backgroundImage:'url(' + require('./assets/image/demo2.png') + ')',
        backgroundRepeat:'no-repeat',
        backgroundSize: '100% 100%',
      },
    }
  },
  store,
  render: h => h(App)
}).$mount('#app')
