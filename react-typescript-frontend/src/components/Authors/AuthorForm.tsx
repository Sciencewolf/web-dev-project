import {ChangeEvent, FormEvent, useEffect, useRef} from "react";
import AuthorType from "../../types/AuthorType.ts";

// Author Form Component (Used for Adding and Editing Authors)
const AuthorForm = (
    {
        author,
        onChange,
        onSubmit,
        onCancel
    }: {
        author: AuthorType;
        onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
        onSubmit: (e: FormEvent) => void;
        onCancel: () => void;
    }) => {

    document.querySelector("title")!.innerText = `Library | ${
        author.firstname + " " + author.lastname
    }`;

    // Make firstname input text selected
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (inputRef.current !== null) {
            inputRef.current.select();
        }
    }, []);

    return (
        <div>
            <div
                className={
                    "w-96 d-flex flex-col justify-content-center align-items-start gap-3 p-3"
                }
                style={{backgroundColor: "lightblue", borderRadius: "10px"}}
            >
                <div
                    className={
                        "flex flex-column gap-2 justify-content-center align-items-start"
                    }
                >
                    <label htmlFor="firstname">Firstname:</label>
                    <input
                        type="text"
                        ref={inputRef}
                        className="form-control form-control-lg"
                        style={{width: "350px"}}
                        name="firstname"
                        value={author.firstname}
                        onChange={onChange}
                        required={true}
                    />
                </div>

                <div
                    className={
                        "d-flex flex-col gap-2 justify-content-center align-items-start"
                    }
                >
                    <label htmlFor="lastname">Lastname:</label>
                    <input
                        type="text"
                        className="form-control form-control-lg"
                        style={{width: "350px"}}
                        name="lastname"
                        value={author.lastname}
                        onChange={onChange}
                        required={true}
                    />
                </div>
                <div
                    className={
                        "d-flex flex-col gap-2 justify-content-center align-items-start"
                    }
                >
                    <label htmlFor="birthdate">Birthdate:</label>
                    <input
                        type="date"
                        className="form-control form-control-lg"
                        style={{width: "350px"}}
                        name="birthdate"
                        value={
                            author.birthdate === ""
                                ? "1900-01-01"
                                : new Date(
                                    author.birthdate.replace(/\./g, "-")
                                )
                                    .toISOString()
                                    .slice(0, 10)
                        }
                        onChange={onChange}
                    />
                </div>
                <div className={
                        "d-flex flex-col gap-2 justify-content-center align-items-start"
                    }
                >
                    <label htmlFor="image">Image(url):</label>
                    <textarea className="form-control form-control-lg"
                              style={{width: "350px"}}
                              name="image"
                              rows={2}
                              value={author.image}
                              onChange={onChange}
                    />
                </div>

                <div className={
                        "d-flex flex-col gap-2 justify-content-center align-items-start"
                    }
                >
                    <label htmlFor="bio">Bio:</label>
                    <textarea className="form-control form-control-lg"
                        rows={5}
                        name="bio"
                        style={{width: "350px"}}
                        value={author.bio}
                        onChange={onChange}
                    />
                </div>
            </div>

            <div className="d-flex justify-content-center align-items-center gap-4 pt-3">
                <button className="btn btn-success" onClick={onSubmit}>
                    Submit
                </button>
                <button className="btn btn-primary" onClick={onCancel}>
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default AuthorForm;
