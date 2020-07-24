<template>
  <div>
    <div
      v-if="disabled"
      class="w-full h-screen flex justify-center content-center items-center"
    >
      <svg
        version="1.1"
        id="Layer_1"
        class="w-8 h-8 ml-auto mr-auto fill-current text-green-700 spin"
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        viewBox="0 0 469.333 469.333"
        style="enable-background:new 0 0 469.333 469.333;"
        xml:space="preserve"
      >
        <g>
          <g>
            <path
              d="M468.523,6.592C466.88,2.603,462.976,0,458.667,0C44.694,0,0,171.563,0,245.333c0,26.539,5.888,51.328,17.515,73.664
			c1.792,3.456,5.333,5.653,9.216,5.739c3.669-0.107,7.531-1.941,9.472-5.333C64.15,271.104,143.296,151.893,274.006,88.555
			c5.355-2.56,11.755-0.363,14.293,4.907c2.56,5.312,0.341,11.712-4.949,14.272c-9.856,4.779-19.328,9.984-28.608,15.381
			c-3.541,2.069-6.976,4.267-10.453,6.421c-5.227,3.243-10.389,6.549-15.424,9.963c-5.013,3.371-9.963,6.827-14.827,10.368
			c-1.515,1.109-2.965,2.24-4.459,3.371C79.488,250.176,0,404.821,0,458.667c0,5.888,4.779,10.667,10.667,10.667
			s10.667-4.779,10.667-10.667c0-17.195,11.712-52.053,33.877-93.632c32.171,26.304,75.456,40.299,126.123,40.299
			c136.981,0,165.675-130.347,181.077-200.384c20.736-94.251,66.368-149.312,103.787-186.752
			C469.27,15.147,470.166,10.581,468.523,6.592z"
            />
          </g>
        </g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
      </svg>
    </div>
    <div
      v-if="!disabled"
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
            src="https://lisc.polarlooptheory.pl/default.jpg"
          />
          <div class="px-4 py-2 flex-1">
            <div class="font-bold text-xl mb-2 bookman">
              {{ post.title }}
            </div>
            <p
              v-html="post.text.replace(/^(.{250}[^\s]*).*/, '$1')"
              class="text-gray-700 text-base text-xs inline-block"
            ></p>
            <span v-if="post.text.length > 250" class="inline-block"
              >[...]</span
            >
          </div>
          <div class="px-6 py-4 flex flex-row">
            <div class="mb-2 flex-1 text-xs">
              {{ post.created_at }}
            </div>
            <a
              class="text-lg bookman text-right font-semibold leading-none text-green-600 hover:text-green-400 flex-1 cursor-pointer"
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
      wrapperClass="table border-collapse"
      itemClass="table-cell"
      pageClass="border border-gray-300 w-12 h-12"
      controlClass="border border-gray-300 w-12 h-12"
      disabledControlClass="border border-gray-300 w-12 h-12"
      ellipsisClass="border border-gray-300 w-12 h-12 hidden md:table-cell"
      buttonClass="flex w-full h-full items-center justify-center font-bold bg-white"
      ellipsisButtonClass="text-gray-600"
      disabledButtonClass="text-gray-400 cursor-not-allowed"
      disabledControlButtonClass="text-gray-400 cursor-not-allowed"
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

<style scoped>
@keyframes spin {
  0% {
    transform: rotateZ(0);
  }
  100% {
    transform: rotateZ(360deg);
  }
}
.spin {
  animation: spin 2s ease-in-out infinite;
}

.btnanim {
  animation: ease-out;
}
</style>
