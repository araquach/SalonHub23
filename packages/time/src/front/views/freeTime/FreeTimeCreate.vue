<template>
  <div class="columns section">
    <div class="column is-7">
      <div class="box has-background-free-time">
        <div class="columns">
          <div class="column">
            <h3 class="title is-4 has-text-white">Book Free Time</h3>
          </div>
          <div class="column is-3">
            <figure class="image">
              <img alt="Free Time" :src="'/dist/img/icons/free-time.svg'">
            </figure>
          </div>
        </div>
        <FreeTimeForm :formType="'create'"/>
      </div>
    </div>
  </div>
</template>
<script setup>
import FreeTimeForm from "../../components/freeTime/FreeTimeForm.vue";
</script>