import axios from "axios";
import baseUrl from "../requestUtils.ts";

function deleteBook(id: number) {
    return axios.delete(`${baseUrl()}/delete-book?id=${id}`, {
        headers: {
            'x-api-key': sessionStorage.getItem('apiKey')
        }
    });
}

export default deleteBook;