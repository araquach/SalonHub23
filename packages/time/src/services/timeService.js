import mainService from "main/src/services/mainService";

export default {
    getTimeDash(id) {
        return mainService.get(`/time/time-details/dash/${id}`)
    }
}