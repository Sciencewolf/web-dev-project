import axios from "axios";
import AuthorType from "../../types/AuthorType.ts";
import baseUrl from "../requestUtils.ts";

function modifyAuthor(author: AuthorType) {
    return axios.put(
        `${baseUrl()}/modify-author?id=${author.id}&firstname=${author.firstname}&lastname=${author.lastname}&birthdate=${author.birthdate}&image=${author.image}&bio=${author.bio}`,
        {key: author.id},
        {
            headers: {
                'x-api-key': sessionStorage.getItem('apiKey') as string
            }
        })
}

export default modifyAuthor;