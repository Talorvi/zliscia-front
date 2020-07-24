<template>
  <div>
    <div
      class="about h-full pt-20 lg:pt-26 xl:pt-24"
      style="margin-bottom: -65px; padding-bottom: 65px; min-height: 100vh"
    >
      <div
        class="pl-4 pr-4 xl:pl-64 xl:pr-64 pb-8 grid grid-cols-1 ml-auto mr-auto gap-8 mt-8"
      >
        <div class="max-w-4xl w-full text-gray-700 ml-auto mr-auto">
          <div
            class="text-green-700 font-semibold hover:text-green-400 cursor-pointer mb-4 text-right"
            @click="addPost"
          >
            Dodaj post
          </div>
          <div class="overflow-x-auto border-gray-600 shadow-md bg-white">
            <table class="w-full overflow-hidden">
              <thead>
                <tr>
                  <th class="px-4 py-2">Tytuł</th>
                  <th class="px-4 py-2">Data utworzenia</th>
                  <th class="px-4 py-2">Akcje</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="post in posts" :key="post.id">
                  <td class="border px-4 py-2">{{ post.title }}</td>
                  <td class="border px-4 py-2">{{ post.created_at }}</td>
                  <td class="border px-4 py-2 text-md">
                    <div class="flex flex-row justify-around">
                      <button
                        class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-2 rounded w-32"
                        @click="editPost(post)"
                      >
                        Edytuj
                      </button>
                      <button
                        class="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded w-32 ml-2 md:ml-0"
                        @click="removePost(post.id)"
                      >
                        Usuń
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <OverlayAddPost></OverlayAddPost>
    <Footer></Footer>
  </div>
</template>
<script>
import Footer from "../components/Footer";
// eslint-disable-next-line no-unused-vars
import Swal from "sweetalert2";
import moment from "moment";
import { EventBus } from "../components/EventBus";
import OverlayAddPost from "../components/OverlayAddPost";

export default {
  name: "PostManagement",
  components: { Footer, OverlayAddPost },
  data() {
    return {
      posts: undefined,
      headerConfig: {
        headers: { Authorization: "Bearer " + this.$cookies.get("token") }
      }
    };
  },
  methods: {
    loadPosts() {
      this.axios
        .get(
          "https://www.lisc.polarlooptheory.pl/api/posts/list?main=all",
          this.headerConfig
        )
        .then(response => {
          this.posts = response.data;
          this.posts.forEach(post => {
            var a = moment(post.created_at).locale("pl");
            var b = moment();
            post.created_at = a.from(b);
          });
        })
        .catch(error => console.log(error));
    },
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
            EventBus.$emit("login-update");
            this.$router.push("/", () => {});
          });
      } else {
        this.$cookies.remove("token");
        this.$cookies.remove("token-valid-until");
        this.$cookies.remove("roles");
        EventBus.$emit("login-update");
        this.$router.push("/", () => {});
      }
    },
    // eslint-disable-next-line no-unused-vars
    addPost() {
      EventBus.$emit("show-add-post");
    },
    editPost(post) {
      EventBus.$emit("show-add-post", post);
    },
    removePost(id) {
      Swal.queue([
        {
          text: "Czy na pewno chcesz usunąć post?",
          icon: "question",
          confirmButtonText: "Tak",
          cancelButtonText: "Anuluj",
          showLoaderOnConfirm: true,
          showCancelButton: true,
          focusConfirm: false,
          preConfirm: () => {
            return this.axios
              .post(
                "https://www.lisc.polarlooptheory.pl/api/panel/posts/remove",
                {
                  id: id
                },
                this.headerConfig
              )
              .then(() => {
                for (let i = 0; i < this.posts.length; i++) {
                  if (this.posts[i].id === id) {
                    this.$delete(this.posts, i);
                    break;
                  }
                }
              })
              .catch(error => {
                console.log(error);
              });
          }
        }
      ]);
    }
  },
  mounted() {
    this.loadPosts();

    EventBus.$on("update-posts", () => {
      this.loadPosts();
    });
  },
  beforeMount() {
    this.checkIfValidToken();
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

<style src="@sweetalert2/theme-material-ui/material-ui.css">
.swal2-styled.swal2-confirm {
  color: #2f855a !important;
}
</style>
<style>
.swal2-styled.swal2-confirm {
  color: #2f855a !important;
}
.swal2-styled.swal2-confirm:focus {
  background-color: rgba(47, 133, 90, 0.2);
}
.swal2-styled.swal2-confirm:hover {
  background-color: rgba(47, 133, 90, 0.2);
}
.swal2-styled.swal2-cancel {
  color: #f56565 !important;
}
.swal2-styled.swal2-cancel:focus {
  background-color: rgba(47, 133, 90, 0.2);
}
.swal2-styled.swal2-cancel:hover {
  background-color: rgba(47, 133, 90, 0.2);
}
</style>
