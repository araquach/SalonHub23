import FinanceIndex from "../front/views/FinanceIndex.vue";
import FinanceMenu from "../front/views/FinanceMenu.vue";


export default [
    {
        path: '/finance',
        name: 'finance',
        component: FinanceIndex,
        children: [
            {
                path: "finance-menu",
                component: FinanceMenu
            }
        ]
    },
]