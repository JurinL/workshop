import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'

Vue.use(require('vue-cookies'));
Vue.config.productionTip = false

//Set a cookie เพิ่มคุกกี้พร้อมกำหนดอายุ
//this.$cookies.set("token","{{tokenvalue}}","60s");

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
