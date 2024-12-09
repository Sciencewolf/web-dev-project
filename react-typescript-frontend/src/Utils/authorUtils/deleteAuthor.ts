import axios from "axios";
import baseUrl from "../requestUtils.ts";

function deleteAuthor(id: number) {
    return axios.delete(`${baseUrl()}/delete-author?id=${id}`, {
        headers: {
            'x-api-key': sessionStorage.getItem('apiKey')
        }
    });
}

export default deleteAuthor;