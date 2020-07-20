<template>
  <div id="app">
    <NavigationBar></NavigationBar>
    <router-view />
  </div>
</template>

<script>
import Footer from "./components/Footer";
import NavigationBar from "./components/NavigationBar";
import moment from "moment";
export default {
  name: "App",
  // eslint-disable-next-line vue/no-unused-components
  components: { Footer, NavigationBar },
  mounted() {
    this.checkIfValidToken();
  },
  methods: {
    checkIfValidToken() {
      if (
        this.$cookies.isKey("token") &&
        moment().isBefore(this.$cookies.get("token-valid-until"))
      ) {
        this.axios
          .get("https://www.lisc.polarlooptheory.pl/api/auth/ping", {
            headers: { Authorization: "Bearer " + this.$cookies.get("token") }
          })
          .catch(() => {
            this.$cookies.remove("token");
            this.$cookies.remove("token-valid-until");
            this.$cookies.remove("roles");
          });
      } else {
        this.$cookies.remove("token");
        this.$cookies.remove("token-valid-until");
        this.$cookies.remove("roles");
      }
    }
  }
};
</script>
