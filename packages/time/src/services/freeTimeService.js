import mainService from "main/src/services/mainService";

export default {
    getFreeTimeDash(id) {
        return mainService.get(`/time/free-time/dash/${id}`)
    },
    getFreeTimes(id) {
        return mainService.get(`/time/free-time/all/${id}`)
    },
    getFreeTime(id) {
        return mainService.get(`time/free-time/${id}`)
    },
    async postFreeTime(freeTime) {
        const response = await mainService.post(`/time/free-time/create`, freeTime)
        return response.data
    },
    async updateFreeTime(id, freeTime) {
        const response = await mainService.put(`/time/free-time/update/${id}`, freeTime)
        return response.data
    }
}