import BookType from "../../types/BookType.ts";
import {useState} from "react";

interface BookDetailsProps {
    book: BookType | null;
    onEdit: () => void;
    onDelete: (id: number) => void;
    onClose: () => void;
    isUserName: boolean;
}

function BookDetails({book, onEdit, onDelete, onClose, isUserName}: BookDetailsProps) {
    document.querySelector('title')!.innerText = `Library | ${book?.title || 'Book'}`

    const [bookId] = useState<number>(book?.id || 0)
    const [bookAuthor] = useState<string>(book?.author || '')
    const [bookTitle] = useState<string>(book?.title || '')
    const [bookPublisher] = useState<string>(book?.publisher || '')
    const [bookImage] = useState<string>(book?.image || '')

    return (
        <>
            <div id={"popup"}
                 className={"d-flex justify-content-center align-items-center flex-col gap-2 max-w-96 z-index-1000 bg-blue-500"}>
                <h3>{ bookAuthor }</h3>
                <img src={ bookImage } alt={ bookTitle } className={"w-100, h-40, object-cover"}/>
                <h2 className={"text-ellipsis text-wrap"}>{ bookTitle }</h2>
                <h5>{ bookPublisher }</h5>

                <div className={"d-flex justify-content-center align-items-center gap-4"}>
                    {isUserName && book !== null && (
                        <>
                            <button className={"btn btn-info"} onClick={onEdit}>Edit</button>
                            <button className={"btn btn-danger"} onClick={() => onDelete(bookId)}>Delete</button>
                        </>
                    )}
                    <button className={"btn btn-secondary"} onClick={onClose}>Close</button>
                </div>
            </div>
        </>
    )
};
export default BookDetails;
