<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div id="navbarBasicExample" class="navbar-menu">
      <div class="navbar-start">
        <div class="navbar-item">
          <router-link :to="{ name: 'holiday-admin-dashboard' }"
                       class="navbar-item">
            <p>Holidays</p>
          </router-link>
        </div>
        <div class="navbar-item">
          <router-link :to="{ name: 'lieu-admin-dashboard' }"
                       class="navbar-item">
            <p>Lieu Hours</p>
          </router-link>
        </div>
        <div class="navbar-item">
          <router-link :to="{ name: 'free-time-admin-dashboard' }"
                       class="navbar-item">
            <p>Free Time</p>
          </router-link>
        </div>
        <div class="navbar-item">
          <router-link :to="{ name: 'sick-admin-dashboard' }"
                       class="navbar-item">
            <p>Sick Days</p>
          </router-link>
        </div>
      </div>
    </div>
  </nav>
</template>
<script setup>
</script>