<template>
  <router-link :to="{ name: 'free-time-detail', params: { id: 123 } }">
    <div class="column is-3">
      <div class="box">
        <h1 class="title is-3 has-text-black">Free Time Individual</h1>
      </div>
    </div>
  </router-link>
</template>