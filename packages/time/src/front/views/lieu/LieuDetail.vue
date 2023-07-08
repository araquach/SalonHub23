<template>
  <div class="columns section">
    <div class="column is-9">
      <div :class="'pending'" class="box has-background-lieu">
        <div class="columns">
          <div class="column">
            <h3 class="title is-3 has-text-white">Lieu Request</h3>
            <table class="table has-background-lieu has-text-white is-size-5">
              <tr>
                <td>Request made:</td>
                <td>15/11/22</td>
              </tr>
              <tr>
                <td>Date Regarding:</td>
                <td>13th April 2023</td>
              </tr>
              <tr>
                <td>Number of hours:</td>
                <td>4</td>
              </tr>
              <tr>
                <td>Description:</td>
                <td>Stayed Late to do a client</td>
              </tr>
              <tr>
                <td>Approved:</td>
                <td>Pending</td>
              </tr>
            </table>
            <router-link :to="{ name: 'lieu-dashboard', params: {filter: 'all'} }" class="button is-small is-white">Back to All Lieu Requests</router-link>
          </div>
          <div class="column is-3">
            <figure class="image">
              <img alt="LieuHours" :src="'/dist/img/icons/lieu.svg'">
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
      lieuId: null
    };
  },
  created() {
    this.lieuId = this.$route.params.id;
  }
};
</script>