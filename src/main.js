import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import http from 'axios'

import { Button, Select,Container,Aside,Header,Main,Menu,MenuItem,MenuItemGroup,Submenu,Input } from 'element-ui';

Vue.config.productionTip = false
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

Vue.prototype.$http = http;
Vue.prototype.$getViewportSize = function() {
  return {
    width: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
    height: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight,
  }
}
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
