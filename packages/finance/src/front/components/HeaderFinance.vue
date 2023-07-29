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
    </div>
  </nav>
</template>
<script setup>
import { ref } from 'vue';

let activeDropdown = ref(null);

const toggleDropdown = (event) => {
  const dropdownParent = event.currentTarget.parentNode;
  const allDropdowns = document.querySelectorAll('.navbar-item.has-dropdown');

  allDropdowns.forEach((dropdown) => {
    if (dropdown !== dropdownParent) {
      dropdown.classList.remove('is-active');
    }
  });

  if (dropdownParent) {
    dropdownParent.classList.toggle('is-active');
    activeDropdown.value = dropdownParent;
    document.addEventListener('click', outsideClickHandler);
  }
};

const closeDropdown = async (navigate, event) => {
  const dropdownParent = event.target.closest('.navbar-item.has-dropdown');
  if (dropdownParent) {
    dropdownParent.classList.remove('is-active');
    navigate();
    activeDropdown.value = null;
    document.removeEventListener('click', outsideClickHandler);
  }
};

const outsideClickHandler = (event) => {
  if (activeDropdown && !activeDropdown.value.contains(event.target)) {
    activeDropdown.value.classList.remove('is-active');
    activeDropdown.value = null;
    document.removeEventListener('click', outsideClickHandler);
  }
};
</script>