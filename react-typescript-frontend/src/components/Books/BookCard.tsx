import handleBorrow from "../../Utils/borrowedUtils/handleBorrow.ts";
import BookType from "../../types/BookType.ts";

function BookCard(
    {
        book,
        onOpen,
        userId,
        isUserName
    }: {
        book: BookType;
        onOpen: () => void;
        userId: string;
        isUserName: boolean;
    }
) {

    return (
        <>
            <div className="card w-80 h-96 p-3" style={{backgroundColor: "lightblue"}}>
                <center>
                    <img className="w-36 h-60 object-cover" src={book.image} alt={book.title} />
                </center>
                <div className="card-body">
                    <h5 className="card-title text-2xl line-clamp-2">{book.title}</h5>
                    <p className="card-text text-xl">{book.author}</p>
                    <p className="card-text text-sm">{book.publisher}</p>

                    <div className={"d-flex justify-content-center align-items-center gap-2"}>
                        <button className="btn btn-outline-primary" onClick={onOpen}>
                            Read
                        </button>
                        {isUserName && (
                            <>
                                <button className="btn btn-info"
                                        onClick={() => handleBorrow(userId, book.id, book.title, book.author, book.publisher, book.image)}>
                                    Borrow
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default BookCard;
