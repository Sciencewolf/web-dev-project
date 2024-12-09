import {useState} from "react";
import BookType from "../../types/BookType.ts";
import InputItemComponent from "../inputItemComponent.tsx";

function BookForm(
    {
        book,
        onSubmit,
        onCancel
    }:
    {
        book: BookType | null;
        onSubmit: (book: BookType) => void;
        onCancel: () => void
    }
) {
    document.querySelector('title')!.innerText = book?.title
        ? `Library | Edit | ${book.title}`
        : 'Library | Add Book'

    const [id] = useState<number>(book?.id || 0);
    const [title, setTitle] = useState<string>(book?.title || '');
    const [author, setAuthor] = useState<string>(book?.author || '');
    const [publisher, setPublisher] = useState<string>(book?.publisher || "");
    const [image, setImage] = useState<string>(book?.image || "");

    const handleSubmit = () => {
        if(author !== '' && title !== '') {
            onSubmit({id: id, title, author, publisher, image});
        }
    };

    return (
        <>
            <div className={"d-flex justify-content-center align-items-center flex-col gap-2"}>
                <div className={"w-96 d-flex flex-col justify-content-center align-items-start gap-3 p-3"}
                     style={{backgroundColor: "lightblue", borderRadius: "10px"}}>
                    <InputItemComponent value={title}
                                        labelText={"Title"}
                                        rows={2}
                                        onChange={
                                            (e) => {
                                                setTitle(e.target.value)
                                            }
                                        }/>

                    <InputItemComponent value={author}
                                        labelText={"Author"}
                                        rows={2}
                                        onChange={
                                            (e) => {
                                                setAuthor(e.target.value)
                                            }
                                        }/>

                    <InputItemComponent value={publisher}
                                        labelText={"Publisher"}
                                        rows={2}
                                        onChange={
                                            (e) => {
                                                setPublisher(e.target.value)
                                            }
                                        }/>

                    <InputItemComponent value={image}
                                        labelText={"Image URL"}
                                        rows={4}
                                        onChange={
                                            (e) => {
                                                setImage(e.target.value)
                                            }
                                        }/>

                </div>

                <div className="mt-2 d-flex justify-content-center align-items-center gap-4">
                    <button className="btn btn-success" onClick={handleSubmit}>
                        Submit
                    </button>
                    <button className="btn btn-danger" onClick={onCancel}>
                        Cancel
                    </button>
                </div>

            </div>
        </>

    );
}

export default BookForm;
