import addUser from "../../Utils/userUtils/addUser.ts";
import {useEffect, useState} from "react";
import {useGoogleLogin} from "@react-oauth/google";
import getGoogleUserInfo from "../../Utils/userUtils/googleUser.ts";
import LoginSignupForm from "../../components/LoginSignupForm.tsx";
import validateUser from "../../Utils/userUtils/validateUser.ts";
import Navbar from "../../components/navbar.tsx";
import {getApiKey} from "../../Utils/requestUtils.ts";
import setSessionStorage from "../../Utils/setSessionStorage.ts";


function SignUp() {
    document.querySelector('title')!.innerText = "Library | Signup"

    const [isAlert, setIsAlert] = useState<boolean>(false);
    const [googleUser, setGoogleUser] = useState([]);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setIsAlert(false)
        }, 5000)

        return () => clearTimeout(timeout);

    }, [isAlert]);


    useEffect(() => {
        if (googleUser) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            getGoogleUserInfo(googleUser.access_token).then((res) => {
                validateUser(res.data.name).then((r) => {

                    if(r.data.response.length === 0) {

                        getApiKey().then(r => {
                            sessionStorage.setItem('apiKey', r.data.apiKey);

                            addUser(res.data.name, '').then(() => {
                                setSessionStorage(res.data.picture, res.data.name, true, false, r.data.apiKey);

                                window.location.href = '/home';
                            }).catch((err) => {
                                console.error(err);
                                setIsAlert(true);
                            })
                        })

                    } else {
                        setIsAlert(true);
                    }
                }).catch((err) => {
                    console.error(err)
                    setIsAlert(true);
                })

            }).catch((err) => {
                console.error(err)
            });
        }
    }, [googleUser]);

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
        },
    });

    const onSignUp = () => {
        const nicknameField = document.getElementById('nickname') as HTMLInputElement;
        const passwordField = document.getElementById('password') as HTMLInputElement;

        getApiKey().then(r => {
            sessionStorage.setItem('apiKey', r.data.apiKey);

            addUser(nicknameField.value, passwordField.value).then((res) => {
                if(res.data.added[0] === 'error') {
                    nicknameField.value = '';
                    passwordField.value = '';
                    nicknameField.focus();

                    setIsAlert(true);
                } else {
                    sessionStorage.setItem('loggedIn', 'true');
                    sessionStorage.setItem('user', 'true');
                    sessionStorage.setItem('profileName', res.data.added[0].nickname);

                    window.location.href = '/home';
                }
            }).catch((err) => {
                console.error(err)
                setIsAlert(true);
            });
        })


    }

    return (
        <>
            <Navbar />

            {isAlert && (
                <>
                    <div className="alert alert-danger position-absolute bottom-0 right-2" role="alert">
                        User already exists!
                    </div>
                </>
            )}

            <LoginSignupForm isLogin={false}
                             onLogin={() => {}}
                             onSignUp={onSignUp}
                             onGoogle={handleGoogleLogin} />
        </>
    )
}

export default SignUp;