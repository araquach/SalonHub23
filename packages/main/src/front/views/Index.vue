<template>
    <div class="dashboard section">
        <h1 class="title is-4">Main Dashboard</h1>
        <div class="columns is-mobile is-multiline section">
            <div v-for="cat in dashboardStore.categories" :key="cat.id"
                 class="column is-6-mobile is-3-tablet is-3-desktop is-2-widescreen">
                <router-link :to="{ name: cat.tag }">
                    <div class="box" :class="'has-background-' + cat.tag">
                        <h3 class="title is-5 has-text-white">{{ cat.name }}</h3>
                        <figure class="image is-square">
                            <img :alt="cat.name" :src="'/img/icons/' + cat.tag + '.svg'">
                        </figure>
                        <p>{{ cat.name }}</p>
                    </div>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
import {useDashboardStore} from "../../stores/dashboardStore"

export default {
    setup() {
        const dashboardStore = useDashboardStore()

        return {
            dashboardStore
        }
    }
}
</script>