<template>
  <div>
    <div
      class="about h-full pt-20 lg:pt-26 xl:pt-24"
      style="margin-bottom: -65px; padding-bottom: 65px; min-height: 100vh"
    >
      <div
        class="pl-4 pr-4 xl:pl-64 xl:pr-64 pb-8 grid grid-cols-1 ml-auto mr-auto gap-8 mt-8"
      >
        <div class="max-w-4xl w-full text-gray-700 bg-white ml-auto mr-auto">
          <div class="overflow-x-auto border-gray-600 shadow-md"></div>
        </div>
      </div>
    </div>
    <OverlayAddWorker></OverlayAddWorker>
    <Footer></Footer>
  </div>
</template>
<script>
import Footer from "../components/Footer";
// eslint-disable-next-line no-unused-vars
import Swal from "sweetalert2";
import moment from "moment";
import { EventBus } from "../components/EventBus";
import OverlayAddWorker from "../components/OverlayAddWorker";

export default {
  name: "Login",
  components: { Footer, OverlayAddWorker },
  data() {
    return {
      workers: undefined,
      headerConfig: {
        headers: { Authorization: "Bearer " + this.$cookies.get("token") }
      }
    };
  },
  methods: {
    loadWorkers() {
      this.axios
        .get("http://lisc.test/api/panel/workers/list", this.headerConfig)
        .then(response => {
          this.workers = response.data;
          console.log(this.workers);
        })
        .catch(error => console.log(error));
    },
    checkIfValidToken() {
      if (
        this.$cookies.isKey("token") &&
        moment().isBefore(this.$cookies.get("token-valid-until"))
      ) {
        this.axios
          .get("http://lisc.test/api/auth/ping", {
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
    }
  },
  mounted() {
    this.loadWorkers();

    EventBus.$on("update-workers", () => {
      this.loadWorkers();
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
