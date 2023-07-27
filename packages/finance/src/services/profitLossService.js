import mainService from "main/src/services/mainService";

export default {
    getCostsAndTakingsByDateRange(sd, ed) {
        return mainService.get(`/finance/costs-and-takings/${sd}/${ed}`)
    }
}