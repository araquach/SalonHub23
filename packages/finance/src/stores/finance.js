import { defineStore } from 'pinia'

export const useFinanceStore = defineStore('finance', {
    // arrow function recommended for full type inference
    state: () => {
        return {
            name: "finance",
        }
    },
})