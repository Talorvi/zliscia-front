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
          <div
            class="flex flex-row justify-end text-green-700 font-semibold hover:text-green-400 cursor-pointer mb-4"
            @click="addWorker"
          >
            Dodaj pracownika
          </div>
          <div class="overflow-x-auto border-gray-600 shadow-md">
            <table class="w-full">
              <thead>
                <tr>
                  <th class="px-4 py-2">Użytkownik</th>
                  <th class="px-4 py-2">Email</th>
                  <th class="px-4 py-2">Akcje</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="worker in workers" :key="worker.email">
                  <td class="border px-4 py-2">{{ worker.name }}</td>
                  <td class="border px-4 py-2">{{ worker.email }}</td>
                  <td class="border px-4 py-2 text-md">
                    <div class="flex flex-row justify-around">
                      <button
                        v-if="worker.disabled === '0'"
                        class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-2 rounded w-32"
                        @click="disableWorker(worker.id)"
                      >
                        Zablokuj
                      </button>
                      <button
                        v-else
                        class="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded w-32"
                        @click="enableWorker(worker.id)"
                      >
                        Odblokuj
                      </button>
                      <button
                        class="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded w-32 ml-2 md:ml-0"
                        @click="removeWorker(worker.id)"
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
    },
    // eslint-disable-next-line no-unused-vars
    addWorker() {
      EventBus.$emit("show-add-worker");
    },
    disableWorker(id) {
      this.axios
        .post(
          "http://lisc.test/api/panel/workers/disable",
          {
            id: id
          },
          this.headerConfig
        )
        .then(() => {
          for (let i = 0; i < this.workers.length; i++) {
            if (this.workers[i].id === id) {
              this.workers[i].disabled = "1";
              break;
            }
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    enableWorker(id) {
      this.axios
        .post(
          "http://lisc.test/api/panel/workers/enable",
          {
            id: id
          },
          this.headerConfig
        )
        .then(() => {
          for (let i = 0; i < this.workers.length; i++) {
            if (this.workers[i].id === id) {
              this.workers[i].disabled = "0";
              break;
            }
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    removeWorker(id) {
      Swal.queue([
        {
          text: "Czy na pewno chcesz usunąć pracownika?",
          icon: "question",
          confirmButtonText: "Tak",
          cancelButtonText: "Anuluj",
          showLoaderOnConfirm: true,
          showCancelButton: true,
          focusConfirm: false,
          preConfirm: () => {
            return this.axios
              .post(
                "http://lisc.test/api/panel/workers/remove",
                {
                  id: id
                },
                this.headerConfig
              )
              .then(() => {
                for (let i = 0; i < this.workers.length; i++) {
                  if (this.workers[i].id === id) {
                    this.$delete(this.workers, i);
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
