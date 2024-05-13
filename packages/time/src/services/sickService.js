import mainService from "main/src/services/mainService";

export default {
    getSickDash(id) {
        return mainService.get(`/time/sick/dash/${id}`)
    },
    getSickDays(id) {
        return mainService.get(`/time/sick/all/${id}`)
    },
    getSickDay(id) {
        return mainService.get(`time/sick/${id}`)
    }
}