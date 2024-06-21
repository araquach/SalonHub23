import mainService from "main/src/services/mainService";

export default {
    getFreeTimeAdminDash() {
        return mainService.get(`/time/admin/free-time/dash`)
    },

    getFreeTimeHours(staff_id) {
        return mainService.get(`/time/admin/free-time/all/${staff_id}`)
    },

    getFreeTimeHoursPending() {
        return mainService.get(`/time/admin/free-time/all/pending`)
    },

    async approveFreeTime(id, freeTime) {
        const response = await mainService.put(`/time/admin/free-time/approve/${id}`, freeTime)
        return response.data
    }
}