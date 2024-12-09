import AuthorType from "../../types/AuthorType.ts";


function AuthorDetails(
    {
        author,
        onEdit,
        onDelete,
        onClose,
        isUserName
    }: {
        author: AuthorType;
        onEdit: () => void;
        onDelete: () => void;
        onClose: () => void;
        isUserName: boolean;
    }) {

    document.querySelector('title')!.innerText = `Library | ${author.firstname + ' ' + author.lastname}`

    return (
        <div id="popup"
             className="d-flex justify-content-center align-items-center flex-col gap-1 max-w-96 z-index-1000 bg-blue-500">
            <h1>{author.firstname + ' ' + author.lastname}</h1>
            <img src={author.image} alt={author.firstname + ' ' + author.lastname} width="200" height="200"/>
            <p>{Intl.DateTimeFormat("hu-HU", {
                dateStyle: "long"
            }).format(new Date(author.birthdate))}</p>
            <p className="text-sm text-wrap">{author.bio}</p>
            <div className="d-flex justify-content-center align-items-center gap-4">
                {isUserName && (
                    <>
                        <button className="btn btn-info" onClick={onEdit}>Edit</button>
                        <button className="btn btn-danger" onClick={onDelete}>Delete</button>
                    </>
                )}
                <button className="btn btn-secondary" onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default AuthorDetails;