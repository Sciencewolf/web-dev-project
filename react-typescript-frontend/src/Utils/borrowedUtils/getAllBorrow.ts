import axios from "axios";
import baseUrl from "../requestUtils.ts";

function getAllBorrow(userId: string) {
    return axios.get(`${baseUrl()}/get-all-borrow/${userId}`);
}

export default getAllBorrow;