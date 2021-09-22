import Vue from 'vue'
import App from '/src/App.vue'
export default new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app');