import mainService from "main/src/services/mainService";

export default {
    async approveHoliday(id, holiday) {
        const response = await mainService.put(`/time/admin/holiday/approve/${id}`, holiday)
        return response.data
    }
}