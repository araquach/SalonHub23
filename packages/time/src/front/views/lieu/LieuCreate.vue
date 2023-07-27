<template>
  <div class="columns section">
    <div class="column is-7">
      <div class="box has-background-lieu">
        <div class="columns">
          <div class="column">
            <h3 class="title is-4 has-text-white">Add/Redeem Lieu Hours</h3>
          </div>
          <div class="column is-3">
            <figure class="image">
              <img alt="Lieu Hours" :src="'/dist/img/icons/lieu.svg'">
            </figure>
          </div>
        </div>
        <LieuForm :formType="'create'"/>
      </div>
    </div>
  </div>
</template>
<script>
import LieuForm from "../../components/lieu/LieuForm.vue";

export default {
  components: {LieuForm}
}
</script>