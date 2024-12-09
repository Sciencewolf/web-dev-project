import axios from "axios";

function getGoogleUserInfo(accessToken: unknown) {
    return axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${accessToken}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
            Accept: 'application/json',
        }
    })
}

export default getGoogleUserInfo;