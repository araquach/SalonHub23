import mainService from "main/src/services/mainService";

export default {
    getCostsYearByYear() {
        return mainService.get('/finance/costs-year-by-year');
    },
    getCostsMonthByMonth(sd, ed) {
        return mainService.get(`/finance/costs-month-by-month/${sd}/${ed}`);
    },
    getCostsByCat(s, sd, ed) {
        return mainService.get(`/finance/costs-by-cat/${s}/${sd}/${ed}`)
    },
    getIndCostsByMonth(c, sd, ed) {
        return mainService.get(`/finance/ind-cost-month-by-month/${c}/${sd}/${ed}`)
    }
}