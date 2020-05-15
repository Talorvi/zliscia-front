<template>
  <div
    v-if="show"
    id="overlay"
    class="flex flex-row justify-center content-center items-center text-xs md:text-base"
  >
    <div
      class="text-gray-700 bg-white px-4 py-2 border-gray-600 shadow-2xl rounded max-w-xl max-h-screen w-full"
    >
      <div class="flex flex-col h-full">
        <div class="px-6 py-4 flex-1 mb-4">
          <div class="flex flex-row mb-4 items-center">
            <div class="flex-1 text-2xl font-semibold">
              Dodaj rezerwację
            </div>
            <div
              class="p-2 cursor-pointer hover:font-bold text-green-700"
              @click="close"
            >
              X
            </div>
          </div>
          <div id="date">
            <div
              class="w-full flex flex-row justify-center items-center mb-4"
              v-if="!loadingRooms"
            >
              <p class="pr-4">Pokój:</p>
              <v-select
                :options="roomsDropDownList"
                v-model="currentTable"
                class="w-48"
              ></v-select>
            </div>

            <v-date-picker
              color="green"
              is-inline
              v-model="date"
              :min-date="new Date()"
              :max-date="Date.now() + 6.04e8 * 12"
              class="ml-auto mr-auto"
              @input="test"
              is-required
            >
            </v-date-picker>
            <div
              class="flex flex-col md:flex-row justify-center md:justify-around mt-4"
            >
              <vue-timepicker
                format="HH:mm"
                :minute-interval="15"
                v-model="hourFrom"
                class="ml-auto mr-auto"
                :hour-range="hourRangeFrom"
                :minute-range="minuteRangeFrom"
                @change="changeHandlerFrom"
                hide-clear-button
              ></vue-timepicker>
              <span class="ml-auto mr-auto">do</span>
              <vue-timepicker
                format="HH:mm"
                :minute-interval="15"
                v-model="hourTo"
                class="ml-auto mr-auto"
                :hour-range="hourRangeTo"
                :minute-range="minuteRangeTo"
                @change="changeHandlerTo"
                hide-clear-button
              ></vue-timepicker>
            </div>
            <div class="xl:px-6 py-4">
              <p class="max-w-sm ml-auto mr-auto mb-4">
                <label for="name" class="font-light">Imię Nazwisko:</label>
                <input
                  id="name"
                  v-model="name"
                  @keyup="updateCredentialsName"
                  class="bg-white focus:outline-none border border-gray-400 focus:border-green-600 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
                  type="text"
                  placeholder="Imię Nazwisko"
                />
                <label
                  for="name"
                  v-if="!credentialsProperName"
                  class="mt-4 text-xs text-red-500"
                >
                  Proszę podać poprawne dane.
                </label>
              </p>
            </div>
            <div v-if="!hourProper" class="mt-4 text-center text-red-500">
              {{ message }}
            </div>
            <div v-if="!loadedRooms" class="mt-4 text-center text-red-500">
              {{ messageRooms }}
            </div>
            <div class="xl:px-6 py-4" v-if="loadingRooms">
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
          </div>
          <div
            v-if="currentTable && credentialsProperName"
            class="flex flex-row justify-end text-green-700 font-semibold hover:text-green-400 cursor-pointer mt-4"
            @click="addReservation"
          >
            Dodaj rezerwację
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import VueTimepicker from "vue2-timepicker";
import "vue2-timepicker/dist/VueTimepicker.css";
import moment from "moment";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import Swal from "sweetalert2";
import { EventBus } from "./EventBus";

