import '../style/navbar.css'
import {useEffect, useState} from "react";
import {googleLogout} from "@react-oauth/google";


function Navbar() {
    const [clicked, setClicked] = useState(false);

    const getCurrentPage: string = window.location.pathname.replace('/', '');

    const [profImg, setProfImg] = useState<string>();

    useEffect(() => {
        setProfImg(sessionStorage.getItem('profileImg') || "https://img.icons8.com/puffy-filled/32/name.png");
    }, [profImg]);

    const handleClick = () => setClicked(!clicked);

    const handleLogout = () => {
        sessionStorage.setItem('loggedIn', 'false');

        if (sessionStorage.getItem('user') === 'true') {
            sessionStorage.removeItem('profileName');
        } else {
            sessionStorage.removeItem('profileImg');
            sessionStorage.removeItem('profileName');
            googleLogout()
        }

        setClicked(false);
        window.location.href = '/home';
    }

    return (
        <>
            <div
                className={" d-flex justify-content-between flex-row align-items-center m-0 px-3 w-100 position-absolute top-0 left-0"}
                id={"navbar"}>
                <button id={"lib-button"}
                        className={"d-flex justify-content-center align-items-center gap-1"}
                        onClick={() => {
                            if (getCurrentPage !== 'home') {
                                window.location.href = '/home';
                            }
                        }
                        }>
                    <img src={"https://img.icons8.com/ios-filled/50/FFFFFF/literature--v1.png"} alt="book"
                         width="50" height="50"/>
                    <h1 className={"text-white text-xl"}>Library</h1>
                </button>

                {!['/login', '/signup'].includes(window.location.pathname) && (
                    <>
                        <div className={"d-flex justify-content-center align-items-center w-auto"} id={"nav-links"}>
                            <button className={getCurrentPage === 'borrowed' ? "btn btn-secondary" : 'btn btn-text text-black'}
                                    onClick={() => {
                                        if (getCurrentPage !== 'borrowed') {
                                            window.location.href = '/borrowed';
                                        }
                                    }}>Borrowed
                            </button>
                            <button className={getCurrentPage === 'authors' ? "btn btn-secondary" : ' btn btn-text text-black'}
                                    onClick={() => {
                                        if (getCurrentPage !== 'authors') {
                                            window.location.href = '/authors';
                                        }
                                    }}>Authors
                            </button>
                            <button className={getCurrentPage === 'books' ? "btn btn-secondary" : 'btn btn-text text-black'}
                                    onClick={() => {
                                        if (getCurrentPage !== 'books') {
                                            window.location.href = '/books';
                                        }
                                    }}>Books
                            </button>

                            {sessionStorage.getItem('loggedIn') === 'true' ? (
                                <>
                                    <div onClick={handleClick}
                                         className={"hover:cursor-pointer d-flex justify-content-center align-items-center gap-1 bg-cyan-50 rounded p-1"}>
                                        <img src={profImg}
                                             alt="profile" width="30" height="30"/>
                                        <p className={"text-black text-base mb-0 user-select-none"}>{sessionStorage.getItem('profileName') || ""}</p>
                                        <i className={clicked ? "fa fa-caret-up" : "fa fa-caret-down"}
                                           aria-hidden={"true"}/>
                                        {clicked &&
                                            <button
                                                type="button"
                                                onClick={handleLogout}
                                                id="logout"
                                                className="logout position-absolute -bottom-5 right-4 hover:cursor-pointer bg-cyan-50 text-red-800 p-1"
                                            >Logout</button>
                                        }
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div
                                        className={"d-flex justify-content-center align-items-center gap-1 bg-cyan-50 rounded p-1"}>
                                        <a href={"/login"} target={"_self"}
                                           className={"text-black btn btn-outline-light"}>Login</a>
                                        <a href={"/signup"} target={"_self"}
                                           className={"text-black btn btn-info"}>Register</a>
                                    </div>
                                </>
                            )}
                        </div>
                    </>
                )}
            </div>

        </>
    )
}

export default Navbar