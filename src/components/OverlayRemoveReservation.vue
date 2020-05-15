<template>
  <div
    v-if="item"
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
              {{ item.label }}
            </div>
            <div
              class="p-2 cursor-pointer hover:font-bold text-green-700"
              @click="close"
            >
              X
            </div>
          </div>
          <div class="flex flex-row">
            <p class="font-semibold pr-2">Email:</p>
            <p>
              {{ item.email }}
            </p>
          </div>
          <div class="flex flex-row">
            <p class="font-semibold pr-2">W godzinach:</p>
            <p class="pr-2">
              {{ convertMoment(item.time.start) }}
            </p>
            -
            <p class="pl-2">
              {{ convertMoment(item.time.end) }}
            </p>
          </div>
          <div class="flex flex-row">
            <p class="font-semibold pr-2">Stolik:</p>
            <p>
              {{ item.table }}
            </p>
          </div>
          <div
            class="flex flex-row justify-end text-red-500 font-semibold hover:text-red-800 cursor-pointer"
            @click="cancel(item.id)"
          >
            Usuń rezerwację
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { EventBus } from "./EventBus";
import moment from "moment";
import Swal from "sweetalert2";

export default {
  name: "Overlay",
  mounted() {
    EventBus.$on("item-clicked", item => {
      this.itemClicked(item);
    });
  },
  data() {
    return {
      item: undefined,
      headerConfig: {
        headers: { Authorization: "Bearer " + this.$cookies.get("token") }
      }
    };
  },
  methods: {
    itemClicked(item) {
      this.item = item;
    },
    close() {
      this.item = undefined;
    },
    convertMoment(time) {
      return moment(time).format("H:mm");
    },
    // eslint-disable-next-line no-unused-vars
    cancel(id) {
      Swal.queue([
        {
          text: "Czy na pewno chcesz usunąć rezerwację?",
          icon: "question",
          confirmButtonText: "Tak",
          cancelButtonText: "Anuluj",
          showLoaderOnConfirm: true,
          showCancelButton: true,
          focusConfirm: false,
          preConfirm: () => {
            return this.axios
              .post(
                "http://lisc.test/api/panel/cancel-reservation",
                {
                  id: id
                },
                this.headerConfig
              )
              .then(() => {
                this.item = undefined;
              })
              .catch(error => {
                console.log(error.data);
              });
          }
        }
      ]);
    }
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
