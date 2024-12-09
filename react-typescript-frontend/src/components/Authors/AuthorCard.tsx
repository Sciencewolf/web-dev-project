import AuthorType from "../../types/AuthorType.ts";


const AuthorCard = ({ author, onClick }: { author: AuthorType; onClick: () => void }) => {
    return (
        <div className="card w-80 h-80 p-3" style={{ backgroundColor: "lightblue" }}>
            <center>
                <img className="object-cover w-44 h-60" src={author.image} alt={author.firstname} width={250} height={250} />
            </center>
            <div className="card-body">
                <h5 className="card-title">{author.firstname + ' ' + author.lastname}</h5>
                <p className="card-text line-clamp-4 text-sm">{author.bio}</p>
            </div>
            <div className="card-footer text-muted">
                <button className="btn btn-outline-primary" onClick={onClick}>
                    More
                </button>
            </div>
        </div>
    );
};

export default AuthorCard;