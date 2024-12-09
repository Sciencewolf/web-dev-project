import baseUrl from "../requestUtils.ts";
import axios from "axios";

function getAllUsers() {
    return axios.get(`${baseUrl()}/get-all-users`, {
        headers: {
            'x-api-key': sessionStorage.getItem('apiKey')
        }
    })
}

export default getAllUsers;