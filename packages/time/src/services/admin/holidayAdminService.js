import mainService from "main/src/services/mainService";

export default {
    getHolidayAdminDash() {
        return mainService.get(`/time/admin/holiday/dash`)
    },

    getHolidaysPending() {
        return mainService.get(`/time/admin/holiday/all/pending`)
    },

    getHolidays(staff_id) {
        return mainService.get(`/time/admin/holiday/all/${staff_id}`)
    },

    async approveHoliday(id, holiday) {
        const response = await mainService.put(`/time/admin/holiday/approve/${id}`, holiday)
        return response.data
    }
}