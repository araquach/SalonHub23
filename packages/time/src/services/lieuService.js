import mainService from "main/src/services/mainService";

export default {
    getLieuDash(id) {
        return mainService.get(`/time/lieu/dash/${id}`)
    },
    getLieuHours(id) {
        return mainService.get(`/time/lieu/all/${id}`)
    },
    getLieuHour(id) {
        return mainService.get(`time/lieu/${id}`)
    },
    async postLieuHour(lieu) {
        const response = await mainService.post(`/time/lieu/create`, lieu)
        return response.data
    },
    async updateLieuHour(id, lieu) {
        const response = await mainService.put(`/time/lieu/update/${id}`, lieu)
        return response.data
    }
}