<template>
  <div class="level">
    <div class="level-left">
      <div class="level-item">
        <button @click="toggleDatePicker" class="button is-small is-success">
          {{ !showDatePicker ? 'Date Picker' : 'Date Range' }}
        </button>
      </div>
      <div v-if="!showDatePicker" class="level-item">
        <div class="buttons">
          <button @click="updateDateRange(range)" v-for="range in dateRanges" :key="range.id" class="button is-small">
            {{ range.text }}
          </button>
        </div>
      </div>
      <div v-if="showDatePicker" class="level-item">
        <div class="field has-addons">
          <p class="control">
            <VueDatePicker v-model="startDate" placeholder="Start Date" :enable-time-picker="false"
                           :format="formattedStartDate"></VueDatePicker>
          </p>
        </div>
      </div>
      <div v-if="showDatePicker" class="level-item">
        <div class="field has-addons">
          <p class="control">
            <VueDatePicker v-model="endDate" placeholder="End Date" :enable-time-picker="false"
                           :format="formattedEndDate"></VueDatePicker>
          </p>
        </div>
      </div>
      <div v-if="showDatePicker" class="level-item">
        <button @click="updateData" v-if="startDate && endDate" class="button is-small">Update</button>
      </div>
    </div>
  </div>
</template>
<script>
import VueDatePicker from "@vuepic/vue-datepicker";
import { useMainStore } from "../../stores/main";
import {
  format,
  subMonths,
  startOfMonth,
  endOfMonth,
  subYears,
  startOfYear,
  endOfYear
} from "date-fns";

export default {
  // eslint-disable-next-line vue/no-reserved-component-names
  components: { VueDatePicker },

  setup() {
    const mainStore = useMainStore();
    return {
      mainStore: mainStore
    };
  },

  data() {
    return {
      showDatePicker: false,
      dateRanges: [
        { id: 1, text: 'All Time' },
        { id: 2, text: 'Last Year' },
        { id: 3, text: 'Rolling Year' },
        { id: 4, text: 'Year to date' }
      ],
      startDate: this.mainStore.startDate,
      endDate: this.mainStore.endDate
    };
  },


  methods: {
    toggleDatePicker() {
      this.showDatePicker = !this.showDatePicker;
    },

    formattedStartDate() {
      return format(new Date(this.startDate), "dd/MM/yyyy");
    },

    formattedEndDate() {
      return format(new Date(this.endDate), "dd/MM/yyyy");
    },

    updateDateRange(range) {
      const now = new Date();

      if (range.id === 1)  {
        this.mainStore.startDate = "2017-07-01"
        this.mainStore.endDate = format(endOfMonth(subMonths(now, 1)), "yyyy-MM-dd")
      }
      if (range.id === 2)  {
        this.mainStore.startDate = format(startOfYear(subYears(now, 1)), "yyyy-MM-dd")
        this.mainStore.endDate = format(endOfYear(subYears(now, 1)), "yyyy-MM-dd")
      }
      if (range.id === 3)  {
        this.mainStore.startDate = format(startOfMonth(subMonths(now, 12)), "yyyy-MM-dd");
        this.mainStore.endDate = format(endOfMonth(subMonths(now, 1)), "yyyy-MM-dd");
      }
      if (range.id === 4)  {
        this.mainStore.startDate = format(startOfYear(now), "yyyy-MM-dd")
        this.mainStore.endDate = format(endOfMonth(subMonths(now, 1)), "yyyy-MM-dd")
      }
      this.$emit("date-change");
    },

    updateData() {
      this.mainStore.startDate = format(new Date(this.startDate), "yyyy-MM-dd")
        this.mainStore.endDate = format(new Date(this.endDate), "yyyy-MM-dd")
        this.$emit("date-change");
    }
  }
};
</script>
<style scoped>
.level {
    height: 2rem;
}
</style>
