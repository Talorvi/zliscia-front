<template>
  <div id="reservation">
    <div class="pt-20 lg:pt-26 xl:pt-24 h-full" style="min-height: 100vh">
      <div class="pl-4 pr-4 pb-8 ml-auto mr-auto mt-8">
        <div class="flex flex-row justify-between">
          <v-date-picker v-model="date" @input="update"></v-date-picker>
          <div
            class="flex flex-row justify-end text-green-700 font-semibold hover:text-green-400 cursor-pointer mt-4"
            @click="addReservation"
          >
            Dodaj rezerwację
          </div>
        </div>
        <GSTC :config="config" />
      </div>
    </div>
    <OverlayRemoveReservation></OverlayRemoveReservation>
    <OverlayAddReservation></OverlayAddReservation>
  </div>
</template>

<script>
import GSTC from "vue-gantt-schedule-timeline-calendar";
import Pusher from "pusher-js";
import { EventBus } from "../components/EventBus";
import moment from "moment";
import Swal from "sweetalert2";
import OverlayAddReservation from "../components/OverlayAddReservation";
import OverlayRemoveReservation from "../components/OverlayRemoveReservation";

let subs = [];

// eslint-disable-next-line no-unused-vars
let style = {
  background: "#2F855A",
  "border-radius": 0,
  "text-align": "center",
  "font-size": "0.75em"
};

// eslint-disable-next-line no-unused-vars
function clickAction(element, data) {
  // eslint-disable-next-line no-unused-vars
  function onClick(event) {
    // data variable will be updated in update method below so it will be always actual
    EventBus.$emit("item-clicked", data.item);
  }

  element.addEventListener("click", onClick);

  return {
    update(element, newData) {
      data = newData; // data from parent scope updated
    },

    // eslint-disable-next-line no-unused-vars
    destroy(element, data) {
      element.removeEventListener("click", onClick);
    }
  };
}

Pusher.logToConsole = false;

