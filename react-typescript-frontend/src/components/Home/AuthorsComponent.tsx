import {useEffect, useState} from "react";
import getAllAuthors from "../../Utils/authorUtils/getAllAuthors.ts";
import AuthorType from "../../types/AuthorType.ts";

function Authors() {
    const [authors, setAuthors] = useState<AuthorType[]>([]);

    useEffect(() => {
        getAllAuthors(3)
            .then(res => setAuthors(res.data))
            .catch(err => console.log(err));
    }, []);

    return (
        <>
            <div className={"d-flex justify-content-center flex-wrap gap-3"}>
                {authors.map(author => (
                    <div className={"card max-w-80"} key={author.id}>
                        <center>
                            <img src={author.image} alt={author.firstname} className={"img-thumbnail"} width={150} height={150}/>
                        </center>
                        <div className={"card-body"}>
                        <h5 className={"card-title"}>{author.firstname + ' ' + author.lastname}</h5>
                            <p className={"card-text text-xs text-wrap"}>{author.bio}</p>
                        </div>
                    </div>
                ))}
            </div>
            <button className={"btn btn-info"}>
                <a href={"/authors"} target={"_self"}>Load More</a>
            </button>
        </>
    )
}

export default Authors;