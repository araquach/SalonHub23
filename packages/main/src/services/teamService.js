import mainService from "./mainService";

export default {
    getTeamMembers() {
        return mainService.get('/team/team-members');
    }
}