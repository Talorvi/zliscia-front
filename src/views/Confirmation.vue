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
          class="max-w-3xl w-full text-gray-700 bg-white px-4 py-2 border-gray-600 shadow-2xl rounded ml-auto mr-auto"
        >
          <div>
            <div class="xl:px-6 py-4 flex flex-col">
              <div class="flex flex-row justify-center mb-8" v-if="message">
                <svg
                  xmlns:svg="http://www.w3.org/2000/svg"
                  xmlns="http://www.w3.org/2000/svg"
                  id="svg8"
                  version="1.1"
                  viewBox="0 0 77.607933 148.53207"
                  class="fill-current text-green-700 w-16"
                >
                  <defs id="defs2">
                    <clipPath id="clipPath18" clipPathUnits="userSpaceOnUse">
                      <path id="path16" d="M 19.448,0 H 255 V 460 H 19.448 Z" />
                    </clipPath>
                    <clipPath id="clipPath32" clipPathUnits="userSpaceOnUse">
                      <path id="path30" d="M 0,460 H 255 V 0 H 0 Z" />
                    </clipPath>
                    <clipPath id="clipPath40" clipPathUnits="userSpaceOnUse">
                      <path
                        id="path38"
                        d="M 162.851,234.924 H 255.96 V 218.937 H 162.851 Z"
                      />
                    </clipPath>
                    <clipPath id="clipPath56" clipPathUnits="userSpaceOnUse">
                      <path
                        id="path54"
                        d="m 155.411,259.258 h 64.595 v -9.623 h -64.595 z"
                      />
                    </clipPath>
                    <clipPath id="clipPath72" clipPathUnits="userSpaceOnUse">
                      <path
                        id="path70"
                        d="m 219.635,272.492 h 35.161 v -18.483 h -35.161 z"
                      />
                    </clipPath>
                    <clipPath id="clipPath88" clipPathUnits="userSpaceOnUse">
                      <path
                        id="path86"
                        d="m 150.177,296.064 h 35.104 v -18.631 h -35.104 z"
                      />
                    </clipPath>
                    <clipPath id="clipPath104" clipPathUnits="userSpaceOnUse">
                      <path id="path102" d="M 186.984,282.157 Z" />
                    </clipPath>
                    <clipPath id="clipPath116" clipPathUnits="userSpaceOnUse">
                      <path id="path114" d="M 193.234,285.17 Z" />
                    </clipPath>
                    <clipPath id="clipPath128" clipPathUnits="userSpaceOnUse">
                      <path
                        id="path126"
                        d="m 186.415,297.391 h 19.55 v -18.924 h -19.55 z"
                      />
                    </clipPath>
                    <clipPath id="clipPath144" clipPathUnits="userSpaceOnUse">
                      <path
                        id="path142"
                        d="M 169.218,342.719 H 301.392 V 54.3429 H 169.218 Z"
                      />
                    </clipPath>
                    <clipPath id="clipPath160" clipPathUnits="userSpaceOnUse">
                      <path
                        id="path158"
                        d="m 122.678,425.48 h 197.71 V 188.261 h -197.71 z"
                      />
                    </clipPath>
                    <clipPath id="clipPath176" clipPathUnits="userSpaceOnUse">
                      <path id="path174" d="M 0,460 H 255 V 0 H 0 Z" />
                    </clipPath>
                    <clipPath id="clipPath184" clipPathUnits="userSpaceOnUse">
                      <path
                        id="path182"
                        d="M 16.27,440.854 H 236.261 V 19.8179 H 16.27 Z"
                      />
                    </clipPath>
                    <clipPath clipPathUnits="userSpaceOnUse" id="clipPath255">
                      <path
                        d="M 19.448,0 H 255 V 460 H 19.448 Z"
                        id="path253"
                      />
                    </clipPath>
                    <clipPath clipPathUnits="userSpaceOnUse" id="clipPath269">
                      <path d="M 0,460 H 255 V 0 H 0 Z" id="path267" />
                    </clipPath>
                    <clipPath clipPathUnits="userSpaceOnUse" id="clipPath277">
                      <path
                        d="M 162.851,234.924 H 255.96 V 218.937 H 162.851 Z"
                        id="path275"
                      />
                    </clipPath>
                    <clipPath clipPathUnits="userSpaceOnUse" id="clipPath293">
                      <path
                        d="m 155.411,259.258 h 64.595 v -9.623 h -64.595 z"
                        id="path291"
                      />
                    </clipPath>
                    <clipPath clipPathUnits="userSpaceOnUse" id="clipPath309">
                      <path
                        d="m 219.635,272.492 h 35.161 v -18.483 h -35.161 z"
                        id="path307"
                      />
                    </clipPath>
                    <clipPath clipPathUnits="userSpaceOnUse" id="clipPath325">
                      <path
                        d="m 150.177,296.064 h 35.104 v -18.631 h -35.104 z"
                        id="path323"
                      />
                    </clipPath>
                    <clipPath clipPathUnits="userSpaceOnUse" id="clipPath341">
                      <path d="M 186.984,282.157 Z" id="path339" />
                    </clipPath>
                    <clipPath clipPathUnits="userSpaceOnUse" id="clipPath353">
                      <path d="M 193.234,285.17 Z" id="path351" />
                    </clipPath>
                    <clipPath clipPathUnits="userSpaceOnUse" id="clipPath365">
                      <path
                        d="m 186.415,297.391 h 19.55 v -18.924 h -19.55 z"
                        id="path363"
                      />
                    </clipPath>
                    <clipPath clipPathUnits="userSpaceOnUse" id="clipPath381">
                      <path
                        d="M 169.218,342.719 H 301.392 V 54.3429 H 169.218 Z"
                        id="path379"
                      />
                    </clipPath>
                    <clipPath clipPathUnits="userSpaceOnUse" id="clipPath397">
                      <path
                        d="m 122.678,425.48 h 197.71 V 188.261 h -197.71 z"
                        id="path395"
                      />
                    </clipPath>
                    <clipPath clipPathUnits="userSpaceOnUse" id="clipPath413">
                      <path d="M 0,460 H 255 V 0 H 0 Z" id="path411" />
                    </clipPath>
                    <clipPath clipPathUnits="userSpaceOnUse" id="clipPath421">
                      <path
                        d="M 16.27,440.854 H 236.261 V 19.8179 H 16.27 Z"
                        id="path419"
                      />
                    </clipPath>
                  </defs>
                  <metadata id="metadata5">
                    <rdf:RDF>
                      <cc:Work rdf:about="">
                        <dc:format>image/svg+xml</dc:format>
                        <dc:type
                          rdf:resource="http://purl.org/dc/dcmitype/StillImage"
                        />
                        <dc:title></dc:title>
                      </cc:Work>
                    </rdf:RDF>
                  </metadata>
                  <g transform="translate(-42.014935,-100.66921)" id="layer1">
                    <g
                      id="g247"
                      transform="matrix(0.35277777,0,0,-0.35277777,35.141312,262.61819)"
                    >
                      <g transform="translate(3.2142875,18.214286)" id="g407">
                        <g id="g409" clip-path="url(#clipPath413)">
                          <g id="g415">
                            <g id="g417" />
                            <g id="g469">
                              <g clip-path="url(#clipPath421)" id="g467">
                                <g
                                  transform="translate(225.0096,258.5237)"
                                  id="g425"
                                >
                                  <path
                                    d="m 0,0 c 21,-12.5 10.18,-32.8 -12.54,-34.04 -9.05,-0.5 -13.12,-5.17 -13.12,-5.17 -9,10.04 -3.17,13.86 10,15.71 8.41,1.18 16.33,9.33 -1.1,18.1 -13.98,7.03 -29.21,11.13 -63.9,23.27 -19.63,6.87 -32.95,18.68 -41.12,30.67 -14.04,20.62 -18.06,38.68 -20.91,52.44 -6.98,33.78 -9.51,79.07 -9.63,81.35 0.26,-2.47 5.97,-55.47 12.7,-80.97 4.29,-16.25 11.29,-33.49 19.33,-44.41 17.62,-23.93 39.04,-30.04 60.36,-36.07 C -37.78,14.62 -21.17,12.6 0,0"
                                    id="path423"
                                  />
                                </g>
                                <g
                                  transform="translate(184.5496,224.9837)"
                                  id="g429"
                                >
                                  <path
                                    d="M 0,0 C 18.97,-14.89 29.39,-27.09 28.92,-45.13 28.46,-63.17 11.38,-78.54 11.38,-78.54 l -0.01,-0.01 h -0.01 c -0.39,-0.17 -6.77,-2.93 -13.03,-7.31 -4.69,-3.29 -9.4,-6.08 -11.61,-7.35 1.1,1.24 1.74,1.92 1.74,1.92 0,0 -1.22,6.64 -7.83,0.83 -0.19,-0.17 -0.38,-0.33 -0.57,-0.5 l -8.93,5 c 0,0 36.9,17.94 37.76,44.41 0.56,17.2 -16.53,37.33 -54.09,55.17 -31.46,14.94 -50.74,27.21 -61.42,45.68 -14.17,24.51 -9.38,53.1 -9.38,53.1 -0.91,-39.58 13.04,-58.42 43.24,-75.28 C -41.62,19.73 -21.01,16.48 0,0"
                                    id="path427"
                                  />
                                </g>
                                <g
                                  transform="translate(198.1796,98.0337)"
                                  id="g433"
                                >
                                  <path
                                    d="M 0,0 C 8.67,-14.55 20.27,-28.59 9.83,-53.84 -0.61,-79.09 -25.75,-82.76 -44,-73.76 c -18.25,9 -32.07,28.49 -27.4,55.28 5.33,30.6 25.78,44.03 37.83,54.47 l 5.35,-3 c 0,0 0.48,0.27 1.31,0.75 -5.77,-6.56 -24.06,-28.65 -24.42,-46.08 -0.34,-16 3.33,-35.42 26.5,-39.67 18.07,-3.31 31,7.5 28.83,27.17 -2.2,19.98 -16.67,29.83 -20.32,45.32 -3.3,14.01 13.42,27.41 14.05,27.92 h 0.01 C -25.33,23.82 -8.7,14.61 0,0"
                                    id="path431"
                                  />
                                </g>
                                <g
                                  transform="translate(173.0096,133.6937)"
                                  id="g437"
                                >
                                  <path
                                    d="M 0,0 C 0,0 -0.64,-0.68 -1.74,-1.92 -2.57,-2.4 -3.05,-2.67 -3.05,-2.67 l -5.35,3 c 0.19,0.17 0.38,0.33 0.57,0.5 C -1.22,6.64 0,0 0,0"
                                    id="path435"
                                  />
                                </g>
                                <g
                                  transform="translate(110.8396,193.8037)"
                                  id="g441"
                                >
                                  <path
                                    d="m 0,0 c 47.89,1.49 35.98,17.68 57.21,15.94 0,0 -5.13,-27.94 -62.36,-33.44 -41.23,-3.96 -76.49,19.44 -85.9,51.59 -8.92,30.48 0.22,62.69 15.03,88.49 14.81,25.81 20.67,37.44 24.51,48.51 12.08,34.88 13.35,75.55 13.35,75.55 0,0 0.64,-42.82 -11,-76.5 -15.42,-44.66 -23.6,-43.99 -30.22,-70.8 C -86.01,72.5 -80.17,48.12 -65.69,30.69 -44.83,5.58 -19.49,-0.6 0,0"
                                    id="path439"
                                  />
                                </g>
                                <g
                                  transform="translate(161.2196,267.3837)"
                                  id="g445"
                                >
                                  <path
                                    d="m 0,0 c 0,0 2.57,-7.69 -2.63,-15.35 -5.35,-7.89 -10.63,-4.09 -8.68,0.24 C -8.1,-7.96 -2.08,-11.38 0,0"
                                    id="path443"
                                  />
                                </g>
                                <g
                                  transform="translate(122.3196,236.8837)"
                                  id="g449"
                                >
                                  <path
                                    d="M 0,0 C 12.32,0.97 14.71,-11.15 -2.82,-10.45 -28.74,-9.41 -50.85,4.67 -51.53,5.11 -13.82,-6.78 -18.73,-1.47 0,0"
                                    id="path447"
                                  />
                                </g>
                                <g
                                  transform="translate(114.5296,285.5637)"
                                  id="g453"
                                >
                                  <path
                                    d="M 0,0 C 0,0 3.64,-5.41 1.24,-12.46 -1.22,-19.71 -6.12,-17.9 -5.54,-14.13 -4.58,-7.91 0.82,-9.27 0,0"
                                    id="path451"
                                  />
                                </g>
                                <g
                                  transform="translate(90.2196,307.7237)"
                                  id="g457"
                                >
                                  <path
                                    d="m 0,0 c 0,0 1.12,-5.53 -3.13,-10.38 -4.37,-5 -7.7,-1.92 -5.98,0.91 2.83,4.66 6.7,1.78 9.11,9.47"
                                    id="path455"
                                  />
                                </g>
                                <g
                                  transform="translate(83.9096,264.6537)"
                                  id="g461"
                                >
                                  <path
                                    d="M 0,0 C 11.32,-2.35 7.75,-7.47 -8.78,-5.69 -18.94,-4.6 -32.84,2.73 -32.84,2.73 -11.06,-2.76 -8.65,1.79 0,0"
                                    id="path459"
                                  />
                                </g>
                                <g
                                  transform="translate(63.9596,295.9737)"
                                  id="g465"
                                >
                                  <path
                                    d="M 0,0 C 4.52,-0.5 3.68,-6.28 -2.46,-4.61 -11.4,-2.17 -17.27,5.82 -17.63,6.32 -5.87,-2.07 -6.88,0.76 0,0"
                                    id="path463"
                                  />
                                </g>
                              </g>
                            </g>
                          </g>
                        </g>
                      </g>
                    </g>
                  </g>
                </svg>
              </div>
              <div v-if="!message">
                <span
                  ><svg
                    version="1.1"
                    id="Layer_1"
                    class="w-8 h-8 ml-auto mr-auto fill-current text-green-700 spin"
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
                    <g></g></svg
                ></span>
              </div>
              <div class="flex flex-col" v-if="message">
                <span class="flex-1 text-2xl">{{ message }}</span>
                <span class="mt-1"
                  >W razie dodatkowych pytań, bądź chęci odwołania rezerwacji,
                  zapraszamy do
                  <span
                    class="text-green-700 font-bold cursor-pointer"
                    @click="toContact"
                    >kontaktu</span
                  >.</span
                >
                <button
                  data-v-df212a54=""
                  @click="toMainPage"
                  class="mt-8 inline-block btnanim text-center bookman w-64 bg-green-700 text-xl px-4 py-4 leading-none border rounded text-white border-white hover:border-green-700 hover:text-green-700 hover:bg-white ml-auto mr-auto"
                >
                  Wróć do strony głównej
                </button>
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
  name: "Confirmation",
  components: { Footer },
  props: ["id", "code"],
  data() {
    return {
      message: ""
    };
  },
  methods: {
    toContact() {
      this.$router.push("/kontakt", () => {});
    },
    toMainPage() {
      this.$router.push("/", () => {});
    }
  },
  mounted() {
    if (!this.id || !this.code) {
      this.message = "Niepoprawny kod weryfikacji.";
    } else {
      this.axios
        .post("https://www.lisc.polarlooptheory.pl/api/reservation/confirm", {
          id: this.id,
          code: this.code
        })
        .then(response => {
          this.message = response.data.message;
        })
        .catch(error => {
          if (error.response.data.message) {
            this.message = error.response.data.message;
          } else {
            this.message = "Potwierdzenie rezerwacji nie udało się.";
          }
        })
        .finally(() => {
          if (this.message.length === 0) {
            this.message = "Potwierdzenie rezerwacji nie udało się.";
          }
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
