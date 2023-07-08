<template>
  <div class="columns section">
    <div class="column is-9">
      <div :class="'approved'" class="box has-background-sick">
        <div class="columns">
          <div class="column">
            <h3 class="title is-3 has-text-white">Sick Log</h3>
            <table class="table has-background-sick has-text-white is-size-5">
              <tr>
                <td>Log was made:</td>
                <td>15/10/22</td>
              </tr>
              <tr>
                <td>Sick From:</td>
                <td>13th Feb 2023</td>
              </tr>
              <tr>
                <td>Sick To:</td>
                <td>15th Feb 2023</td>
              </tr>
              <tr>
                <td>Description:</td>
                <td>Very Poorly</td>
              </tr>
              <tr>
                <td>Deducted:</td>
                <td>Yes</td>
              </tr>
            </table>
            <router-link :to="{ name: 'sick-dashboard', params: {filter: 'all'} }" class="button is-small is-white">Back to All Sick Days</router-link>
          </div>
          <div class="column is-3">
            <figure class="image">
              <img alt="Sick Days" :src="'/dist/img/icons/sick.svg'">
            </figure>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      sickId: null
    };
  },
  created() {
    this.sickId = this.$route.params.id;
  }
};
</script>