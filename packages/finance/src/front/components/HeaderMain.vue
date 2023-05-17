<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <a class="navbar-item">
        <h1 class="title has-text-primary">Salon Finance</h1>
      </a>

      <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div id="navbarBasicExample" class="navbar-menu">
      <div class="navbar-start">
        <div class="navbar-item has-dropdown">
          <a class="navbar-link" @click="toggleDropdown">
            Takings
          </a>
          <div class="navbar-dropdown">
            <router-link :to="{ name: 'yearly-takings' }" v-slot="{ navigate }" class="navbar-item">
              <p @click="closeDropdown(navigate, $event)">Yearly Takings</p>
            </router-link>
            <router-link :to="{ name: 'monthly-takings' }" v-slot="{ navigate }" class="navbar-item">
              <p @click="closeDropdown(navigate, $event)">Monthly Takings</p>
            </router-link>
            <router-link :to="{ name: 'stylist-comparison' }"  v-slot="{ navigate }" class="navbar-item">
              <p @click="closeDropdown(navigate, $event)">Stylist Comparison</p>
            </router-link>
            <router-link :to="{ name: 'stylist-takings' }"  v-slot="{ navigate }" class="navbar-item">
              <p @click="closeDropdown(navigate, $event)">Stylist Takings</p>
            </router-link>
          </div>
        </div>

        <div class="navbar-item has-dropdown">
          <a class="navbar-link" @click="toggleDropdown">
            Costs
          </a>
          <div class="navbar-dropdown">
            <router-link :to="{ name: 'yearly-costs' }" v-slot="{ navigate }" class="navbar-item">
              <p @click="closeDropdown(navigate, $event)">Yearly Costs</p>
            </router-link>
            <router-link :to="{ name: 'monthly-costs' }" v-slot="{ navigate }" class="navbar-item">
              <p @click="closeDropdown(navigate, $event)">Monthly Costs</p>
            </router-link>
            <router-link :to="{ name: 'costs-comparison' }" v-slot="{ navigate }" class="navbar-item">
              <p @click="closeDropdown(navigate, $event)">Costs Comparison</p>
            </router-link>
            <router-link :to="{ name: 'costs-individual' }" v-slot="{ navigate }" class="navbar-item">
              <p @click="closeDropdown(navigate, $event)">Individual Costs</p>
            </router-link>
          </div>
        </div>
        <div class="navbar-item has-dropdown">
          <a class="navbar-link" @click="toggleDropdown">
            Profit/Loss
          </a>
          <div class="navbar-dropdown">
            <router-link :to="{ name: 'monthly-profit-loss' }" v-slot="{ navigate }" class="navbar-item">
              <p @click="closeDropdown(navigate, $event)">Monthly Profit/Loss</p>
            </router-link>
          </div>
        </div>
      </div>
      <div class="navbar-end">
        <div class="navbar-item">
          <div class="buttons">
            <a class="button is-primary">
              <strong>Sign up</strong>
            </a>
            <a class="button is-light">
              Log in
            </a>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>
<script>
export default {
  methods: {
    toggleDropdown(event) {
      const dropdownParent = event.currentTarget.parentNode;
      const allDropdowns = document.querySelectorAll('.navbar-item.has-dropdown');

      // Close all other active dropdowns
      allDropdowns.forEach((dropdown) => {
        if (dropdown !== dropdownParent) {
          dropdown.classList.remove('is-active');
        }
      });

      if (dropdownParent) {
        dropdownParent.classList.toggle('is-active');
      }
    },

    closeDropdown(navigate, event) {
      const dropdownParent = event.target.closest('.navbar-item.has-dropdown');
      if (dropdownParent) {
        dropdownParent.classList.remove('is-active');
        // Wrap the navigate method call inside a Promise
        Promise.resolve().then(() => {
          navigate();
        });
      }
    },
  },
};
</script>