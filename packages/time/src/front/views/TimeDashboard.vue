<template>
  <div class="dashboard section">
    <div class="columns is-mobile is-multiline section">
      <div class="column is-6-mobile is-3-tablet is-3-desktop is-2-widescreen">
        <router-link :to="{ name: 'holiday-dashboard', params: { filter: 'all' } }">
          <div class="box has-background-holiday">
            <h3 class="title is-5 has-text-white">Holidays</h3>
            <figure class="image is-square">
              <img alt="Holidays" :src="'/dist/img/icons/holiday.svg'">
            </figure>
          </div>
        </router-link>
      </div>
      <div class="column is-6-mobile is-3-tablet is-3-desktop is-2-widescreen">
        <router-link :to="{ name: 'lieu-dashboard', params: { filter: 'all' } }">
          <div class="box has-background-lieu">
            <h3 class="title is-5 has-text-white">Lieu Hours</h3>
            <figure class="image is-square">
              <img alt="Lieu Hours" :src="'/dist/img/icons/lieu.svg'">
            </figure>
          </div>
        </router-link>
      </div>
      <div class="column is-6-mobile is-3-tablet is-3-desktop is-2-widescreen">
        <router-link :to="{ name: 'free-time-dashboard', params: { filter: 'all' } }">
          <div class="box has-background-free-time">
            <h3 class="title is-5 has-text-white">Free Time</h3>
            <figure class="image is-square">
              <img alt="Free Time" :src="'/dist/img/icons/free-time.svg'">
            </figure>
          </div>
        </router-link>
      </div>
      <div class="column is-6-mobile is-3-tablet is-3-desktop is-2-widescreen">
        <router-link :to="{ name: 'sick-dashboard', params: { filter: 'all' } }">
          <div class="box has-background-sick">
            <h3 class="title is-5 has-text-white">Sick Days</h3>
            <figure class="image is-square">
              <img alt="Sick Days" :src="'/dist/img/icons/sick.svg'">
            </figure>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>
<script setup>
</script>