<template>
  <div
    v-if="show"
    id="overlay"
    class="flex flex-row justify-center content-center items-center text-xs md:text-base"
  >
    <div
      class="text-gray-700 bg-white px-4 py-2 border-gray-600 shadow-2xl rounded max-w-xl max-h-screen w-full overflow-auto"
    >
      <div class="flex flex-col h-full">
        <div class="px-6 py-4 flex-1 mb-4">
          <div class="flex flex-row mb-4 items-center">
            <div class="flex-1 text-2xl font-semibold">
              <span v-if="post">Edytuj post</span>
              <span v-else>Dodaj post</span>
            </div>
            <div
              class="p-2 cursor-pointer hover:font-bold text-green-700"
              @click="close"
            >
              X
            </div>
          </div>
          <div class="flex flex-col max-w-xs mx-auto">
            <p class="pb-2">
              <label for="title" class="font-light">Tytuł:</label>
              <input
                id="title"
                v-model="title"
                class="bg-white focus:outline-none border border-gray-400 focus:border-green-600 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
                type="text"
                placeholder="Nazwa"
                :disabled="disabled"
              />
              <label
                for="title"
                class="font-light text-red-500 text-xs"
                v-if="errors.title"
                >{{ errors.title[0] }}</label
              >
            </p>
            <p class="pb-2">
              <label for="cover" class="font-light">Zdjęcie:</label>
              <input
                id="cover"
                v-model="cover"
                class="bg-white focus:outline-none border border-gray-400 focus:border-green-600 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
                type="text"
                placeholder="Zdjęcie"
              />
              <label
                for="cover"
                class="font-light text-red-500 text-xs"
                v-if="errors.cover"
                >{{ errors.cover[0] }}</label
              >
            </p>
            <p class="pb-2">
              <label for="text" class="font-light">Tekst:</label>
              <vue-editor
                id="text"
                v-model="text"
                :editorToolbar="customToolbar"
              ></vue-editor>
              <!--              <textarea-->
              <!--                rows="10"-->
              <!--                id="text"-->
              <!--                v-model="text"-->
              <!--                class="bg-white focus:outline-none border border-gray-400 focus:border-green-600 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"-->
              <!--                type="text"-->
              <!--                placeholder="Teskt"-->
              <!--                :disabled="disabled"-->
              <!--              />-->
              <label
                for="text"
                class="font-light text-red-500 text-xs"
                v-if="errors.text"
                >{{ errors.text[0] }}</label
              >
            </p>
            <div
              v-if="post"
              class="flex flex-row justify-end text-green-700 font-semibold hover:text-green-400 cursor-pointer mt-4"
              @click="editPost"
            >
              Zapisz
            </div>
            <div
              v-else
              class="flex flex-row justify-end text-green-700 font-semibold hover:text-green-400 cursor-pointer mt-4"
              @click="addPost"
            >
              Dodaj
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { EventBus } from "./EventBus";
import { VueEditor } from "vue2-editor";

export default {
  name: "Overlay",
  components: { VueEditor },
  mounted() {
    EventBus.$on("show-add-post", post => {
      if (post) {
        this.post = post;
        this.title = this.post.title;
        this.text = this.post.text;
        this.cover = this.post.cover;
      }
      this.show = true;
    });
  },
  data() {
    return {
      show: false,
      headerConfig: {
        headers: { Authorization: "Bearer " + this.$cookies.get("token") }
      },
      title: "",
      cover: "",
      text: "",
      errors: {
        title: "",
        text: "",
        cover: ""
      },
      disabled: false,
      post: undefined,
      customToolbar: [
        ["bold", "italic", "underline"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["code-block"]
      ]
    };
  },
  methods: {
    close() {
      this.show = false;
      this.post = undefined;
    },
    addPost() {
      this.axios
        .post(
          "https://www.lisc.polarlooptheory.pl/api/panel/posts/create",
          {
            title: this.title,
            text: this.text,
            cover: this.cover
          },
          this.headerConfig
        )
        .then(() => {
          this.errors = {
            title: "",
            text: "",
            cover: ""
          };
          this.title = "";
          this.text = "";
          this.cover = "";

          this.show = false;

          EventBus.$emit("update-posts");
        })
        .catch(error => {
          this.errors = error.response.data.errors;
        });
    },
    editPost() {
      this.axios
        .post(
          "https://www.lisc.polarlooptheory.pl/api/panel/posts/edit",
          {
            id: this.post.id,
            title: this.title,
            text: this.text,
            cover: this.cover
          },
          this.headerConfig
        )
        .then(() => {
          this.errors = {
            title: "",
            text: "",
            cover: ""
          };
          this.title = "";
          this.text = "";
          this.cover = "";

          this.show = false;

          EventBus.$emit("update-posts");
        })
        .catch(error => {
          this.errors = error.response.data.errors;
        });
    }
    // eslint-disable-next-line no-unused-vars
    // cancel(id) {
    //   Swal.queue([
    //     {
    //       text: "Czy na pewno chcesz usunąć pracownika?",
    //       icon: "question",
    //       confirmButtonText: "Tak",
    //       cancelButtonText: "Anuluj",
    //       showLoaderOnConfirm: true,
    //       showCancelButton: true,
    //       focusConfirm: false,
    //       preConfirm: () => {
    //         return this.axios
    //           .post(
    //             "https://www.lisc.polarlooptheory.pl/api/panel/cancel-reservation",
    //             {
    //               id: id
    //             },
    //             this.headerConfig
    //           )
    //           .then(() => {
    //             this.item = undefined;
    //           })
    //           .catch(error => {
    //             console.log(error.data);
    //           });
    //       }
    //     }
    //   ]);
    // }
  }
};
</script>

<style scoped>
#overlay {
  position: fixed; /* Sit on top of the page content */
  width: 100%; /* Full width (cover the whole page) */
  height: 100%; /* Full height (cover the whole page) */
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5); /* Black background with opacity */
  z-index: 1000; /* Specify a stack order in case you're using a different order for other elements */
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
