import axios from "axios";
import BookType from "../../types/BookType.ts";
import baseUrl from "../requestUtils.ts";

function modifyBook(book: BookType) {
    return axios.put(`${baseUrl()}/modify-book?id=${book.id}&title=${book.title}&author=${book.author}&publisher=${book.publisher}&image=${book.image}`,
        {key: `${book.id}`},
        {
        headers: {
            'x-api-key': sessionStorage.getItem('apiKey')
        }
    });

}

export default modifyBook;