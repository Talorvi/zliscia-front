<template>
  <div class="align-middle">
    <div
      class="w-full h-screen bg-auto bg-right-bottom"
      :style="{
        backgroundImage: 'url(' + require('@/assets/strefaotwarta.jpg') + ')'
      }"
      style="object-fit: contain; background-repeat: no-repeat; background-size: cover;"
    >
      <div
        class="absolute w-full h-screen bg-white"
        style="z-index: 2; opacity: 0.15;"
      ></div>
      <div class="w-full h-screen flex flex-col justify-center">
        <div
          class="max-w-3xl xl:pl-6 xl:pr-6 ml-4 mr-4 self-center"
          style="z-index: 3;"
        >
          <div>
            <img
              src="../../public/logo_www.png"
              class="h-auto max-h-screen mt-24"
            />
          </div>
        </div>
        <div
          class="self-stretch text-center mb-8 sm:mb-0 pt-24"
          style="z-index: 4;"
        >
          <button
            @click="toReservation"
            class="inline-block text-center bookman w-56 bg-green-700 text-xl px-4 py-4 leading-none border rounded text-white border-white hover:border-green-700 hover:text-green-700 hover:bg-white ml-auto mr-auto transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"
          >
            Zarezerwuj teraz
          </button>
        </div>
      </div>
    </div>
    <div class="pl-4 pr-4 xl:pl-64 xl:pr-64 pt-8 pb-4 flex flex-col">
      <h1 class="text-3xl uppercase bookman">Aktualności</h1>
      <a
        @click="toNews"
        class="text-lg bookman font-semibold leading-none text-green-600 hover:text-green-400 text-right cursor-pointer mt-4 xl:mt-0"
        >Wszystkie aktualności</a
      >
    </div>
    <PostsComponent :main="true"></PostsComponent>
    <!--    <div class="pl-4 pr-4 xl:pl-64 xl:pr-64 pt-8 pb-8">-->
    <!--      <div class="grid grid-cols-1 lg:grid-cols-2 col-gap-8 row-gap-4">-->
    <!--        <div-->
    <!--          class="text-gray-700 bg-white px-4 py-2 border-gray-600 shadow-md rounded"-->
    <!--        >-->
    <!--          <div class="flex flex-col h-full">-->
    <!--            <div class="px-6 py-4 flex-1">-->
    <!--              <div class="font-bold text-xl mb-4 bookman">-->
    <!--                Herbaciarnia-->
    <!--              </div>-->
    <!--              <p>-->
    <!--                Szeroki wybór wybitnych herbat, a także pysznych kaw i świetnej-->
    <!--                shishy to oczywisty punkt wyjścia dobrej herbaciarni.-->
    <!--              </p>-->
    <!--              <br />-->
    <!--              <p>-->
    <!--                Jednak tworząc to wyjątkowe miejsce, postaraliśmy się także o-->
    <!--                możliwość odpoczynku, zrelaksowania się i oddania się dobrej-->
    <!--                zabawie.-->
    <!--              </p>-->
    <!--              <br />-->
    <!--              <p>-->
    <!--                Biorąc pod uwagę zróżnicowane upodobania odwiedzających nas-->
    <!--                gości, zadbaliśmy o szeroką gamę atrakcji w rozmaitych-->
    <!--                klimatach.-->
    <!--              </p>-->
    <!--            </div>-->
    <!--            <div class="px-6 py-4 text-right">-->
    <!--              <a-->
    <!--                href="#"-->
    <!--                class="inline-block text-lg bookman py-4 font-semibold leading-none text-green-600 hover:text-green-400 mt-4 lg:mt-0 ml-auto mr-auto"-->
    <!--                >Czytaj dalej</a-->
    <!--              >-->
    <!--            </div>-->
    <!--          </div>-->
    <!--        </div>-->
    <!--        <div class="text-gray-700 bg-white px-4 py-2 shadow-md rounded flex">-->
    <!--          <div class="flex flex-col h-full">-->
    <!--            <div class="px-6 py-4 flex-1">-->
    <!--              <div class="font-bold text-xl mb-4 bookman">-->
    <!--                Escape room-->
    <!--              </div>-->
    <!--              <p>-->
    <!--                Zdecydowaliśmy się na 2 pokoje zagadek, jeden o niższym, a drugi-->
    <!--                o wyższym stopniu trudności. Co kryją tajemnicze czarne drzwi?-->
    <!--              </p>-->
    <!--              <br />-->
    <!--              <p>-->
    <!--                Wkrótce będzie można się przekonać!-->
    <!--              </p>-->
    <!--            </div>-->
    <!--            <div class="px-6 py-4 text-right">-->
    <!--              <a-->
    <!--                href="#"-->
    <!--                class="inline-block text-lg bookman py-4 font-semibold leading-none text-green-600 hover:text-green-400 mt-4 lg:mt-0 ml-auto mr-auto"-->
    <!--                >Czytaj dalej</a-->
    <!--              >-->
    <!--            </div>-->
    <!--          </div>-->
    <!--        </div>-->
    <!--      </div>-->
    <!--    </div>-->
    <Footer></Footer>
  </div>
</template>

<script>
import Footer from "./Footer";
import PostsComponent from "./PostsComponent";
export default {
  name: "HelloWorld",
  components: { Footer, PostsComponent },
  methods: {
    toReservation() {
      this.$router.push("/rezerwacja", () => {});
    },
    toNews() {
      this.$router.push("/posty", () => {});
    }
  }
};
</script>
