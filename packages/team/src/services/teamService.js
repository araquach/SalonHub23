import mainService from "main/src/services/mainService";

export default {
    getTeamMembers() {
        return mainService.get(`/team`)
    }
}