export default {
  name: "OverlayAddReservation",
  components: { VueTimepicker, vSelect },
  data() {
    return {
      show: false,
      date: new Date(),
      hourFrom: undefined,
      hourTo: undefined,
      hourRangeFrom: undefined,
      hourRangeTo: undefined,
      minuteRangeFrom: undefined,
      minuteRangeTo: undefined,
      hourProper: true,
      message: "",
      component: "Date",
      currentTable: undefined,
      rooms: [
        {
          name: "Taktyczny",
          description:
            '"Przeciwpancernym ładuj!" Herbata i pociski czołgowe to wybuchowe połączenie, które zapamiętasz na długo. Nie ważne, czy na nasz karabin snajperski mówisz "L96" czy "AWP", to miejsce jest dla Ciebie!',
          graphics: "https://i.imgur.com/X5ATLED.jpg",
          free: true,
          selected: true
        },
        {
          name: "Motoryzacyjny",
          description:
            "Silnik V6 o pojemności 2,6l, turbosprężarka Garrett, kolumna macphersona, trójramienna kierownica sportowa... Wrzucisz jedynkę i wyjedziesz z tego pokoju?",
          graphics: "https://i.imgur.com/yA3a3nf.jpg",
          free: true,
          selected: false
        },
        {
          name: "Gwiezdny",
          description:
            "- Huston, odczyt przyspieszenia grawitacyjnego wynosi 9,8101 m/s2, włączamy silniki pomocnicze. - Tu Huston, słyszymy Cię, nie wylejcie herbaty.",
          graphics: "https://i.imgur.com/qBGPyJP.jpg",
          free: true,
          selected: false
        },
        {
          name: "Pluszowy",
          description:
            "Pokaż się od romantycznej strony, ujmij swoją sympatię i zabierz ją do pokoju pełnego przytulania. Gdy opadniesz z sił nasz wielki miś Cię wyręczy.",
          graphics: "https://i.imgur.com/Pdjw2A5.jpg",
          free: true
        },
        {
          name: "Gamingowy",
          description:
            "Rywalizacja? A może kooperacja? Potrzebujesz silniejszych wrażeń niż pobudzenie po yerba mate czy espresso? U nas możesz zagrać na najmocniejszej konsoli świata!",
          graphics: "https://i.imgur.com/eTeHhEQ.jpg",
          free: true,
          selected: false
        },
        {
          name: "Steampunkowy",
          description:
            "To czas spędzony przy ulubionym napoju, czy kłębach pary fajki wodnej, czas, który zabłądził między epoką wiktoriańską, ekspansją maszyn parowych i futurystyką naukową.",
          graphics: "https://i.imgur.com/F1aufdz.jpg",
          free: true,
          selected: false
        },
        {
          name: "Muzyczny",
          description:
            "Jeżeli Cis nad pięciolinią oznacza dla Ciebie coświęcej niż drzewo iglaste to z pewnością się tu odnajdziesz. Nastrojowe oświetlenie i nasza gitara pomogą Ci poczuć ciepło leśnego ogniska, lub udowodnić swoje umiejętności z Guitar Hero.",
          graphics: "https://i.imgur.com/VtN14k2.jpg",
          free: true,
          selected: false
        },
        {
          name: "Morski",
          description:
            "Morze; nie nadepniesz tu na jeżowca ani nie dostaniesz tu choroby morskiej, ale piękna fauna naszego akwenu bacznie będzie się przyglądać czy wpadniesz w nasze sieci na dłużej.",
          graphics: "https://i.imgur.com/OaXnH6C.jpg",
          free: true,
          selected: false
        },
        {
          name: "1",
          description:
            "To loftowe, reprezentacyjne wnętrze jest świetnym wyborem na każdą okazję wizyty w naszej herbaciarni. Przy pięciu stolikach ugości na wygodnych pufach nawet większe grupy zapalonych herbatopijców.",
          graphics: "https://i.imgur.com/WiR9LWE.jpg",
          free: true,
          selected: false
        },
        {
          name: "2",
          description:
            "To loftowe, reprezentacyjne wnętrze jest świetnym wyborem na każdą okazję wizyty w naszej herbaciarni. Przy pięciu stolikach ugości na wygodnych pufach nawet większe grupy zapalonych herbatopijców.",
          graphics: "https://i.imgur.com/WiR9LWE.jpg",
          free: true,
          selected: false
        },
        {
          name: "3",
          description:
            "To loftowe, reprezentacyjne wnętrze jest świetnym wyborem na każdą okazję wizyty w naszej herbaciarni. Przy pięciu stolikach ugości na wygodnych pufach nawet większe grupy zapalonych herbatopijców.",
          graphics: "https://i.imgur.com/WiR9LWE.jpg",
          free: true,
          selected: false
        },
        {
          name: "4",
          description:
            "To loftowe, reprezentacyjne wnętrze jest świetnym wyborem na każdą okazję wizyty w naszej herbaciarni. Przy pięciu stolikach ugości na wygodnych pufach nawet większe grupy zapalonych herbatopijców.",
          graphics: "https://i.imgur.com/WiR9LWE.jpg",
          free: true,
          selected: false
        },
        {
          name: "5",
          description:
            "To loftowe, reprezentacyjne wnętrze jest świetnym wyborem na każdą okazję wizyty w naszej herbaciarni. Przy pięciu stolikach ugości na wygodnych pufach nawet większe grupy zapalonych herbatopijców.",
          graphics: "https://i.imgur.com/WiR9LWE.jpg",
          free: true,
          selected: false
        },
        {
          name: "6",
          description:
            "To loftowe, reprezentacyjne wnętrze jest świetnym wyborem na każdą okazję wizyty w naszej herbaciarni. Przy pięciu stolikach ugości na wygodnych pufach nawet większe grupy zapalonych herbatopijców.",
          graphics: "https://i.imgur.com/WiR9LWE.jpg",
          free: true,
          selected: false
        }
      ],
      name: "",
      email: "",
      credentialsProperName: false,
      credentialsProperEmail: false,
      loadingRooms: false,
      loadingFinish: false,
      loadedRooms: true,
      messageRooms:
        "Nie udało połączyć się z serwerem. Skontaktuj się z właścicielem strony.",
      loadedFinish: true,
      messageFinish:
        "Wystąpił błąd przy próbie wysłania maila. Skontaktuj się z właścicielem strony.",
      roomsDropDownList: [],
      headerConfig: {
        headers: { Authorization: "Bearer " + this.$cookies.get("token") }
      }
    };
  },
  methods: {
    test() {
      this.currentTable = null;
      switch (this.date.getDay()) {
        case 0:
          this.hourRangeFrom = [[14, 22]];
          this.hourRangeTo = [[14, 22]];
          break;
        case 5:
        case 6:
          this.hourRangeFrom = [[10, 22]];
          this.hourRangeTo = [[10, 23]];
          break;
        default:
          this.hourRangeFrom = [[10, 22]];
          this.hourRangeTo = [[10, 22]];
      }

      if (this.isSameDay(new Date(), this.date)) {
        this.hourFrom = {
          HH: (new Date().getHours() + 2).toString(),
          mm: "00"
        };
      } else {
        this.hourFrom = {
          HH: this.hourRangeFrom[0][0].toString(),
          mm: "00"
        };
        this.hourTo = {
          HH: this.hourRangeFrom[0][0].toString(),
          mm: "30"
        };
      }

      this.validateTime();
      this.loadRooms();
    },
    validateTime() {
      if (this.isSameDay(this.date, new Date())) {
        this.hourRangeFrom[0][0] = new Date().getHours().toString();
      }

      this.hourRangeTo[0][0] = parseInt(this.hourFrom.HH);

      if (this.hourTo.HH < this.hourFrom.HH) {
        this.hourTo.HH = this.hourFrom.HH;
      }

      this.dateFrom = new Date();
      this.dateFrom.setUTCDate(this.date.getUTCDate());
      this.dateFrom.setHours(this.hourFrom.HH);
      this.dateFrom.setMinutes(this.hourFrom.mm);
      this.dateFrom.setSeconds(0);

      this.dateTo = new Date();
      this.dateTo.setUTCDate(this.date.getUTCDate());
      this.dateTo.setHours(this.hourTo.HH);
      this.dateTo.setMinutes(this.hourTo.mm);
      this.dateTo.setSeconds(0);

      this.hourProper =
        this.dateFrom.getTime() < this.dateTo.getTime() &&
        this.diff_minutes(this.dateTo, this.dateFrom) <= 120;

      if (this.diff_minutes(this.dateTo, this.dateFrom) >= 120) {
        this.message = "Czas rezerwacji nie może przekraczać 2 godzin.";
      }

      if (this.dateFrom.getTime() >= this.dateTo.getTime()) {
        this.message = "Proszę poprawić czas rezerwacji.";
      }
    },
    changeHandlerFrom() {
      this.validateTime();
      this.currentTable = null;
      this.loadRooms();
    },
    changeHandlerTo() {
      if (this.hourTo.HH.toString() === this.hourRangeTo[0][1].toString()) {
        this.minuteRangeTo = [[0]];
        this.hourTo.mm = "00";
      } else {
        this.minuteRangeTo = undefined;
      }
      this.validateTime();
      this.currentTable = null;
      this.loadRooms();
    },
    isSameDay(first, second) {
      return (
        first.getFullYear() === second.getFullYear() &&
        first.getMonth() === second.getMonth() &&
        first.getDate() === second.getDate()
      );
    },
    diff_minutes(dt2, dt1) {
      let diff = (dt2.getTime() - dt1.getTime()) / 1000;
      diff /= 60;
      return Math.abs(Math.round(diff));
    },
    checkTable(tableName) {
      let element;
      try {
        if (this.currentTable !== undefined) {
          element = document.getElementById(this.currentTable);
          if (!element.classList.contains("text-teal-900")) {
            element.classList.remove("fill-current");
            element.classList.remove("text-green-400");
          }
        }

        element = document.getElementById(tableName);
        if (!element.classList.contains("text-teal-900")) {
          element.classList.add("fill-current");
          element.classList.add("text-green-400");
        }
        this.currentTable = tableName;
      } catch (e) {
        if (this.currentTable !== undefined) {
          element = document.getElementById(this.currentTable);
          element.classList.remove("fill-current");
          element.classList.remove("text-green-400");
          this.currentTable = undefined;
        }
      }
    },
    roomIsFree(roomName) {
      let is = false;
      this.rooms.forEach(room => {
        if (room.name === roomName && room.free) {
          is = true;
        }
      });
      return is;
    },
    finish() {
      let format = "YYYY-MM-DD HH:mm:ss";
      let dayFrom = moment(this.date);
      dayFrom.hours(this.hourFrom.HH);
      dayFrom.minutes(this.hourFrom.mm);
      dayFrom.seconds(0);
      dayFrom = dayFrom.format(format);

      this.loadingFinish = true;
      this.loadedFinish = true;

      this.axios
        .post(
          "http://lisc.test/api/reservation/reserve",
          {
            time_from: dayFrom,
            duration: this.diff_minutes(this.dateTo, this.dateFrom),
            room_name: this.currentTable,
            name: this.name,
            email: this.email
          },
          this.headerConfig
        )
        // eslint-disable-next-line no-unused-vars
        .then(response => {
          this.component = "Finish";
        })
        .catch(error => {
          console.log(error);
          this.loadedFinish = false;
        })
        .finally(() => {
          this.loadingFinish = false;
        });
    },
    updateCredentialsName() {
      this.credentialsProperName = this.name.length >= 3;
    },
    updateCredentialsEmail() {
      const mailFormat =
        // eslint-disable-next-line no-useless-escape
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      this.credentialsProperEmail = mailFormat.test(this.email);
    },
    toTable() {
      let format = "YYYY-MM-DD HH:mm:ss";
      let dayFrom = moment(this.date);
      dayFrom.hours(this.hourFrom.HH);
      dayFrom.minutes(this.hourFrom.mm);
      dayFrom.seconds(0);
      dayFrom = dayFrom.format(format);

      let dayTo = moment(this.date);
      dayTo.hours(this.hourTo.HH);
      dayTo.minutes(this.hourTo.mm);
      dayTo.seconds(0);
      dayTo = dayTo.format(format);

      this.loadingRooms = true;
      this.loadedRooms = true;

      this.axios
        .post("http://lisc.test/api/reservation/check-table", {
          time_from: dayFrom,
          time_to: dayTo
        })
        .then(response => {
          this.rooms.forEach(room => {
            room.free = true;
            response.data.data.forEach(roomName => {
              if (room.name === roomName) {
                room.free = false;
              }
            });
          });

          if (this.currentTable !== undefined) {
            let element = document.getElementById(this.currentTable);
            element.classList.remove("fill-current");
            element.classList.remove("text-green-400");
            this.currentTable = undefined;
          }
          this.currentTable = undefined;

          this.rooms.forEach(room => {
            if (!room.free) {
              let element = document.getElementById(room.name);
              element.classList.add("fill-current");
              element.classList.add("text-teal-900");
            } else {
              let element = document.getElementById(room.name);
              if (element.classList.contains("text-teal-900")) {
                element.classList.remove("fill-current");
                element.classList.remove("text-teal-900");
              }
            }
          });

          this.component = "Table";
        })
        // eslint-disable-next-line no-unused-vars
        .catch(error => {
          console.log(error);
          this.loadedRooms = false;
        })
        .finally(() => {
          this.loadingRooms = false;
        });
    },
    toContact() {
      this.$router.push("/kontakt", () => {});
    },
    toMainPage() {
      this.$router.push("/", () => {});
    },
    close() {
      this.show = false;
    },
    loadRooms() {
      let format = "YYYY-MM-DD HH:mm:ss";
      let dayFrom = moment(this.date);
      dayFrom.hours(this.hourFrom.HH);
      dayFrom.minutes(this.hourFrom.mm);
      dayFrom.seconds(0);
      dayFrom = dayFrom.format(format);

      let dayTo = moment(this.date);
      dayTo.hours(this.hourTo.HH);
      dayTo.minutes(this.hourTo.mm);
      dayTo.seconds(0);
      dayTo = dayTo.format(format);

      this.loadingRooms = true;
      this.loadedRooms = true;

      this.axios
        .post("http://lisc.test/api/reservation/check-table", {
          time_from: dayFrom,
          time_to: dayTo
        })
        // eslint-disable-next-line no-unused-vars
        .then(response => {
          // eslint-disable-next-line no-unused-vars
          this.roomsDropDownList = Array.from(this.rooms, x => x.name);
          response.data.data.forEach(item => {
            const index = this.roomsDropDownList.indexOf(item);
            if (index !== -1) this.roomsDropDownList.splice(index, 1);
          });
        })
        // eslint-disable-next-line no-unused-vars
        .catch(error => {
          console.log(error);
          this.loadedRooms = false;
        })
        .finally(() => {
          this.loadingRooms = false;
        });
    },
    addReservation() {
      let format = "YYYY-MM-DD HH:mm:ss";
      let dayFrom = moment(this.date);
      dayFrom.hours(this.hourFrom.HH);
      dayFrom.minutes(this.hourFrom.mm);
      dayFrom.seconds(0);
      dayFrom = dayFrom.format(format);

      this.loadingFinish = true;
      this.loadedFinish = true;

      this.axios
        .post(
          "http://lisc.test/api/panel/create-reservation",
          {
            time_from: dayFrom,
            duration: this.diff_minutes(this.dateTo, this.dateFrom),
            room_name: this.currentTable,
            name: this.name
          },
          this.headerConfig
        )
        // eslint-disable-next-line no-unused-vars
        .then(response => {
          console.log(response);
          this.show = false;
          Swal.fire("Sukces", response.data.message, "success");
        })
        .catch(error => {
          console.log(error);
          Swal.fire("Błąd", error.message, "error");
          this.loadedFinish = false;
        })
        .finally(() => {
          this.loadingFinish = false;
        });
    }
  },
  mounted() {
    EventBus.$on("open-add-reservation", () => {
      this.show = true;
    });

    this.hourFrom = {
      HH: (new Date().getHours() + 2).toString(),
      mm: "00"
    };
    this.hourTo = {
      HH: (new Date().getHours() + 2).toString(),
      mm: "30"
    };

    let pokoje = document.querySelectorAll("g");

    // eslint-disable-next-line no-unused-vars
    pokoje.forEach((item, index) => {
      item.addEventListener("click", e => {
        if (e.target.id[0] === "_") {
          // eslint-disable-next-line no-undef
          this.checkTable(e.target.id.substring(1));
        } else {
          // eslint-disable-next-line no-undef
          this.checkTable(e.target.id);
        }
      });
    });
  }
};
</script>

<style scoped>
#overlay {
  position: fixed; /* Sit on top of the page content */
  width: 100%; /* Full width (cover the whole page) */
  height: 100%; /* Full height (cover the whole page) */
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5); /* Black background with opacity */
  z-index: 1000; /* Specify a stack order in case you're using a different order for other elements */
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
