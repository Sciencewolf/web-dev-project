import axios from "axios";
import baseUrl from "../requestUtils.ts";

function addUser(nickname: string, password: string) {
    return axios.get(`${baseUrl()}/add-user?nickname=${nickname}&password=${password}`, {
        headers: {
            'x-api-key': sessionStorage.getItem('apiKey')
        }
    })
}

export default addUser;