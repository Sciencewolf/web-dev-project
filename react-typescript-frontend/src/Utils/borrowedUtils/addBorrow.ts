import axios from "axios";
import baseUrl from "../requestUtils.ts";

function AddBorrow(
    userId: string,
    bookId: number,
    bookTitle: string,
    bookAuthor: string,
    bookPublisher: string,
    bookImage: string,
) {
    return axios.post(`${baseUrl()}/add-borrow?user_id=${userId}&book_id=${bookId}&book_title=${bookTitle}&book_author=${bookAuthor}&book_publisher=${bookPublisher}&book_image=${bookImage}`);
}

export default AddBorrow;