import { defineStore } from 'pinia'

export const useMainStore = defineStore('main', {
    // arrow function recommended for full type inference
    state: () => {
        return {
            teamMembers: []
        }
    },
})