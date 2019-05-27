import Vue from 'vue'
import App from './App.vue'
import Util from './utils/util'

Vue.prototype.$util = Util
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
