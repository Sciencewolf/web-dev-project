import {ChangeEvent, FormEvent, useEffect, useState} from "react";
import getAllAuthors from "../../Utils/authorUtils/getAllAuthors.ts";
import modifyAuthor from "../../Utils/authorUtils/modifyAuthor.ts";
import deleteAuthor from "../../Utils/authorUtils/deleteAuthor.ts";
import addAuthor from "../../Utils/authorUtils/addAuthor.ts";
import Navbar from "../../components/navbar.tsx";
import AuthorForm from "../../components/Authors/AuthorForm.tsx";
import AuthorDetails from "../../components/Authors/AuthorDetails.tsx";
import AuthorCard from "../../components/Authors/AuthorCard.tsx";
import AuthorType from "../../types/AuthorType.ts";


function AuthorsPage() {
    document.querySelector('title')!.innerText = 'Library | Authors';

    const [open, setOpen] = useState<boolean>(false);
    const [edit, setEdit] = useState<boolean>(false);
    const [add, setAdd] = useState<boolean>(false);
    const [reload, setReload] = useState<boolean>(false);
    const [authors, setAuthors] = useState<AuthorType[]>([]);

    const [userName] = useState<string | null>(sessionStorage.getItem('profileName'));

    const [isAlert, setIsAlert] = useState<boolean>(false);

    const [authorData, setAuthorData] = useState<AuthorType>({
        id: 0,
        firstname: "",
        lastname: "",
        birthdate: "",
        image: "",
        bio: ""
    });

    useEffect(() => {
        const timeout = setTimeout(() => {
            setIsAlert(false)
        }, 5000)

        return () => clearTimeout(timeout);

    }, [isAlert]);

    useEffect(() => {
        getAllAuthors()
            .then((res) => {
                setAuthors(res.data);
                console.log(res);
            })
            .catch((err) => {
                console.log(err)
                setIsAlert(true)
            });
    }, [reload]);

    const handleOpen = (item: AuthorType) => {
        setOpen(true);
        setEdit(false);
        setAuthorData(item);
    };

    const handleModifySubmit = () => {
        modifyAuthor(authorData)
            .then(() => {
                setReload(prev => !prev);
                setOpen(false);
            }).catch(err => {
                console.log(err);
                setIsAlert(true)
        });
    };

    const handleDelete = (id: number) => {
        deleteAuthor(id)
            .then(() => {
                setReload(prev => !prev);
                setOpen(false);
            }).catch(err => {
                console.log(err);
                setIsAlert(true)
            });
    };

    const handleAddSubmit = (e: FormEvent) => {
        e.preventDefault();

        if (!authorData.firstname || !authorData.lastname) {
            setIsAlert(true)
            return;
        }

        addAuthor(authorData)
            .then(() => {
                setAuthorData({
                    id: 0,
                    firstname: "",
                    lastname: "",
                    birthdate: "",
                    image: "",
                    bio: ""
                });

                setReload(prev => !prev);
                setOpen(false);
                setAdd(false);
            })
            .catch(err => {
                console.log(err)
                setIsAlert(true)
            });
    };

    const handleAddButtonClick = () => {
        setAdd(true);
        setAuthorData({
            id: 0,
            firstname: "",
            lastname: "",
            birthdate: "",
            image: "",
            bio: ""
        });
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setAuthorData((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <>
            <Navbar />

            {isAlert && (
                <>
                    <div className="alert alert-danger position-absolute bottom-0 right-2" role="alert">
                        Something went wrong!
                    </div>
                </>
            )}

            {/* Edit Author */}
            {open && edit && (
                <div>
                    <AuthorForm author={authorData}
                                onChange={handleChange}
                                onSubmit={handleModifySubmit}
                                onCancel={() => setOpen(false)} />
                </div>
            )}

            {/* View Author */}
            {open && !edit && (
                <AuthorDetails
                    author={authorData}
                    onEdit={() => {
                        setEdit(true);
                    }}
                    onDelete={() => handleDelete(authorData.id)}
                    onClose={() => setOpen(false)}
                    isUserName={userName !== null}
                />
            )}

            {/* All Authors */}
            {!open && !add && (
                <>
                    <div className="d-flex justify-content-center flex-wrap gap-3 pt-20 pb-5">
                        {authors.map((author) => (
                            <AuthorCard key={author.id} author={author} onClick={() => handleOpen(author)}/>
                        ))}
                    </div>

                    {userName && (
                        <>
                            <div className="d-flex justify-content-center align-items-center gap-4 py-4">
                                <button
                                    className="btn btn-success d-flex justify-content-center align-items-center gap-2"
                                    onClick={() => {
                                        setAdd(true);
                                        handleAddButtonClick()
                                    }
                                    }>
                                    <span>Add Author</span>
                                </button>
                            </div>
                        </>
                    )}
                </>
            )}

            {/* Add Author Form */}
            {add && (
                <div>
                    <AuthorForm author={authorData}
                                onChange={handleChange}
                                onSubmit={handleAddSubmit}
                                onCancel={() => setAdd(false)}/>
                </div>
            )}
        </>
    );
}

export default AuthorsPage;
