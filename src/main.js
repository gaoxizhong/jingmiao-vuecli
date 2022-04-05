import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import axios from 'axios'

import { Footer,DatePicker,Radio,DropdownItem,RadioButton,RadioGroup,CheckboxGroup,Checkbox,Table,TableColumn,Breadcrumb,BreadcrumbItem,TabPane,Tabs,Switch,Pagination,Form,FormItem,Dialog,Card,Autocomplete,Empty,Dropdown,Loading,Button, Select,Container,Aside,Header,Main,Menu,MenuItem,MenuItemGroup,Submenu,Input,Message,Option,Row,Col,Collapse,CollapseItem, DropdownMenu   } from 'element-ui';
Vue.config.productionTip = false
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
Vue.prototype.$getViewportSize = function() {
  return {
    width: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
    height: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight,
  }
}

new Vue({
  router,
  data: function(){
    return {
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
