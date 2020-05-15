<template>
  <div
    v-if="show"
    id="overlay"
    class="flex flex-row justify-center content-center items-center text-xs md:text-base"
  >
    <div
      class="text-gray-700 bg-white px-4 py-2 border-gray-600 shadow-2xl rounded max-w-xl max-h-screen w-full"
    >
      <div class="flex flex-col h-full">
        <div class="px-6 py-4 flex-1 mb-4">
          <div class="flex flex-row mb-4 items-center">
            <div class="flex-1 text-2xl font-semibold">
              Dodaj pracownika
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
              <label for="name" class="font-light">Nazwa:</label>
              <input
                id="name"
                v-model="name"
                class="bg-white focus:outline-none border border-gray-400 focus:border-green-600 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
                type="text"
                placeholder="Nazwa"
                :disabled="disabled"
              />
              <label
                for="name"
                class="font-light text-red-500 text-xs"
                v-if="errors.name"
                >{{ errors.name[0] }}</label
              >
            </p>
            <p class="pb-2">
              <label for="email" class="font-light">Email:</label>
              <input
                id="email"
                v-model="email"
                class="bg-white focus:outline-none border border-gray-400 focus:border-green-600 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
                type="email"
                placeholder="Email"
                :disabled="disabled"
              />
              <label
                for="email"
                class="font-light text-red-500 text-xs"
                v-if="errors.email"
                >{{ errors.email[0] }}</label
              >
            </p>
            <p class="pb-2">
              <label for="password" class="font-light">Hasło:</label>
              <input
                id="password"
                v-model="password"
                class="bg-white focus:outline-none border border-gray-400 focus:border-green-600 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
                type="password"
                placeholder="Hasło"
                :disabled="disabled"
              />
              <label
                for="password"
                class="font-light text-red-500 text-xs"
                v-if="errors.password"
                >{{ errors.password[0] }}</label
              >
            </p>
            <p class="pb-2">
              <label for="password_confirmation" class="font-light"
                >Powtórz hasło:</label
              >
              <input
                id="password_confirmation"
                v-model="password_confirmation"
                class="bg-white focus:outline-none border border-gray-400 focus:border-green-600 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
                type="password"
                placeholder="Powtórz hasło"
                :disabled="disabled"
              />
              <label
                for="password_confirmation"
                class="font-light text-red-500 text-xs"
                v-if="errors.password_confirmation"
                >{{ errors.password_confirmation[0] }}</label
              >
            </p>
            <div
              class="flex flex-row justify-end text-green-700 font-semibold hover:text-green-400 cursor-pointer mt-4"
              @click="addWorker"
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

export default {
  name: "Overlay",
  mounted() {
    EventBus.$on("show-add-worker", () => {
      this.show = true;
    });
  },
  data() {
    return {
      show: false,
      headerConfig: {
        headers: { Authorization: "Bearer " + this.$cookies.get("token") }
      },
      email: "",
      password: "",
      password_confirmation: "",
      name: "",
      errors: {
        email: "",
        password: "",
        password_confirmation: "",
        name: ""
      },
      disabled: false
    };
  },
  methods: {
    close() {
      this.show = false;
    },
    addWorker() {
      this.axios
        .post(
          "http://lisc.test/api/panel/workers/create",
          {
            email: this.email,
            name: this.name,
            password: this.password,
            password_confirmation: this.password_confirmation
          },
          this.headerConfig
        )
        .then(() => {
          this.errors = {
            email: "",
            password: "",
            password_confirmation: "",
            name: ""
          };
          this.email = "";
          this.password = "";
          this.password_confirmation = "";
          this.name = "";

          this.show = false;

          EventBus.$emit("update-workers");
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
    //             "http://lisc.test/api/panel/cancel-reservation",
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
