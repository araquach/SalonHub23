import mainService from "main/src/services/mainService";

export default {
    getHolidayDash(id) {
        return mainService.get(`/time/holiday/dash/${id}`)
    },
    getHolidays(id) {
        return mainService.get(`/time/holiday/all/${id}`)
    },
    getHoliday(id) {
        return mainService.get(`time/holiday/${id}`)
    },
    async postHoliday(holiday) {
        const response = await mainService.post(`/time/holiday/create`, holiday)
        return response.data
    },
    async updateHoliday(id, holiday) {
        const response = await mainService.put(`/time/holiday/update/${id}`, holiday)
        return response.data
    }
}