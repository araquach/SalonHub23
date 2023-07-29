<template>
  <div class="dashboard section">
    <div class="columns is-mobile is-multiline section">
      <div v-for="cat in dashboardStore.categories" :key="cat.id"
           class="column is-6-mobile is-3-tablet is-3-desktop is-2-widescreen">
        <router-link :to="{ name: `${cat.tag}-dashboard` }">
          <div class="box" :class="'has-background-' + cat.tag">
            <h3 class="title is-5 has-text-white">{{ cat.name }}</h3>
            <figure class="image is-square">
              <img :alt="cat.name" :src="'./dist/img/icons/' + cat.tag + '.svg'">
            </figure>
            <p>{{ cat.name }}</p>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useDashboardStore } from "../../stores/dashboardStore";

const dashboardStore = useDashboardStore();

</script>