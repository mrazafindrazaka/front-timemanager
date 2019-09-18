import Vue from 'vue'
import App from './App.vue'
import router from './routes'
import VueSweetalert2 from 'vue-sweetalert2'
import VueApexCharts from 'vue-apexcharts'

Vue.use(VueApexCharts);

Vue.component('apexchart', VueApexCharts);
Vue.use(VueSweetalert2);
Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
