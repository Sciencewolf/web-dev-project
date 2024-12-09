import axios from "axios";
import AuthorType from "../../types/AuthorType.ts";
import baseUrl from "../requestUtils.ts";

function addAuthor(author: AuthorType) {
    return axios.post(`${baseUrl()}/add-author?firstname=${author.firstname}&lastname=${author.lastname}&birthdate=${author.birthdate}&image=${author.image}&bio=${author.bio}`);
}

export default addAuthor;