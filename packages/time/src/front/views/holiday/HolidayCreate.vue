<template>
  <div class="columns section">
    <div class="column is-7">
      <div class="box has-background-holiday">
        <div class="columns">
          <div class="column">
            <h3 class="title is-4 has-text-white">Book a Holiday</h3>
          </div>
          <div class="column is-3">
            <figure class="image">
              <img alt="Holidays" :src="'/dist/img/icons/holiday.svg'">
            </figure>
          </div>
        </div>
        <HolidayForm :formType="'create'"/>
      </div>
    </div>
  </div>
</template>
<script setup>
import HolidayForm from "../../components/holiday/HolidayForm.vue";
</script>