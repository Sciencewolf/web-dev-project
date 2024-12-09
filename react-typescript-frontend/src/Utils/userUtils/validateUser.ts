import axios from "axios";
import baseUrl from "../requestUtils.ts";

function validateUser(nickname: string) {
    return axios.get(`${baseUrl()}/validate-user?nickname=${nickname}`);
}

export default validateUser;