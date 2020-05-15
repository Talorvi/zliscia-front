<template>
  <div>
    <div
      class="about h-full pt-20 lg:pt-26 xl:pt-24"
      style="margin-bottom: -65px; padding-bottom: 65px; min-height: 100vh"
    >
      <div
        class="pl-4 pr-4 xl:pl-64 xl:pr-64 pb-8 grid grid-cols-1 ml-auto mr-auto gap-8 mt-8"
      >
        <div
          class="max-w-xl w-full text-gray-700 bg-white px-4 py-2 border-gray-600 shadow-2xl rounded ml-auto mr-auto"
        >
          <div>
            <div class="xl:px-6 py-4 flex flex-col max-w-xs mx-auto">
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
              <p class="mt-6 pb-2 text-center">
                <button
                  id="btn"
                  v-if="!disabled"
                  @click="login"
                  class="inline-block btnanim text-center bookman w-56 bg-green-700 text-xl px-4 py-4 leading-none border rounded text-white border-white hover:border-green-700 hover:text-green-700 hover:bg-white ml-auto mr-auto"
                >
                  Zaloguj
                </button>
                <button
                  disabled
                  v-if="disabled"
                  class="inline-block btnanim text-center bookman w-56 bg-green-200 text-xl px-4 py-4 leading-none border rounded text-white border-white ml-auto mr-auto cursor-not-allowed"
                >
                  <svg
                    version="1.1"
                    id="Layer_1"
                    class="w-4 h-4 ml-auto mr-auto fill-current text-green-700 spin"
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
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>
<script>
import Footer from "../components/Footer";
import Swal from "sweetalert2";
import moment from "moment";
import { EventBus } from "../components/EventBus";

export default {
  name: "Login",
  components: { Footer },
  data() {
    return {
      email: "",
      password: "",
      errors: {
        email: "",
        password: ""
      },
      disabled: false
    };
  },
  methods: {
    login() {
      this.disabled = true;
      this.errors = {
        email: [""],
        password: [""]
      };

      this.axios
        .post("http://lisc.test/api/auth/login", {
          email: this.email,
          password: this.password
        })
        .then(result => {
          this.$cookies.set("token", result.data.access_token);
          this.$cookies.set(
            "token-valid-until",
            moment(result.data.expires_at)
          );
          this.$cookies.set("roles", result.data.roles);
          EventBus.$emit("login-update");
          this.$router.push("/kalendarz", () => {});
        })
        .catch(error => {
          if (error.response.data.errors) {
            this.errors = error.response.data.errors;
          } else if (error.response.data.message) {
            Swal.fire("Błąd", error.response.data.message, "error");
          } else {
            Swal.fire(
              "Błąd",
              "Błąd połączenia z serwerem. Skontaktuj się z właścicielem strony.",
              "error"
            );
          }
        })
        .finally(() => {
          this.disabled = false;
        });

      //this.disabled = false;
    }
  },
  mounted() {}
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
