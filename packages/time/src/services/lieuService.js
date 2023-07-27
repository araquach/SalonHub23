import mainService from "main/src/services/mainService";

export default {
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
    async updateLieuHour(lieu) {
        const response = await mainService.put(`/time/lieu-hour-update`, lieu)
        return response.data
    }
}