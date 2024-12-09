import {useEffect, useState} from "react";
import getAllBooks from "../../Utils/bookUtils/getAllBooks.ts";
import handleBorrow from "../../Utils/borrowedUtils/handleBorrow.ts";
import BookType from "../../types/BookType.ts";

function Discover() {
    const [books, setBooks] = useState<BookType[]>([]);

    const [userName] = useState<string | null>(sessionStorage.getItem('profileName'));


    useEffect(() => {
        getAllBooks(3)
            .then(res => setBooks(res.data))
            .catch(err => console.log(err));
    }, []);

    return (
        <>
            <div className={"d-flex justify-content-center flex-wrap gap-3"}>
                {books.map(book => (
                    <div className={"card w-80 h-96 p-3"} key={book.id} style={{backgroundColor: "lightblue"}}>
                        <center>
                            <img src={book.image} alt={book.title} className={"w-36 h-60 object-cover"} />
                        </center>
                        <div className={"card-body"}>
                            <h2 className={"card-title text-2xl line-clamp-2"}>{book.title}</h2>
                            <p className={"card-text text-xl"}>{book.author}</p>
                            <p className={"card-text text-sm"}>{book.publisher}</p>
                        </div>
                        {userName !== null && (
                            <>
                                <div className={"card-footer text-muted p-3"}>
                                    <button className={"btn btn-success"} onClick={() => {
                                        handleBorrow(sessionStorage.getItem("profileName")!, book.id, book.title, book.author, book.publisher, book.image);
                                    }}>Borrow
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                ))}
            </div>
            <button className={"btn btn-info"}>
                <a href={"/books"} target={"_self"}>Load More</a>
            </button>

        </>
    )
}

export default Discover;