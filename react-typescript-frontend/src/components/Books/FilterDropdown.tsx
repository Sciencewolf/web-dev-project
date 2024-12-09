import BookType from "../../types/BookType.ts";

function FilterDropdown({books, onFilter}: { books: BookType[]; onFilter: (col: string, val: string) => void }) {
    books = removeDuplicateBooksByPublisher(books);

    return (
        <div className="dropdown show">
            <button type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
                    className="dropdown-toggle btn btn-primary">
                Filter by Publisher
            </button>
            <div className="dropdown-menu">
                {books.map((book: BookType) => (
                    <p key={book.id} className="dropdown-item text-sm hover:cursor-pointer"
                       onClick={() => onFilter("publisher", book.publisher)}>
                        {book.publisher}
                    </p>
                ))}
            </div>
        </div>
    );
}

const removeDuplicateBooksByPublisher = (books: BookType[]): BookType[] => {
    const seenPublishers = new Set<string>();

    return books.filter((book) => {
        if (!seenPublishers.has(book.publisher)) {
            seenPublishers.add(book.publisher);
            return true; // Keep this book
        }
        return false; // Skip duplicate publisher
    });
};

export default FilterDropdown;
