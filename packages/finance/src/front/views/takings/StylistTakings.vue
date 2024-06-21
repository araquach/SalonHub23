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
        <component :is="toggledView ? StylistTakingsChart : StylistTakingsTable"></component>
      </transition>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import StylistTakingsChart from "../../components/takings/StylistTakingsChart.vue";
import StylistTakingsTable from "../../components/takings/StylistTakingsTable.vue";
import DatePickerComponent from "../../components/DatePickerComponent.vue";
import { useMainStore } from "../../../stores/main";
import { useTakingsStore } from "../../../stores/takings";

const mainStore = useMainStore();
const takingsStore = useTakingsStore();
mainStore.loadStylists("all");
takingsStore.loadStylistTakingsMonthByMonth();

let toggledView = ref(true);

const toggleView = () => {
  toggledView.value = !toggledView.value;
};

const selectSalon = (salon) => {
  mainStore.salon = salon;
};

const selectStylist = (id, fn, ln) => {
  mainStore.teamMember = { id: id, first_name: fn, last_name: ln };
  takingsStore.loadStylistTakingsMonthByMonth();
};

const handleDateChange = () => {
  takingsStore.loadStylistTakingsMonthByMonth();
};
</script>