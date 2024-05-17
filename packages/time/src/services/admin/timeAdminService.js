import mainService from "main/src/services/mainService";

export default {
    getTimeAdminDash(salon_id) {
        return mainService.get(`/time/admin/dash/${salon_id}`)
    }
}