import mainService from "main/src/services/mainService";

export default {
    getLieuAdminDash() {
        return mainService.get(`/time/admin/lieu/dash`)
    },

    getLieuHours(staff_id) {
        return mainService.get(`/time/admin/lieu/all/${staff_id}`)
    },

    getLieuHoursPending() {
        return mainService.get(`/time/admin/lieu/all/pending`)
    },

    async approveLieu(id, lieu) {
        const response = await mainService.put(`/time/admin/lieu/approve/${id}`, lieu)
        return response.data
    }
}