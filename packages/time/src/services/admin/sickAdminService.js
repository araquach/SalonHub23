import mainService from "main/src/services/mainService";

export default {
    getSickAdminDash() {
        return mainService.get(`/time/admin/sick/dash`)
    },

    getSickDaysPending() {
        return mainService.get(`/time/admin/sick/all/pending`)
    },

    getSickDays() {
        return mainService.get(`/time/admin/sick/all`)
    },

    async postSick(sick) {
        const response = await mainService.post(`/time/admin/sick/create`, sick)
        return response.data
    },

    async deductSickDay(id, sick) {
        const response = await mainService.put(`/time/admin/sick/deduct/${id}`, sick)
        return response.data
    },

    async updateSick(id, sick) {
        const response = await mainService.put(`/time/admin/sick/update/${id}`, sick)
        return response.data
    }
}