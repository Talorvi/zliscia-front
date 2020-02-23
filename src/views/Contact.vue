<template>
  <div>
    <div
      class="about min-h-screen h-full pt-20 lg:pt-26 xl:pt-24"
      style="margin-bottom: -56px; padding-bottom: 56px"
    >
      <div class="pl-4 pr-4 xl:pl-64 xl:pr-64 pt-8 pb-4">
        <h1 class="text-3xl mb-4 ml-10 uppercase">Kontakt</h1>
        <div class="grid grid-cols-1 lg:grid-cols-2 col-gap-8 row-gap-4">
          <div
            class="text-gray-700 bg-white px-4 py-2 border-gray-600 shadow-xl rounded row-span-1"
          >
            <div class="flex flex-col h-full">
              <div class="px-6 py-4 flex-1 text-center">
                <div class="font-bold text-xl mb-4">
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
                <div class="font-bold text-xl mb-4">
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
          class="text-2xl text-center font-semibold mb-12 mt-12 ml-10 mt-8 uppercase"
        >
          Skontaktuj się z nami
        </h1>
        <div
          class="text-gray-700 bg-white px-4 py-2 border-gray-600 shadow-xl rounded row-span-1 max-w-4xl ml-auto mr-auto mb-8"
        >
          <div class="flex flex-col h-full">
            <div class="px-6 py-4 flex-1">
              <p class="pb-2">
                <span class="font-light">E-mail:</span>
                <input
                  class="bg-white focus:outline-none border border-gray-400 focus:border-green-600 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
                  type="email"
                  placeholder="E-mail"
                />
              </p>
              <p class="pb-2">
                <span class="font-light">Temat:</span>
                <input
                  class="bg-white focus:outline-none border border-gray-400 focus:border-green-600 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
                  type="email"
                  placeholder="Temat"
                />
              </p>
              <p class="pb-2">
                <span class="font-light">Treść:</span>
                <textarea
                  class="bg-white focus:outline-none border border-gray-400 focus:border-green-600 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
                  type="email"
                  placeholder="Treść"
                ></textarea>
              </p>
              <p class="mt-6 pb-2 text-center">
                <a
                  href="#"
                  class="inline-block text-center bookman w-56 bg-green-700 text-xl px-4 py-4 leading-none border rounded text-white border-white hover:border-green-700 hover:text-green-700 hover:bg-white ml-auto mr-auto"
                  >Wyślij zapytanie</a
                >
              </p>
              <div class="font-light pt-4 text-center w-full">
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
  components: { Footer }
};
</script>
