import mainService from "main/src/services/mainService";

export default {
   async postRegister(userCredentials) {
       const response = await mainService.post(`/auth/register`, userCredentials)
       return response.data
    },
    async postLogin(user) {
        const response = await mainService.post('/auth/login', user)
        return response.data
    },

}