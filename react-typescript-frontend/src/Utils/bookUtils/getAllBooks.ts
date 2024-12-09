import axios from "axios";
import baseUrl from "../requestUtils.ts";

function getAllBooks(limit: number=0) {
    return axios.get(`${baseUrl()}/get-all-books?limit=${limit}`)
}

export default getAllBooks;