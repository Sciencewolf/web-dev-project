function LoginSignupForm(
    {
        isLogin,
        onLogin,
        onSignUp,
        onGoogle
    }:
    {
        isLogin: boolean,
        onLogin: () => void,
        onSignUp: () => void,
        onGoogle: () => void
    }
) {

    return (
        <>
            <div className={"d-flex justify-content-center align-items-center flex-col p-5 rounded"}
                 style={{backgroundColor: "#E8F5E9"}}>
                <div className="mb-10 flex flex-col items-center justify-center">
                    <h3 className={"text-black text-4xl"}>{isLogin ? "Login" : "Sign Up"}</h3>
                    {!isLogin && <p className={"text-black text-sm"}>Create your account</p>}
                </div>

                <div className="mb-10 flex flex-col items-start justify-center">
                    <label
                        htmlFor="nickname"
                        className="block mb-2 text-sm font-medium text-black dark:text-white"
                    >
                        Your nickname
                    </label>
                    <input
                        type="text"
                        id="nickname"
                        className="bg-gray-50 border border-gray-300 text-black-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required
                        autoFocus={true}
                    />
                </div>

                <div className="mb-10 flex flex-col items-start justify-center">
                    <label
                        htmlFor="password"
                        className="block mb-2 text-sm font-medium text-black dark:text-white"
                    >
                        Your password
                    </label>
                    <input
                        type="password"
                        id="password"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required
                    />
                </div>

                <div className="mb-10 flex flex-col items-start justify-center">
                    <button
                        type="submit"
                        id="submit-btn"
                        onClick={isLogin ? onLogin : onSignUp}
                        className="text-white bg-blue-900 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-800 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        {isLogin ? "Login" : "Create"}
                    </button>
                </div>

                <div className="mb-7 flex flex-col items-start justify-center">
                    <span className="or-text">OR</span>
                </div>

                <div className="flex items-center justify-center">
                    <button type="button"
                            onClick={onGoogle}
                            className="px-4 py-2  flex gap-2 border-slate-200 rounded-lg text-slate-700 dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-900 dark:hover:text-slate-300 hover:shadow transition duration-150"
                    >
                        <img
                            className="w-6 h-6"
                            src="https://www.svgrepo.com/show/475656/google-color.svg"
                            loading="lazy"
                            alt="google logo"
                        />
                        <span>Continue with Google</span>
                    </button>
                </div>

                <span className={"text-black pt-5"}>
                    {isLogin ?
                        "Don't have an account? "
                        :
                        "Already have an account? "
                    }
                    {isLogin ?
                        <a href={"/signup"} className={"text-black"}>Sign up</a>
                        :
                        <a href={"/login"} className={"text-black"}>Login</a>
                    }
                </span>
            </div>
        </>
    )
}

export default LoginSignupForm;