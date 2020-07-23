<template>
  <div>
    <div
      class="pl-4 pr-4 xl:pl-64 xl:pr-64 pb-4 grid grid-cols-1 md:grid-cols-2 ml-auto mr-auto gap-12 mt-4 mb-8"
    >
      <div
        v-for="post in posts"
        v-bind:key="post.id"
        class="w-full h-full text-gray-700 bg-white ml-auto mr-auto"
      >
        <div
          class="rounded overflow-hidden shadow-lg relative transition duration-500 ease-in-out h-full w-full mr-auto ml-auto flex flex-col"
        >
          <img
            v-if="post.cover"
            class="w-full h-64 object-cover"
            :src="post.cover"
            alt="Sunset in the mountains"
          />
          <img
            v-else
            class="w-full h-48 lg:h-64 object-cover"
            src="http://localhost:8080/default.jpg"
            alt="Sunset in the mountains"
          />
          <div class="px-4 py-2 flex-1">
            <div class="font-bold text-xl mb-2 bookman">
              {{ post.title }}
            </div>
            <p class="text-gray-700 text-base text-xs">
              {{ post.text.replace(/^(.{250}[^\s]*).*/, "$1") }}
              <span v-if="post.text.length > 250">[...]</span>
            </p>
          </div>
          <div class="px-6 py-4 flex flex-row">
            <div class="mb-2 flex-1 text-xs">
              {{ post.created_at }}
            </div>
            <a
              href="#"
              class="text-lg bookman text-right font-semibold leading-none text-green-600 hover:text-green-400 flex-1"
              @click="postClicked(post)"
              >Czytaj dalej</a
            >
          </div>
        </div>
      </div>
    </div>
    <t-pagination
      v-if="perPage !== 2 && total > 0"
      class="ml-auto mr-auto"
      controlButtonClass="text-green-500 hover:text-green-700 hover:bg-gray-200"
      activeButtonClass="bg-green-500 text-white"
      inactiveButtonClass="text-green-500 hover:text-green-700 hover:bg-gray-200"
      :total-items="total"
      :per-page="perPage"
      :limit="7"
      :value="page"
      :disabled="disabled"
      @change="loadPosts"
    ></t-pagination>
    <OverlayViewPost />
  </div>
</template>

<script>
import OverlayViewPost from "../components/OverlayViewPost";
import { EventBus } from "../components/EventBus";
import moment from "moment";

export default {
  name: "PostsComponent",
  // eslint-disable-next-line vue/no-unused-components
  components: { OverlayViewPost },
  props: {
    main: Boolean
  },
  data() {
    return {
      headerConfig: {
        headers: { Authorization: "Bearer " + this.$cookies.get("token") }
      },
      page: 1,
      total: 0,
      test: undefined,
      perPage: undefined,
      posts: undefined,
      disabled: true
    };
  },
  methods: {
    loadPosts(val) {
      this.disabled = true;
      this.axios
        .get("https://www.lisc.polarlooptheory.pl/api/posts/list", {
          params: {
            page: val,
            main: this.main
          }
        })
        .then(response => {
          this.total = response.data.total;
          this.perPage = response.data.per_page;
          this.posts = response.data.data;
          this.posts.forEach(post => {
            // post.created_at = moment()
            //   .locale("pl")
            //   .startOf(post.created_at)
            //   .fromNow();
            // const date = moment(post.created_at).format("DD-MM-YYYY HH:mm");
            // post.created_at = date.fromNow();
            var a = moment(post.created_at).locale("pl");
            var b = moment();
            post.created_at = a.from(b);
          });
        })
        .catch(function(error) {
          console.log(error);
        })
        .finally(() => {
          this.disabled = false;
        });
      this.scrollToTop();
    },
    scrollToTop() {
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    postClicked(item) {
      EventBus.$emit("item-clicked", item);
    }
  },
  mounted() {
    this.loadPosts();
  }
};
</script>
