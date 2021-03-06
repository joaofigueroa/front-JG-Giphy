import Vue from 'vue'
import App from './App.vue'
import ScrollLoader from 'vue-scroll-loader'
import vuetify from './plugins/vuetify';
import 'material-design-icons-iconfont/dist/material-design-icons.css'

Vue.use(ScrollLoader)

Vue.config.productionTip = false

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
