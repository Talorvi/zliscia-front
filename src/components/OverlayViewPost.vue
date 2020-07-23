<template>
  <div
    v-if="item"
    id="overlay"
    class="flex flex-row justify-center content-center items-center text-xs md:text-base py-4"
  >
    <div
      class="text-gray-700 bg-white border-gray-600 shadow-2xl rounded max-w-xl max-h-full w-full ml-2 mr-2 overflow-auto"
    >
      <img
        v-if="item.cover"
        class="w-full h-64 object-cover rounded-t"
        :src="item.cover"
        alt="Sunset in the mountains"
      />
      <img
        v-else
        class="w-full h-48 lg:h-64 object-cover rounded-t"
        src="http://localhost:8080/default.jpg"
        alt="Sunset in the mountains"
      />
      <div class="flex flex-col h-full px-4 py-2">
        <div class="px-3 py-3 flex-1 mb-4">
          <div class="flex flex-row mb-4 items-center">
            <div class="flex-1 text-2xl font-semibold bookman">
              {{ item.title }}
            </div>
            <div
              class="p-2 cursor-pointer hover:font-bold text-green-700"
              @click="close"
            >
              X
            </div>
          </div>
          <div class="flex flex-row text-sm">
            <p>
              {{ item.text }}
            </p>
          </div>
          <div class="mb-2 flex-1 text-xs pt-4">
            {{ item.created_at }}
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
