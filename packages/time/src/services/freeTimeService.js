import mainService from "main/src/services/mainService";

export default {
    getFreeTimes(id) {
        return mainService.get(`/time/free-times/${id}`)
    },
    getFreeTime(id) {
        return mainService.get(`time/free-time/${id}`)
    },
    async postFreeTime(freeTime) {
        const response = await mainService.post(`/time/free-time-create`, freeTime)
        return response.data
    },
    async updateFreeTime(freeTime) {
        const response = await mainService.put(`/time/free-time-update`, freeTime)
        return response.data
    }
}