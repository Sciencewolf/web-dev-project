import axios from "axios";
import BookType from "../../types/BookType.ts";
import baseUrl from "../requestUtils.ts";

function addBook(book: BookType) {
    return axios.post(`${baseUrl()}/add-book?title=${book.title}&author=${book.author}&publisher=${book.publisher}&image=${book.image}`);
}

export default addBook;