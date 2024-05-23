import mainService from "./mainService";

export default {
    getTeamMembers(salon_id) {
        return mainService.get(`/team/team-members/${salon_id}`);
    }
}