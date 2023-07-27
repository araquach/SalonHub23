import mainService from "main/src/services/mainService";

export default {
    getTakingsYearByYear() {
        return mainService.get(`/finance/takings-by-year`);
    },
    getTakingsMonthByMonth(sd, ed) {
        return mainService.get(`/finance/monthly-takings-by-date-range/${sd}/${ed}`)
    },
    getStylistTakingsMonthByMonth(fn, ln, sd, ed) {
        return mainService.get(`/finance/stylist-takings-month-by-month/${fn}/${ln}/${sd}/${ed}`)
    },
    getTakingsByStylistComparison(s, sd, ed) {
        return mainService.get(`/finance/takings-by-stylist-comparison/${s}/${sd}/${ed}`)
    }
}