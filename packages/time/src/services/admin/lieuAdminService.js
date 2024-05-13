import mainService from "main/src/services/mainService";

export default {
    async approveLieu(id, lieu) {
        const response = await mainService.put(`/time/admin/lieu/approve/${id}`, lieu)
        return response.data
    }
}