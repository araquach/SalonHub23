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
        <div class="navbar-item has-dropdown" v-on-click-outside="outsideClickHandler">
          <a class="navbar-link" @click="toggleDropdown">
            Holidays
          </a>
          <div class="navbar-dropdown">
            <router-link :to="{ name: 'holiday-dashboard', params: { filter: 'all' } }" v-slot="{ navigate }" class="navbar-item">
              <p @click="closeDropdown(navigate, $event)">Dashboard</p>
            </router-link>
            <router-link :to="{ name: 'holiday-create' }" v-slot="{ navigate }" class="navbar-item">
              <p @click="closeDropdown(navigate, $event)">Book Holiday</p>
            </router-link>
          </div>
        </div>

        <div class="navbar-item has-dropdown">
          <a class="navbar-link" @click="toggleDropdown">
            Lieu
          </a>
          <div class="navbar-dropdown">
            <router-link :to="{ name: 'lieu-dashboard' }" v-slot="{ navigate }" class="navbar-item">
              <p @click="closeDropdown(navigate, $event)">Dashboard</p>
            </router-link>
            <router-link :to="{ name: 'lieu-create' }" v-slot="{ navigate }" class="navbar-item">
              <p @click="closeDropdown(navigate, $event)">Add/Remove Lieu</p>
            </router-link>
          </div>
        </div>
        <div class="navbar-item has-dropdown">
          <a class="navbar-link" @click="toggleDropdown">
            Free Time
          </a>
          <div class="navbar-dropdown">
            <router-link :to="{ name: 'free-time-dashboard' }" v-slot="{ navigate }" class="navbar-item">
              <p @click="closeDropdown(navigate, $event)">Dashboard</p>
            </router-link>
            <router-link :to="{ name: 'free-time-create' }" v-slot="{ navigate }" class="navbar-item">
              <p @click="closeDropdown(navigate, $event)">Book Free Time</p>
            </router-link>
          </div>
        </div>
        <div class="navbar-item has-dropdown">
          <a class="navbar-link" @click="toggleDropdown">
            Sick
          </a>
          <div class="navbar-dropdown">
            <router-link :to="{ name: 'sick-dashboard' }" v-slot="{ navigate }" class="navbar-item">
              <p @click="closeDropdown(navigate, $event)">Dashboard</p>
            </router-link>
            <router-link :to="{ name: 'sick-create' }" v-slot="{ navigate }" class="navbar-item">
              <p @click="closeDropdown(navigate, $event)">Log Sickness</p>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>
<script>
import { directive as onClickOutside } from 'vue3-click-away';

export default {
  directives: {
    onClickOutside
  },
  data() {
    return {
      activeDropdown: null,
    };
  },
  methods: {
    toggleDropdown(event) {
      const dropdownParent = event.currentTarget.parentNode;
      const allDropdowns = document.querySelectorAll('.navbar-item.has-dropdown');

      allDropdowns.forEach((dropdown) => {
        if (dropdown !== dropdownParent) {
          dropdown.classList.remove('is-active');
        }
      });

      if (dropdownParent) {
        dropdownParent.classList.toggle('is-active');
        this.activeDropdown = dropdownParent;
      }
    },
    closeDropdown(navigate, event) {
      const dropdownParent = event.target.closest('.navbar-item.has-dropdown');
      if (dropdownParent) {
        dropdownParent.classList.remove('is-active');
        Promise.resolve().then(() => {
          navigate();
        });
        this.activeDropdown = null;
      }
    },
    outsideClickHandler(event) {
      if (this.activeDropdown && !this.activeDropdown.contains(event.target)) {
        this.activeDropdown.classList.remove('is-active');
        this.activeDropdown = null;
      }
    }
  },
};
</script>