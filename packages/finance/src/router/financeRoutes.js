import FinanceIndex from "../front/views/FinanceIndex.vue";
import YearlyTakings from "../front/views/takings/YearlyTakings.vue"
import MonthlyTakings from "../front/views/takings/MonthlyTakings.vue";
import StylistTakings from "../front/views/takings/StylistTakings.vue";
import StylistComparison from "../front/views/takings/StylistComparison.vue";
import YearlyCosts from "../front/views/costs/YearlyCosts.vue";
import MonthlyCosts from "../front/views/costs/MonthlyCosts.vue";
import CostsComparison from "../front/views/costs/CostsComparison.vue";
import CostsIndividual from "../front/views/costs/CostsIndividual.vue";
import ProfitLoss from "../front/views/profitLoss/ProfitLoss.vue";
import FinanceDashboard from "../front/views/FinanceDashboard.vue";

export default [
    {
        path: '/finance',
        component: FinanceIndex,
        meta: {
            requiresAuth: true
        },
        children: [
            {
                path: '',
                name: 'finance-dashboard',
                component: FinanceDashboard,
                meta: {
                    requiresAuth: true
                }
            },
            {
                path: "takings/yearly",
                name: "yearly-takings",
                component: YearlyTakings,
                meta: {
                    requiresAuth: true
                }
            },
            {
                path: "takings/monthly",
                name: "monthly-takings",
                component: MonthlyTakings,
                meta: {
                    requiresAuth: true
                }
            },
            {
                path: "takings/stylist",
                name: "stylist-takings",
                component: StylistTakings,
                meta: {
                    requiresAuth: true
                }
            },
            {
                path: "takings/comparison",
                name: "stylist-comparison",
                component: StylistComparison,
                meta: {
                    requiresAuth: true
                }
            },
            {
                path: "costs/yearly",
                name: "yearly-costs",
                component: YearlyCosts,
                meta: {
                    requiresAuth: true
                }
            },
            {
                path: "costs/monthly",
                name: "monthly-costs",
                component: MonthlyCosts,
                meta: {
                    requiresAuth: true
                }
            },
            {
                path: "costs/comparison",
                name: "costs-comparison",
                component: CostsComparison,
                meta: {
                    requiresAuth: true
                }
            },
            {
                path: "costs/individual",
                name: "costs-individual",
                component: CostsIndividual,
                meta: {
                    requiresAuth: true
                }
            },
            {
                path: "profit-loss/monthly",
                name: "monthly-profit-loss",
                component: ProfitLoss,
                meta: {
                    requiresAuth: true
                }
            },
        ]
    },
]