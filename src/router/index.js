import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/home2',
    name: 'home2',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "home2" */ '../views/Home2.vue'),
  },
  {
    path: '/crop-box-detail',
    name: 'cropBoxDetail',
    component: () => import(/* webpackChunkName: "cropBoxDetail" */ '../views/CropBoxDetail.vue'),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
