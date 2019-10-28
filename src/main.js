import Vue from 'vue';
import Swiper from 'vue-awesome-swiper';
import 'swiper/css/swiper.css';

import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';

Vue.config.productionTip = false;

Vue.use(Swiper);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
