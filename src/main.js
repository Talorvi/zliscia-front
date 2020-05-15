import Vue from "vue";
import "./plugins/axios";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./assets/tailwind.css";
import VCalendar from "v-calendar";
import VueCookies from "vue-cookies";
import Paginate from "vuejs-paginate";

Vue.config.productionTip = false;
Vue.use(VCalendar);
Vue.use(VueCookies);
Vue.component("paginate", Paginate);

let vm = new Vue({
  router,
  store,
  render: h => h(App),
  components: { App }
}).$mount("#app");

window.vm = vm;
