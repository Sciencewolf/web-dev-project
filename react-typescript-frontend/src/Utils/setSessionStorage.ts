function setSessionStorage(image: string, name: string, isLoggedIn: boolean, isUser: boolean, apiKey: string) {
    sessionStorage.setItem('profileImg', image);
    sessionStorage.setItem('profileName', name);
    sessionStorage.setItem('loggedIn', isLoggedIn.toString());
    sessionStorage.setItem('user', isUser.toString());
    sessionStorage.setItem('apiKey', apiKey);
}

export default setSessionStorage;