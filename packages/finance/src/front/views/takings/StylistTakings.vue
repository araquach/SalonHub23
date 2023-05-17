<template>
  <div class="section has-background-white">
    <div>
      <div class="level">
        <div class="level-left">
          <div class="level-item">
            <h1 class="title is-4 has-text-dark">Stylist Takings: {{ mainStore.teamMember.first_name }}
              {{ mainStore.teamMember.last_name }}</h1>
          </div>
        </div>
        <div class="level-right">
          <div class="level-item">
            <div class="buttons">
              <button @click="toggleView" class="button is-small">Change View</button>
            </div>
          </div>
        </div>
      </div>
      <DatePickerComponent @date-change="handleDateChange"/>
      <div class="buttons">
        <button v-for="(salon, i) in mainStore.salons" @click="selectSalon(salon)" :key="i"
                :class="{'is-danger': salon.id === mainStore.salon.id}" class="button is-small is-dark">
          {{ salon.name }}
        </button>
      </div>
      <div>
        <div class="buttons">
          <button v-for="stylist in mainStore.getStylistsBySalon" :key="stylist.id"
                  @click="selectStylist(stylist.id, stylist.first_name, stylist.last_name)"
                  :class="{'is-link': stylist.id === mainStore.teamMember.id}" class="button is-primary is-small">
            {{ stylist.first_name }}
          </button>
          <button class="button is-small">+ Add Stylist</button>
        </div>
      </div>
    </div>
    <div class="transition-container">
      <transition name="fade" mode="out-in">
        <component :is="toggledView ? 'stylist-takings-chart' : 'stylist-takings-table'"></component>
      </transition>
    </div>
  </div>
</template>

<script>
import StylistTakingsChart from "../../components/takings/StylistTakingsChart.vue";
import StylistTakingsTable from "../../components/takings/StylistTakingsTable.vue";
import DatePickerComponent from "../../components/DatePickerComponent.vue";
import { useMainStore } from "../../../stores/main";
import { useTakingsStore } from "../../../stores/takings";
import { format } from "date-fns";

export default {
  // eslint-disable-next-line vue/no-reserved-component-names
  components: {
    'stylist-takings-chart': StylistTakingsChart,
    'stylist-takings-table': StylistTakingsTable,
    DatePickerComponent
  },

  setup() {
    const mainStore = useMainStore();
    const takingsStore = useTakingsStore();
    mainStore.loadStylists();
    takingsStore.loadStylistTakingsMonthByMonth();
    return {
      mainStore,
      takingsStore
    };
  },

  data() {
    return {
      toggledView: true,
      startDate: this.mainStore.startDate,
      endDate: this.mainStore.endDate
    };
  },

  methods: {
    toggleView() {
      this.toggledView = !this.toggledView;
    },

    formattedStartDate() {
      return format(new Date(this.startDate), "dd/MM/yyyy");
    },

    formattedEndDate() {
      return format(new Date(this.endDate), "dd/MM/yyyy");
    },

    selectSalon(salon) {
      this.mainStore.salon = salon;
    },

    selectStylist(id, fn, ln) {
      this.mainStore.teamMember = { id: id, first_name: fn, last_name: ln };
      this.takingsStore.loadStylistTakingsMonthByMonth();
    },

    handleDateChange() {
      this.takingsStore.loadStylistTakingsMonthByMonth();
    },

    toggleData() {
      this.toggled = !this.toggled;
    },

    toggleLinear() {
      this.showLinear = !this.showLinear;
    }
  }
};
</script>