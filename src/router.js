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
  let cloudBaseUrl = null
  if (location.hostname === "localhost" || location.hostname === "127.0.0.1"){
    cloudBaseUrl = 'http://localhost:3010'
  }else{
    cloudBaseUrl = 'https://cloud.lessborders.com'
  }

  let toFullPath = new URL(to.fullPath, window.location.href).href
  let overridePrev = false
  if(to.name == "login") {
    toFullPath = new URL(from.fullPath, window.location.href).href
    overridePrev = true
  }
  const fromFullPath = new URL(from.fullPath, window.location.href).href
  let newUrl = null
  // requires auth, check if logged in
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // if not authorized, redirect to login page.
    if (!store.state.isLoggedIn) {
      console.log(store.state.isUserLoggedIn)
      newUrl = cloudBaseUrl + '/auth/signin/?redirect_url=' + toFullPath
      if(toFullPath != fromFullPath || overridePrev) {
        newUrl += '&previous_url=' + fromFullPath
      }
      window.location.href = newUrl
    } else {
      next() // go to wherever I'm going
      window.scrollTo(0, 0)
    }
  } else if (to.matched.some(record => record.meta.hideForAuth)) {
    // if authorized, redirect to home page.
    if (store.state.isLoggedIn) {
      next({ name: 'home' })
      window.scrollTo(0, 0)
    } else {
      next() // go to wherever I'm going
      window.scrollTo(0, 0)
    }
  } else {
    next()
    window.scrollTo(0, 0)
  }
});