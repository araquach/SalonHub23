<template>
  <div class="columns section">
    <div class="column is-7">
      <div class="box has-background-sick">
        <div class="columns">
          <div class="column">
            <h3 class="title is-4 has-text-white">Log Sick</h3>
          </div>
          <div class="column is-3">
            <figure class="image">
              <img alt="Sick Days" :src="'/dist/img/icons/sick.svg'">
            </figure>
          </div>
        </div>
        <SickForm :formType="'create'"/>
      </div>
    </div>
  </div>
</template>
<script setup>
import SickForm from "../../../components/sick/admin/SickForm.vue";
</script>