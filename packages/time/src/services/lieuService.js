import mainService from "main/src/services/mainService";

export default {
    getLieuDash(id) {
        return mainService.get(`/time/lieu-hours/dash/${id}`)
    },
    getLieuHours(id) {
        return mainService.get(`/time/lieu-hours/${id}`)
    },
    getLieuHour(id) {
        return mainService.get(`time/lieu-hour/${id}`)
    },
    async postLieuHour(lieu) {
        const response = await mainService.post(`/time/lieu-hour-create`, lieu)
        return response.data
    },
    async updateLieuHour(id, lieu) {
        const response = await mainService.put(`/time/lieu-hour-update/${id}`, lieu)
        return response.data
    }
}