import axios from "axios";
import baseUrl from "../requestUtils.ts";

function deleteBorrow(id: number, bookId: number, userId: string) {
    return axios.delete(
        `${baseUrl()}/delete-borrow?id=${id}&book_id=${bookId}&user_id=${userId}`, {
            headers: {
                'x-api-key': sessionStorage.getItem('apiKey') as string
            }
        })
}

export default deleteBorrow;