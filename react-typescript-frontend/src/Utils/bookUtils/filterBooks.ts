import axios from "axios";
import baseUrl from "../requestUtils.ts";

function filterBooks(col: string, val: string) {
    return axios.get(`${baseUrl()}/filter-books?col=${col}&val=${val}`)
}

export default filterBooks;