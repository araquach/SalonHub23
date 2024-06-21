import mainService from "./mainService";

export default {
    getTeamMembers(salon) {
        return mainService.get(`/team/team-members/${salon}`);
    }
}