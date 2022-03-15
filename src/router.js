import { createRouter, createWebHistory } from "vue-router";

const Home = () => import(/* webpackChunkName: "home" */ './pages/Home.vue');
const Orders = () => import(/* webpackChunkName: "home" */ './pages/Orders/Orders.vue');
const Order= () => import(/* webpackChunkName: "home" */ './pages/Orders/Order.vue');

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },,
    {
      path: "/orders/",
      name: "orders",
      component: Orders,
      props: true,
    },
    {
      path: "/orders/:id/",
      name: "order",
      component: Order,
      props: true,
    }
  ],
});

router.beforeEach((to, from, next) => {
  console.log({to, from});
  window.scrollTo(0, 0)
  next();
});