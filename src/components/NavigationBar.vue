<template>
  <div>
    <nav
      class="flex items-center justify-between flex-wrap bg-green-700 p-6 fixed w-full bookman"
      style="z-index: 999;"
    >
      <div
        class="flex items-center flex-shrink-0 text-white mr-6 xl:ml-64 cursor-pointer select-none"
        @click="toMainPage"
      >
        <span class="font-semibold text-xl tracking-tight">
          <img src="../assets/logov2.png" class="h-10" />
        </span>
        <span class="font-semibold text-xl tracking-tight ml-4">
          Z LIŚCIA
        </span>
      </div>
      <div class="block lg:hidden">
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
        id="nav-content"
        class="w-full block flex-grow xl:flex xl:items-center xl:w-auto xl:mr-64 uppercase lg:block"
        v-bind:class="{ hidden: isHidden }"
      >
        <div class="lg:flex-grow lg:text-right">
          <a
            href="#responsive-header"
            class="block mt-4 lg:inline-block lg:mt-0 text-green-100 hover:text-black mr-8"
          >
            Rezerwacje
          </a>
          <a
            href="#responsive-header"
            class="block mt-4 lg:inline-block lg:mt-0 text-green-100 hover:text-black mr-8"
          >
            Galeria
          </a>
          <a
            href="#responsive-header"
            class="block mt-4 lg:inline-block lg:mt-0 text-green-100 hover:text-black mr-8"
          >
            Aktualności
          </a>
          <a
            href="#responsive-header"
            class="block mt-4 lg:inline-block lg:mt-0 text-green-100 hover:text-black mr-8"
          >
            Escape Room
          </a>
          <a
            @click="toContact"
            class="block mt-4 lg:inline-block lg:mt-0 text-green-100 hover:text-black mr-8 cursor-pointer"
          >
            Kontakt
          </a>
          <a
            href="#"
            class="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-green-700 hover:bg-white mt-4 lg:mt-0"
            >Logowanie</a
          >
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: "NavigationBar",
  data() {
    return {
      isHidden: true
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
    }
  }
};
</script>
