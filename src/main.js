import Vue from "vue";
import "./plugins/axios";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./assets/tailwind.css";
import VCalendar from "v-calendar";
import VueCookies from "vue-cookies";
import VueTailwind from "vue-tailwind";

Vue.config.productionTip = false;
Vue.use(VCalendar);
Vue.use(VueCookies);
Vue.use(VueTailwind);

let vm = new Vue({
  router,
  store,
  render: h => h(App),
  components: { App }
}).$mount("#app");

window.vm = vm;
