<template>
  <footer
    class="w-full bg-gray-900 text-gray-200 flex flex-row justify-between items-center pt-4 pb-4 xl:pr-64 xl:pl-64 pr-4 pl-4"
  >
    <span
      class="self-start text-center h-full flex flex-col md:flex-row flex-1"
    >
      <span class="self-center select-all mr-2 sm:mr-4">
        +48 886 888 650
      </span>
      <span>
        <a
          href="https://www.instagram.com/zliscia/"
          target="_blank"
          class="text-green-500 hover:text-green-400 mr-2 sm:mr-4"
          ><i class="fab fa-instagram fa-2x"></i
        ></a>
        <a
          href="https://www.facebook.com/zliscia/"
          target="_blank"
          class="text-green-500 hover:text-green-400"
          ><i class="fab fa-facebook fa-2x"></i
        ></a>
      </span>
    </span>
    <span class="flex flex-col md:block flex-1">
      <div class="flex flex-col md:flex-row">
        <span
          class="text-green-500 cursor-pointer md:mr-4 hover:text-green-400 ml-auto"
          @click="toPolityka"
          >Polityka prywatności</span
        >
        <span class="text-right"
          >@2020 by
          <a href="https://www.polarlooptheory.pl">Polar Loop Theory</a>
        </span>
      </div>
    </span>
  </footer>
</template>

<script>
import { library } from "@fortawesome/fontawesome-svg-core";
import { faFontAwesome } from "@fortawesome/free-brands-svg-icons";

library.add(faFontAwesome);

export default {
  name: "Footer",
  methods: {
    toPolityka() {
      this.$router.push("/polityka-prywatnosci", () => {});
    }
  }
};
</script>
