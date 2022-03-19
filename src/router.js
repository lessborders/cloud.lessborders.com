import { createRouter, createWebHistory } from "vue-router";

const Home = () => import('./pages/Home.vue');
const Login = () => import('./pages/Auth/Login.vue')
const Register = () => import('./pages/Auth/Register.vue')
const Orders = () => import('./pages/Orders/Orders.vue');
const Order = () => import('./pages/Orders/Order.vue');

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/auth/signin/",
      name: "login",
      component: Login,
      props: true,
    },
    {
      path: "/auth/signup/",
      name: "login",
      component: Register,
      props: true,
    },
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