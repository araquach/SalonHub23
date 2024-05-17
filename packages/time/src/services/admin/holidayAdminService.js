import mainService from "main/src/services/mainService";

export default {
    getHolidayAdminDash() {
        return mainService.get(`/time/admin/holiday/dash`)
    },

    getHolidaysPending() {
        return mainService.get(`/time/admin/holiday/all/pending`)
    },

    getHolidays() {
        return mainService.get(`/time/admin/holiday/all`)
    },
    getHoliday(id) {
        return mainService.get(`time/holiday/admin/${id}`)
    },

    async approveHoliday(id, holiday) {
        const response = await mainService.put(`/time/admin/holiday/approve/${id}`, holiday)
        return response.data
    }
}