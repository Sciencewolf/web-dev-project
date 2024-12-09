function LoginToSee() {
    return (
        <>
            <h1>You are not logged in!</h1>

            <p>Please log in to access your borrowed books or register if you don't have an account yet.</p>

            <div className={"d-flex justify-content-center flex-col gap-3 pt-3"}>
                <div className={'d-flex justify-center align-content-around flex-row gap-2'}>
                    <a href="/login" className="btn btn-primary">Login</a>
                    <a href="/signup" className="btn btn-success">Register</a>
                </div>
                <span className={'or-text'}>OR</span>
                <div className={'d-flex justify-center align-content-around flex-row gap-2'}>
                    <a href={'/home'} className={'btn btn-info'}>Home</a>
                </div>
            </div>
        </>
    )
}

export default LoginToSee;