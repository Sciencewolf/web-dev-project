import axios from "axios";
import baseUrl from "../requestUtils.ts";

function addUser(nickname: string, password: string) {
    return axios.post(`${baseUrl()}/add-user?nickname=${nickname}&password=${password}`)
}

export default addUser;