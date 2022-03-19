import { createRouter, createWebHistory } from "vue-router";
import store from "./store"

const Home = () => import('./pages/Home.vue');
const Login = () => import('./pages/Auth/Login.vue')
const Register = () => import('./pages/Auth/Register.vue')
const Orders = () => import('./pages/Orders/Orders.vue');
const Order = () => import('./pages/Orders/Order.vue');
const Plans = () => import('./pages/Home.vue');
const Settings = () => import('./pages/Home.vue');

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/auth/signin/",
      name: "login",
      component: Login,
      meta: {
          hideForAuth: true
      }
    },
    {
      path: "/auth/signup/",
      name: "register",
      component: Register,
      meta: {
          hideForAuth: true
      }
    },
    {
      path: "/plans/",
      name: "plans",
      component: Plans,
      props: true,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/orders/",
      name: "orders",
      component: Orders,
      props: true,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/orders/:id/",
      name: "order",
      component: Order,
      props: true,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/account/",
      name: "settings",
      component: Settings,
      props: true,
      meta: {
        requiresAuth: true
      }
    },
  ],
});

router.beforeEach((to, from, next) => {
  const toFullPath = new URL(to.fullPath, window.location.href).href
  // requires auth, check if logged in
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // if not authorized, redirect to login page.
    if (!store.state.isLoggedIn) {
      console.log(store.state.isUserLoggedIn)
      window.location.href = '/auth/signin/?redirect_url=' + toFullPath
    } else {
      window.scrollTo(0, 0)
      next() // go to wherever I'm going
    }
  } else if (to.matched.some(record => record.meta.hideForAuth)) {
    // if authorized, redirect to home page.
    if (store.state.isLoggedIn) {
      window.scrollTo(0, 0)
      next({ name: 'home' })
    } else {
      window.scrollTo(0, 0)
      next() // go to wherever I'm going
    }
  } else {
    window.scrollTo(0, 0)
    next()
  }
});