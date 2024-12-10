import '../../style/login.css';
import {useGoogleLogin} from "@react-oauth/google";
import {useEffect, useState} from "react";
import validateUser from "../../Utils/userUtils/validateUser.ts";
import getGoogleUserInfo from "../../Utils/userUtils/googleUser.ts";
import LoginSignupForm from "../../components/LoginSignupForm.tsx";
import Navbar from "../../components/navbar.tsx";
import {getApiKey} from "../../Utils/requestUtils.ts";
import setSessionStorage from "../../Utils/setSessionStorage.ts";


function Login() {
    document.querySelector('title')!.innerText = "Library | Login";

    const [googleUser, setGoogleUser] = useState([]);
    const [isAlert, setIsAlert] = useState<boolean>(false);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setIsAlert(false)
        }, 5000)

        return () => clearTimeout(timeout);

    }, [isAlert]);

    /**
     * eslint-disable-next-line @typescript-eslint/ban-ts-comment
     * @ts-expect-error
     */
    const handleGoogleLogin = useGoogleLogin({
        onSuccess: (codeResponse) => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            setGoogleUser(codeResponse);
        },
        onError: (error) => {
            console.error('Login Failed:', error)
            setIsAlert(true)
        },
    });

    const handleLogin = () => {
        const nicknameField = document.getElementById('nickname') as HTMLInputElement;
        const passwordField = document.getElementById('password') as HTMLInputElement;

        validateUser(nicknameField.value).then((res) => {
            console.debug(res)

            if (res.data.response.length === 0) {
                setIsAlert(true);

                nicknameField.value = '';
                passwordField.value = '';
                nicknameField.focus()
            } else {
                getApiKey().then(r => {
                    console.debug(r.data.apiKey);

                    sessionStorage.setItem('loggedIn', 'true');
                    sessionStorage.setItem('user', 'true');
                    sessionStorage.setItem('profileName', res.data.response[0].nickname);
                    sessionStorage.setItem('apiKey', r.data.apiKey);

                    window.location.href = '/home';
                }).catch(err => {
                    console.error(err);
                })

            }
        }).catch((err) => {
            console.error(err)
            setIsAlert(true);
        });
    };


    useEffect(() => {
        if (googleUser) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            getGoogleUserInfo(googleUser.access_token).then((res) => {
                console.debug('google user', res)

                validateUser(res.data.name)
                    .then((resApi) => {
                        console.debug('google user validation from api', resApi)

                        if (resApi.data.response.length !== 0) {
                            getApiKey().then(r => {
                                setSessionStorage(res.data.picture, res.data.name, true, false, r.data.apiKey)

                                window.location.href = '/home';
                            }).catch(err => {
                                console.error(err);
                            })
                        } else {
                            console.error('google user validation from api', resApi)
                            setIsAlert(true);
                        }
                    }).catch(e => {
                        console.error('error at google user validation', e)
                })

            }).catch((err) => {
                console.error(err)
            });
        }
    }, [googleUser]);


    return (
        <>
            <Navbar />

            {isAlert && (
                <>
                    <div className="alert alert-danger position-absolute bottom-0 right-2" role="alert">
                        User not found. Check credentials or sign up.
                    </div>
                </>
            )}

            <LoginSignupForm isLogin={true}
                             onLogin={handleLogin}
                             onSignUp={() => {}}
                             onGoogle={handleGoogleLogin} />
        </>
    );

}

export default Login;
