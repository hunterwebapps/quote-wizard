import Vue from 'vue';
import Skycons from 'vue-skycons';
import App from './App.vue';
import 'bootstrap/dist/css/bootstrap.min.css';

Vue.config.productionTip = false;

Vue.use(Skycons);

const vm = new Vue({
  render: h => h(App)
}).$mount('#app');
