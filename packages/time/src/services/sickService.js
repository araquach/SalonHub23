import mainService from "main/src/services/mainService";

export default {
    getSickDash(id) {
        return mainService.get(`/time/sick-days/dash/${id}`)
    },
    getSickDays(id) {
        return mainService.get(`/time/sick-days/${id}`)
    },
    getSickDay(id) {
        return mainService.get(`time/sick-day/${id}`)
    }
}