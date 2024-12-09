import {useEffect, useState} from "react";
import getAllBooks from "../../Utils/bookUtils/getAllBooks.ts";
import modifyBook from "../../Utils/bookUtils/modifyBook.ts";
import deleteBook from "../../Utils/bookUtils/deleteBook.ts";
import addBook from "../../Utils/bookUtils/addBook.ts";
import filterBooks from "../../Utils/bookUtils/filterBooks.ts";
import '../../style/popup.css';
import Navbar from "../../components/navbar.tsx";
import BookCard from "../../components/Books/BookCard.tsx";
import BookForm from "../../components/Books/BookForm.tsx";
import BookDetails from "../../components/Books/BookDetails.tsx";
import FilterDropdown from "../../components/Books/FilterDropdown.tsx";
import BookType from "../../types/BookType.ts";

function Books() {

    document.querySelector('title')!.innerText = 'Library | Books'

    const [open, setOpen] = useState(false);
    const [edit, setEdit] = useState(false);
    const [add, setAdd] = useState(false);
    const [isFilter, setIsFilter] = useState(false);

    const [userName] = useState<string | null>(sessionStorage.getItem('profileName'));

    const [isAlert, setIsAlert] = useState<boolean>(false);

    const [books, setBooks] = useState<BookType[]>([]);
    const [filteredList, setFilteredList] = useState<BookType[]>([]);
    const [reload, setReload] = useState(false);
    const [currentBook, setCurrentBook] = useState<BookType | null>(null);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setIsAlert(false)
        }, 5000)

        return () => clearTimeout(timeout);
    }, [isAlert]);

    useEffect(() => {
        if (!isFilter) {
            getAllBooks()
                .then((res) => setBooks(res.data))
                .catch((err) => {
                    console.error(err)
                    setIsAlert(true)
                });
        }
    }, [reload]);

    const handleOpenPopup = (book: BookType) => {
        setCurrentBook(book);
        setOpen(true)
    };

    const handleClosePopup = () => {
        setOpen(false)
        setEdit(false)
        setAdd(false)
        setCurrentBook(null)
    };

    const handleEdit = () => {
        setEdit(true);
        setOpen(false);
    };

    const handleModifySubmit = (updatedBook: BookType) => {
        modifyBook(updatedBook)
            .then(() => {
                setReload((prev) => !prev);
                handleClosePopup()
            })
            .catch((err) => {
                console.error(err)
                setIsAlert(true)
            });
    };

    const handleDelete = (id: number) => {
        deleteBook(id)
            .then(() => {
                setReload((prev) => !prev);
                handleClosePopup();
            })
            .catch((err) => {
                console.error(err)
                setIsAlert(true)
            });
    };

    const handleAddSubmit = (newBook: BookType) => {
        addBook(newBook)
            .then(() => {
                setReload((prev) => !prev);
                handleClosePopup()
            })
            .catch((err) => {
                console.error(err)
                setIsAlert(true)
            });
    };

    const handleFilter = (col: string, val: string) => {
        filterBooks(col, val)
            .then((res) => {
                setFilteredList(res.data.filtered);
                setIsFilter(true);
            })
            .catch((err) => {
                console.error(err)
                setIsAlert(true)
            });
    };

    return (
        <>
            <Navbar/>

            {isAlert && (
                <>
                    <div className="alert alert-danger position-absolute bottom-0 right-2" role="alert">
                        Something went wrong!
                    </div>
                </>
            )}

            {/* BookDetails */}
            {open && (
                <BookDetails
                    book={currentBook!}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    onClose={handleClosePopup}
                    isUserName={userName !== null}
                />
            )}

            {/* Edit Form */}
            {edit && (
                <BookForm
                    book={currentBook}
                    onSubmit={handleModifySubmit}
                    onCancel={handleClosePopup}
                />
            )}

            {/* Add Form */}
            {add && (
                <BookForm
                    book={currentBook}
                    onSubmit={handleAddSubmit}
                    onCancel={handleClosePopup}
                />
            )}

            {/* Book Cards */}
            {!open && !edit && !add && (
                <>
                    <div
                        className="book-list d-flex justify-content-center align-items-center gap-2 flex-wrap pt-20 pb-3">
                        {isFilter ? (
                            filteredList.map((book) => (
                                <BookCard
                                    key={book.id}
                                    book={book}
                                    onOpen={() => handleOpenPopup(book)}
                                    userId={sessionStorage.getItem("profileName")!}
                                    isUserName={userName !== null}
                                />
                            ))
                        ) : (
                            books.map((book) => (
                                <BookCard
                                    key={book.id}
                                    book={book}
                                    onOpen={() => handleOpenPopup(book)}
                                    userId={sessionStorage.getItem("profileName")!}
                                    isUserName={userName !== null}
                                />
                            ))
                        )}
                    </div>

                    {/* Actions */}
                    <div className="pb-5">
                        {!isFilter && userName !== null && (
                            <>
                                <div className={"d-flex justify-content-center align-items-center gap-2 pb-3"}>
                                    <button className="btn btn-success" onClick={() => setAdd(true)}>
                                        Add Book
                                    </button>
                                    <FilterDropdown books={books} onFilter={handleFilter}/>
                                </div>
                            </>
                        )}
                        {isFilter && (
                            <button className="btn btn-primary" onClick={() => setIsFilter(false)}>
                                See All
                            </button>
                        )}
                    </div>
                </>
            )}
        </>
    );
}

export default Books;
