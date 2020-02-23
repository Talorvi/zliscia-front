<template>
  <div id="app">
    <NavigationBar></NavigationBar>
    <router-view />
  </div>
</template>

<script>
import Footer from "./components/Footer";
import NavigationBar from "./components/NavigationBar";
export default {
  name: "App",
  // eslint-disable-next-line vue/no-unused-components
  components: { Footer, NavigationBar }
};
</script>
