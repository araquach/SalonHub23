<template>
  <div class="header is-primary is-large">
    <nav class="navbar is-primary" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <router-link to="/">
          <img src="../../../dist/img/logo.svg" alt="Salon Finance" width="112" height="28">
        </router-link>

        <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false"
           data-target="navbarBasicExample">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="navbarBasicExample" class="navbar-menu">
        <div class="navbar-start">
          <router-link :to="{ name: 'finance-dashboard' }" class="navbar-item">
            <p>Finance</p>
          </router-link>
          <router-link :to="{ name: 'time-dashboard' }" class="navbar-item">
            <p>Time</p>
          </router-link>
          <router-link :to="{ name: 'performance-dashboard' }" class="navbar-item">
            <p>Performance</p>
          </router-link>
          <router-link :to="{ name: 'recruitment-dashboard' }" class="navbar-item">
            <p>Recruitment</p>
          </router-link>
          <div class="navbar-item has-dropdown is-hoverable">
            <a class="navbar-link">
              More
            </a>
            <div class="navbar-dropdown">
              <a class="navbar-item">
                Forms
              </a>
              <a class="navbar-item">
                Other
              </a>
              <hr class="navbar-divider">
              <a class="navbar-item">
                some stuff
              </a>
            </div>
          </div>
        </div>

        <div class="navbar-end">
          <div class="navbar-item">
            <div class="buttons">
              <a class="button is-light">
                Log in
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
// import {authComputed} from '../store/helpers'
//
// export default {
//   computed: {
//     ...authComputed
//   },
//
//   methods: {
//     logout() {
//       this.$store.dispatch('logout')
//     }
//   },
// }
</script>