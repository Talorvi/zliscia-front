<template>
  <div>
    <div
      class="about min-h-screen h-full pt-20 lg:pt-26 xl:pt-24"
      style="margin-bottom: -65px; padding-bottom: 65px; min-height: 100vh"
    >
      <div class="pl-4 pr-4 xl:pl-64 xl:pr-64 pt-8 pb-4">
        <h1 class="text-3xl mb-4 uppercase bookman">Escape room</h1>
        <div class="grid grid-cols-1 lg:grid-cols-2 col-gap-0 row-gap-0">
          <div
            class="text-gray-700 bg-white px-4 py-2 border-gray-600 shadow-xl rounded-t lg:rounded-t-none lg:rounded-l row-span-1"
          >
            <div class="flex flex-col h-full">
              <div
                class="px-6 py-4 flex-1 text-center w-full h-full flex flex-col justify-center items-center"
              >
                <div class="font-bold text-2xl lg:text-4xl mb-8 bookman">
                  Więcej informacji wkrótce
                </div>
                <p class="xl:text-lg">
                  Zacznij śledzić nas na Instagramie i Facebooku, aby dowiedzieć
                  się kiedy nastąpi otwarcie.
                </p>
                <div class="mt-4">
                  <a
                    href="https://www.instagram.com/zliscia/"
                    target="_blank"
                    class="text-green-500 hover:text-green-400 mr-4"
                    ><i class="fab fa-instagram fa-2x"></i
                  ></a>
                  <a
                    href="https://www.facebook.com/zliscia/"
                    target="_blank"
                    class="text-green-500 hover:text-green-400"
                    ><i class="fab fa-facebook fa-2x"></i
                  ></a>
                </div>
              </div>
            </div>
          </div>
          <div class="text-gray-700 bg-white shadow-xl rounded flex row-span-1">
            <div class="flex flex-col w-full">
              <div class="flex-1">
                <img
                  src="https://i.imgur.com/uOqzyHR.jpg"
                  class="w-full object-cover rounded-b lg:rounded-r lg:rounded-b-none"
                  style="height: 26rem"
                />
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