export default {
  name: "app",
  components: {
    OverlayAddReservation,
    OverlayRemoveReservation,
    GSTC
  },
  data() {
    return {
      config: {
        actions: {
          "chart-timeline-items-row-item": [clickAction]
        },
        height: 650,
        list: {
          rows: {
            "1": {
              id: "1",
              label: "Taktyczny"
            },
            "2": {
              id: "2",
              label: "Motoryzacyjny"
            },
            "3": {
              id: "3",
              label: "Gwiezdny"
            },
            "4": {
              id: "4",
              label: "Pluszowy"
            },
            "5": {
              id: "5",
              label: "Gamingowy"
            },
            "6": {
              id: "6",
              label: "Steampunkowy"
            },
            "7": {
              id: "7",
              label: "Muzyczny"
            },
            "8": {
              id: "8",
              label: "Morski"
            },
            "9": {
              id: "9",
              label: "1"
            },
            "10": {
              id: "10",
              label: "2"
            },
            "11": {
              id: "11",
              label: "3"
            },
            "12": {
              id: "12",
              label: "4"
            },
            "13": {
              id: "13",
              label: "5"
            },
            "14": {
              id: "14",
              label: "6"
            }
          },
          columns: {
            data: {
              label: {
                id: "label",
                data: "label",
                header: {
                  content: "Stoliki"
                }
              }
            }
          }
        },
        chart: {
          items: [
            {
              id: "1",
              rowId: "1",
              label: "Imię Nazwisko",
              time: {
                start: moment("1970-12-31")
                  .toDate()
                  .getTime(),
                end: moment("1970-12-31")
                  .toDate()
                  .getTime()
              },
              style: style
            }
          ],
          time: {
            from: moment(this.date)
              .hours(8)
              .minutes(0)
              .toDate()
              .getTime(),
            zoom: 22
          }
        },
        locale: {
          name: "pl",
          weekdays: "Niedziela_Poniedziałek_Wtorek_Środa_Czwartek_Piątek_Sobota".split(
            "_"
          ),
          weekdaysShort: "Ndz_Pon_Wt_Śr_Czw_Pt_Sob".split("_"),
          weekdaysMin: "Nd_Pn_Wt_Śr_Cz_Pt_So".split("_"),
          months: "Styczeń_Luty_Marzec_Kwiecień_Maj_Czerwiec_Lipiec_Sierpień_Wrzesień_Październik_Listopad_Grudzień".split(
            "_"
          ),
          monthsShort: "sty_lut_mar_kwi_maj_cze_lip_sie_wrz_paź_lis_gru".split(
            "_"
          ),
          weekStart: 1
        }
      },
      date: new Date(),
      toast: Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 5000,
        timerProgressBar: true,
        onOpen: toast => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        }
      }),
      headerConfig: {
        headers: { Authorization: "Bearer " + this.$cookies.get("token") }
      }
    };
  },
  methods: {
    update() {
      this.config.chart.time.from = moment(this.date)
        .hours(8)
        .minutes(0)
        .toDate()
        .getTime();

      this.config.chart.time.to = moment(this.date)
        .hours(23)
        .minutes(59)
        .toDate()
        .getTime();

      this.axios
        .post(
          "http://lisc.test/api/panel/get-reservations",
          {
            date: moment(this.date).format("YYYY-MM-DD")
          },
          this.headerConfig
        )
        // eslint-disable-next-line no-unused-vars
        .then(response => {
          response.data.reservations.forEach(reservation => {
            reservation.style = style;
          });
          this.config.chart.items = response.data.reservations;
        })
        .catch(error => {
          console.log(error);
        });
    },
    // eslint-disable-next-line no-unused-vars
    updateReservations(data) {
      this.axios
        .post(
          "http://lisc.test/api/panel/get-reservations",
          {
            date: moment(this.date).format("YYYY-MM-DD")
          },
          this.headerConfig
        )
        // eslint-disable-next-line no-unused-vars
        .then(response => {
          response.data.reservations.forEach(reservation => {
            reservation.style = style;
          });
          this.config.chart.items = response.data.reservations;
        })
        .catch(error => {
          console.log(error);
        });
    },
    itemClicked(item) {
      console.log(item);
    },
    addReservation() {
      EventBus.$emit("open-add-reservation");
    },
    checkIfValidToken() {
      if (
        this.$cookies.isKey("token") &&
        moment().isBefore(this.$cookies.get("token-valid-until"))
      ) {
        this.axios
          .get("http://lisc.test/api/auth/ping", {
            headers: { Authorization: "Bearer " + this.$cookies.get("token") }
          })
          .catch(() => {
            this.$cookies.remove("token");
            this.$cookies.remove("token-valid-until");
            this.$cookies.remove("roles");
            EventBus.$emit("login-update");
            this.$router.push("/", () => {});
          });
      } else {
        this.$cookies.remove("token");
        this.$cookies.remove("token-valid-until");
        this.$cookies.remove("roles");
        EventBus.$emit("login-update");
        this.$router.push("/", () => {});
      }
    }
  },
  beforeMount: function() {
    this.checkIfValidToken();
  },
  mounted: function() {
    let pusher = new Pusher("8db3260ab25d8ea09e36", {
      cluster: "eu",
      forceTLS: false
    });

    let channel = pusher.subscribe("reservation");
    channel.bind("reservation", function(data) {
      EventBus.$emit("reservation-complete", data);
    });

    this.config.chart.time.zoom = 14;
    this.axios
      .post(
        "http://lisc.test/api/panel/get-reservations",
        {
          date: moment(this.date)
            .toDate()
            .getTime()
        },
        this.headerConfig
      )
      .then(response => {
        response.data.reservations.forEach(reservation => {
          reservation.style = style;
        });
        this.config.chart.items = response.data.reservations;
      })
      .catch(error => {
        console.log(error);
      });

    EventBus.$on("reservation-complete", data => {
      this.updateReservations(data);

      if (!data.removed) {
        this.toast.fire({
          icon: "success",
          title:
            "Nowa rezerwacja w dniu: " + moment(data.date).format("DD-MM-YYYY")
        });
      }
    });
    EventBus.$on("item-clicked", item => {
      this.itemClicked(item);
    });
  },
  beforeDestroy() {
    subs.forEach(unsub => unsub());
  }
};
</script>
