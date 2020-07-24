import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/polityka-prywatnosci",
    name: "Policies",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path: "/kontakt",
    name: "Contacts",
    component: () => import("../views/Contact.vue")
  },
  {
    path: "/rezerwacja",
    name: "Reservation",
    component: () => import("../views/Reservation.vue")
  },
  {
    path: "/potwierdzenie",
    name: "Confirmation",
    component: () => import("../views/Confirmation.vue"),
    props: route => ({ id: route.query.id, code: route.query.code })
    // props(route) {
    //   return route.query || {};
    // }
  },
  {
    path: "/kalendarz",
    name: "Calendar,",
    component: () => import("../views/ReservationCalendar.vue")
  },
  {
    path: "/logowanie",
    name: "Login",
    component: () => import("../views/Login.vue")
  },
  {
    path: "/pracownicy",
    name: "Workers",
    component: () => import("../views/Workers.vue")
  },
  {
    path: "/posty",
    name: "Posts",
    component: () => import("../views/Posts.vue")
  },
  {
    path: "/zarzadzaj-postami",
    name: "Posts",
    component: () => import("../views/PostManagement.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  routes,
  scrollBehavior() {
    document.getElementById("app").scrollIntoView();
  }
});

export default router;
