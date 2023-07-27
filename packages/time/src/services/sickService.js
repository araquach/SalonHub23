import mainService from "main/src/services/mainService";

export default {
    getSickDays(id) {
        return mainService.get(`/time/sick-days/${id}`)
    },
    getSickDay(id) {
        return mainService.get(`time/sick-day/${id}`)
    }
}