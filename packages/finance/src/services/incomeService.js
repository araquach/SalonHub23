import mainService from "main/src/services/mainService";

export default {
    getIncomeByMonth(sd, ed) {
        return mainService.get(`/finance/income-by-month/${sd}/${ed}`)
    }
}