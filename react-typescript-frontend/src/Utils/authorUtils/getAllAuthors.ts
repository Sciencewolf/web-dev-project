import axios from "axios";
import baseUrl from "../requestUtils.ts";

function getAllAuthors(limit: number=0) {
    return axios.get(`${baseUrl()}/get-all-authors?limit=${limit}`);
}

export default getAllAuthors;