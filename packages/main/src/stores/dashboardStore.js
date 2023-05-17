import { defineStore } from 'pinia'

export const useDashboardStore = defineStore('dashboard', {
    // arrow function recommended for full type inference
    state: () => {
        return {
            categories: [
                {id: 1, name: "Finance", tag: "finance"},
                // {id: 2, name: "Performance", tag: "performance"},
                // {id: 3, name: "Recruitment", tag: "recruitment"},
                // {id: 4, name: "Reviews", tag: "reviews"},
                // {id: 5, name: "Stock", tag: "stock"},
                {id: 6, name: "Time", tag: "time"},
            ]
        }
    },
})