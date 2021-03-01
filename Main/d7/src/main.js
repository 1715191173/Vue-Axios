import Vue from 'vue'
import App from './App.vue'

// 中央事件总线
Vue.prototype.$bus = new Vue()

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
