<template>
  <div
    class="flex flex-col about h-full pt-20 lg:pt-26 xl:pt-24"
    style="min-height: 100vh"
  >
    <PostsComponent
      :main="false"
      class="flex-1 flex flex-col justify-between"
    ></PostsComponent>
    <Footer></Footer>
  </div>
</template>

<script>
import Footer from "../components/Footer";
import PostsComponent from "../components/PostsComponent";

export default {
  name: "Posts",
  components: { PostsComponent, Footer }
};
</script>
