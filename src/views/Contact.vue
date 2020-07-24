<template>
  <div>
    <div
      class="about min-h-screen h-full pt-20 lg:pt-26 xl:pt-24"
      style="margin-bottom: -65px; padding-bottom: 65px; min-height: 100vh"
    >
      <div class="pl-4 pr-4 xl:pl-64 xl:pr-64 pt-8 pb-4">
        <h1 class="text-3xl mb-4 uppercase bookman">Kontakt</h1>
        <div class="grid grid-cols-1 lg:grid-cols-2 col-gap-8 row-gap-4">
          <div
            class="text-gray-700 bg-white px-4 py-2 border-gray-600 shadow-xl rounded row-span-1"
          >
            <div class="flex flex-col h-full">
              <div class="px-6 py-4 flex-1 text-center">
                <div class="font-bold text-xl mb-4 bookman">
                  Godziny otwarcia
                </div>
                <p class="xl:text-lg">
                  pon - czw: 10:00 - 22:00
                </p>
                <p class="xl:text-lg">
                  pt - sob: 10:00 - 23:00
                </p>
                <p class="xl:text-lg">
                  nd: 14:00 - 22:00
                </p>
              </div>
            </div>
          </div>
          <div class="text-gray-700 bg-white shadow-xl rounded flex row-span-2">
            <div class="flex flex-col w-full">
              <div class="flex-1">
                <iframe
                  class="h-full"
                  src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d2548.992332335865!2d18.668885!3d50.29207100000001!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x716a5f8764cc4c20!2zWiBMacWbY2lh!5e0!3m2!1spl!2spl!4v1576417172470!5m2!1spl!2spl"
                  width="100%"
                  height="100%"
                  frameborder="0"
                  style="border:0;"
                  allowfullscreen=""
                ></iframe>
              </div>
              <div class="px-6 py-4 text-center">
                <a
                  class="inline-block lg:text-lg bookman py-4 leading-none mt-4 lg:mt-0 ml-auto mr-auto"
                  >Gliwice ul. Dunikowskiego 4/3</a
                >
              </div>
            </div>
          </div>
          <div
            class="text-gray-700 bg-white px-4 py-2 shadow-xl rounded flex row-span-1"
          >
            <div class="flex flex-col h-full w-full">
              <div class="px-6 py-4 flex-1 text-center">
                <div class="font-bold text-xl mb-4 bookman">
                  Kontakt
                </div>
                <p class="xl:text-lg">
                  Telefon: +48 886 888 650
                </p>
                <p class="xl:text-lg">
                  E-mail: kontakt@zliscia.com
                </p>
              </div>
            </div>
          </div>
        </div>
        <h1
          class="text-2xl text-center font-semibold mb-12 mt-12 ml-10 mt-8 uppercase bookman"
        >
          Skontaktuj się z nami
        </h1>
        <div
          class="text-gray-700 bg-white px-4 py-2 border-gray-600 shadow-xl rounded row-span-1 max-w-2xl ml-auto mr-auto mb-8"
        >
          <div class="flex flex-col h-full">
            <div class="px-6 py-4 flex-1">
              <p class="pb-2">
                <label for="email" class="font-light">E-mail:</label>
                <input
                  id="email"
                  v-model="email"
                  class="bg-white focus:outline-none border border-gray-400 focus:border-green-600 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
                  type="email"
                  placeholder="E-mail"
                  :disabled="disabled"
                />
                <label
                  for="email"
                  class="font-light text-red-500 text-xs"
                  v-if="errors.from"
                  >{{ errors.from[0] }}</label
                >
              </p>
              <p class="pb-2">
                <label for="topic" class="font-light">Temat:</label>
                <input
                  id="topic"
                  v-model="topic"
                  class="bg-white focus:outline-none border border-gray-400 focus:border-green-600 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
                  type="email"
                  placeholder="Temat"
                  :disabled="disabled"
                />
                <label
                  for="topic"
                  class="font-light text-red-500 text-xs"
                  v-if="errors.topic"
                  >{{ errors.topic[0] }}</label
                >
              </p>
              <p class="pb-2">
                <label for="text" class="font-light">Treść:</label>
                <textarea
                  v-model="text"
                  id="text"
                  class="bg-white focus:outline-none border border-gray-400 focus:border-green-600 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
                  type="email"
                  placeholder="Treść"
                  :disabled="disabled"
                ></textarea>
                <label
                  for="text"
                  class="font-light text-red-500 text-xs"
                  v-if="errors.text"
                  >{{ errors.text[0] }}</label
                >
              </p>
              <p class="mt-6 pb-2 text-center">
                <button
                  id="btn"
                  v-if="!disabled"
                  @click="sendEmail"
                  class="inline-block btnanim text-center bookman w-56 bg-green-700 text-xl px-4 py-4 leading-none border rounded text-white border-white hover:border-green-700 hover:text-green-700 hover:bg-white ml-auto mr-auto"
                >
                  Wyślij zapytanie
                </button>
                <button
                  disabled
                  v-if="disabled"
                  @click="sendEmail"
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
                  </svg></button
                ><br />
                <label
                  for="btn"
                  class="text-green-700 text-lg"
                  v-if="message"
                  >{{ message }}</label
                >
                <label
                  for="btn"
                  class="text-red-500 text-lg"
                  v-if="errors.server"
                  >{{ errors.server }}</label
                >
              </p>
              <div class="font-light pt-4 text-center w-full text-sm">
                Wypełnienie formularza oznacza, że podane w nim dane osobowe
                będą przetwarzane w celu nawiązania kontaktu i przedstawienia
                oferty. Zasady przetwarzania i informacje o administratorze
                znajdziesz
                <span
                  class="text-green-700 font-semibold cursor-pointer hover:text-green-500"
                  @click="$router.push('polityka-prywatnosci', () => {})"
                  >tutaj</span
                >.
              </div>
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
export default {
  name: "Contact",
  data() {
    return {
      email: "",
      topic: "",
      text: "",
      disabled: false,
      errors: {
        text: undefined,
        from: undefined,
        subject: undefined,
        server: undefined
      },
      message: undefined
    };
  },
  components: { Footer },
  methods: {
    sendEmail() {
      this.disabled = true;

      this.axios
        .post("https://www.lisc.polarlooptheory.pl/api/form/contact", {
          from: this.email,
          topic: this.topic,
          text: this.text,
          server: this.server
        })
        // eslint-disable-next-line no-unused-vars
        .then(response => {
          this.email = "";
          this.topic = "";
          this.text = "";
          this.errors = {
            text: undefined,
            from: undefined,
            subject: undefined,
            server: undefined
          };
          this.message = response.data.data.message;
        })
        // eslint-disable-next-line no-unused-vars
        .catch(error => {
          this.errors = error.response.data.errors;
        })
        .finally(() => {
          this.disabled = false;
        });
    }
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
