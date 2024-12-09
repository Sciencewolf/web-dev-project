import addBorrow from "./addBorrow.ts";

const handleBorrow = (userId: string, bookId: number, bookTitle: string, bookAuthor: string, bookPublisher: string, bookImage: string) => {
    addBorrow(userId, bookId, bookTitle, bookAuthor, bookPublisher, bookImage)
        .then(r => {
            console.log(r.data);
            window.location.href = '/borrowed'
        })
        .catch(err => console.log(err));
}

export default handleBorrow;