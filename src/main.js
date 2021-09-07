import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import { Button, Select,Container,Aside,Header,Main } from 'element-ui';

Vue.config.productionTip = false
Vue.use(Button);
Vue.use(Select);
Vue.use(Container);
Vue.use(Aside);
Vue.use(Header);
Vue.use(Main);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
