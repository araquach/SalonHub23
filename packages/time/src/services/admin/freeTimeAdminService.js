import mainService from "main/src/services/mainService";

export default {
    async approveFreeTime(id, freeTime) {
        const response = await mainService.put(`/time/admin/free-time/approve/${id}`, freeTime)
        return response.data
    }
}