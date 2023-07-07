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

export default [
    {
        path: '/finance',
        name: 'finance-index',
        component: FinanceIndex,
        children: [
            {
                path: "takings/yearly",
                name: "yearly-takings",
                component: YearlyTakings
            },
            {
                path: "takings/monthly",
                name: "monthly-takings",
                component: MonthlyTakings
            },
            {
                path: "takings/stylist",
                name: "stylist-takings",
                component: StylistTakings
            },
            {
                path: "takings/comparison",
                name: "stylist-comparison",
                component: StylistComparison
            },
            {
                path: "costs/yearly",
                name: "yearly-costs",
                component: YearlyCosts
            },
            {
                path: "costs/monthly",
                name: "monthly-costs",
                component: MonthlyCosts
            },
            {
                path: "costs/comparison",
                name: "costs-comparison",
                component: CostsComparison
            },
            {
                path: "costs/individual",
                name: "costs-individual",
                component: CostsIndividual
            },
            {
                path: "profit-loss/monthly",
                name: "monthly-profit-loss",
                component: ProfitLoss
            },
        ]
    },
]