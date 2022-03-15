import { createApp } from "vue";
import { createStore } from "vuex";
import { router } from "./router";
import { store } from "./store";
import { createMetaManager } from 'vue-meta';
import axios from 'axios';

import "./darkToggle";

import Header from "./layouts/Header.vue";
import Footer from "./layouts/Footer.vue";

import darkToggle from "./components/darkToggle.vue";
import productDropdown from "./components/productDropdown.vue";

import App from "./App.vue";

import './assets/scss/styles.scss';
import "bootstrap";

const app = createApp(App);

// Layouts
app.component("Header", Header);
app.component("Footer", Footer);

// Global Components
app.component("darkToggle", darkToggle);
app.component("productDropdown", productDropdown);

app.use(createStore(store));
app.use(router);
app.use(createMetaManager());
app.config.globalProperties.$http = axios;

app.mount("#app");