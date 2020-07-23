<template>
  <div>
    <nav
      id="navbar"
      class="flex items-center justify-between flex-wrap bg-green-700 p-6 fixed w-full bookman"
      style="z-index: 999;"
    >
      <div
        class="flex items-center flex-shrink-0 text-white mr-6 xl:ml-64 cursor-pointer select-none"
        @click="toMainPage"
      >
        <span class="font-semibold text-xl tracking-tight">
          <img src="../assets/mini-logo.svg" class="h-10" />
        </span>
        <!--        <span class="font-semibold text-xl tracking-tight ml-4">-->
        <!--          Z LIŚCIA-->
        <!--        </span>-->
      </div>
      <div class="block xl:hidden">
        <button
          class="flex items-center px-3 py-2 border rounded text-green-100 border-green-200 hover:text-white hover:border-white"
          @click="toggle"
        >
          <svg
            class="fill-current h-3 w-3"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </div>
      <div
        v-if="!loggedIn"
        id="nav-content"
        class="block flex-grow xl:flex xl:items-center xl:w-auto xl:mr-64 uppercase xl:block w-full"
        v-bind:class="{ hidden: isHidden }"
      >
        <div class="xl:flex-grow xl:text-right">
          <a
            @click="toReservation"
            class="block mt-4 xl:inline-block xl:mt-0 text-green-100 hover:text-black xl:mr-8 text-center cursor-pointer"
          >
            Rezerwacja
          </a>
          <!--          <a-->
          <!--            href="#responsive-header"-->
          <!--            class="block mt-4 lg:inline-block lg:mt-0 text-green-100 hover:text-black mr-8"-->
          <!--          >-->
          <!--            Galeria-->
          <!--          </a>-->
          <a
            @click="toNews"
            class="block mt-4 xl:inline-block xl:mt-0 text-green-100 hover:text-black xl:mr-8 text-center cursor-pointer"
          >
            Aktualności
          </a>
          <a
            @click="toContact"
            class="block mt-4 xl:inline-block xl:mt-0 text-green-100 hover:text-black xl:mr-8 text-center cursor-pointer"
          >
            Kontakt
          </a>
          <a
            @click="toLogin"
            class="inline-block ml-auto mr-auto w-full xl:w-auto cursor-pointer text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-green-700 hover:bg-white mt-4 xl:mt-0 xl:mr-8 text-center "
            >Logowanie</a
          >
        </div>
      </div>
      <div
        v-else
        id="nav-content"
        class="w-full block flex-grow xl:flex xl:items-center xl:w-auto xl:mr-64 uppercase lg:block"
        v-bind:class="{ hidden: isHidden }"
      >
        <div class="lg:flex-grow lg:text-right">
          <a
            v-if="
              this.roles !== undefined &&
                (this.roles.includes('owner') ||
                  this.roles.includes('webmaster'))
            "
            @click="toNewsEdit"
            class="block mt-4 lg:inline-block lg:mt-0 text-green-100 hover:text-black mr-8 cursor-pointer"
          >
            Aktualności
          </a>
          <a
            v-if="
              this.roles !== undefined &&
                (this.roles.includes('owner') ||
                  this.roles.includes('webmaster'))
            "
            @click="toWorkers"
            class="block mt-4 lg:inline-block lg:mt-0 text-green-100 hover:text-black mr-8 cursor-pointer"
          >
            Pracownicy
          </a>
          <a
            v-if="
              this.roles !== undefined &&
                (this.roles.includes('owner') ||
                  this.roles.includes('webmaster') ||
                  this.roles.includes('worker'))
            "
            @click="toPanel"
            class="block mt-4 lg:inline-block lg:mt-0 text-green-100 hover:text-black mr-8 cursor-pointer"
          >
            Panel
          </a>
          <a
            @click="logout"
            class="inline-block cursor-pointer text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-green-700 hover:bg-white mt-4 lg:mt-0"
            >Wyloguj</a
          >
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import { EventBus } from "./EventBus";
import Swal from "sweetalert2";
export default {
  name: "NavigationBar",
  data() {
    return {
      isHidden: true,
      loggedIn: false,
      roles: undefined,
      toast: Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 2500,
        timerProgressBar: true,
        onOpen: toast => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        }
      })
    };
  },
  methods: {
    toggle() {
      this.isHidden = !this.isHidden;
    },
    toMainPage() {
      this.$router.push("/", () => {});
    },
    toContact() {
      this.$router.push("/kontakt", () => {});
      this.isHidden = true;
    },
    toReservation() {
      this.$router.push("/rezerwacja", () => {});
      this.isHidden = true;
    },
    toLogin() {
      this.$router.push("/logowanie", () => {});
      this.isHidden = true;
    },
    toPanel() {
      this.$router.push("/kalendarz", () => {});
      this.isHidden = true;
    },
    toNews() {
      this.$router.push("/posty", () => {});
      this.isHidden = true;
    },
    toNewsEdit() {
      this.$router.push("/zarzadzaj-postami", () => {});
      this.isHidden = true;
    },
    logout() {
      this.$router.push("/", () => {});
      this.$axios
        .get("https://www.lisc.polarlooptheory.pl/api/auth/logout", {
          headers: { Authorization: "Bearer " + this.$cookies.get("token") }
        })
        .then(() => {
          this.$cookies.remove("token");
          this.$cookies.remove("token-valid-until");
          this.$cookies.remove("roles");
          EventBus.$emit("login-update");
        });
      this.isHidden = true;
      this.toast.fire({
        icon: "success",
        title: "Nastąpiło poprawne wylogowanie się z serwisu"
      });
    },
    toWorkers() {
      this.$router.push("/pracownicy", () => {});
      this.isHidden = true;
    }
  },
  mounted() {
    this.loggedIn = this.$cookies.isKey("token");
    if (this.loggedIn) {
      this.roles = this.$cookies.get("roles").split(",");
    } else {
      this.roles = undefined;
    }

    EventBus.$on("login-update", () => {
      this.loggedIn = this.$cookies.isKey("token");
      console.log(this.loggedIn);
      if (this.loggedIn) {
        this.roles = this.$cookies.get("roles").split(",");
      } else {
        this.roles = undefined;
      }
    });

    // var prevScrollpos = window.pageYOffset;
    // window.onscroll = function() {
    //   var currentScrollPos = window.pageYOffset;
    //   if (prevScrollpos > currentScrollPos) {
    //     document.getElementById("navbar").style.top = "0";
    //   } else {
    //     document.getElementById("navbar").style.top = "-100px";
    //   }
    //   prevScrollpos = currentScrollPos;
    // };
  }
};
</script>

<style scoped>
#navbar {
  transition: top 0.3s;
}
</style>
