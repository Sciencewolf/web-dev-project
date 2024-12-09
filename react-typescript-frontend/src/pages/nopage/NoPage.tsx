function NoPage() {
    return (
        <>
            <div className={"d-flex justify-center align-items-center flex-col"}>
                <p>The page you are looking for does not exist.</p>

                <div className={"d-flex justify-content-center gap-3 pt-3"}>
                    <a href={"/login"} target={"_self"} className={"btn btn-success"}>Login</a>
                    <a href={"/signup"} target={"_self"} className={"btn btn-info"}>Register</a>
                    <a href={"/home"} target={"_self"} className={"btn btn-primary"}>Go to Home</a>
                </div>
            </div>
        </>
    )
}

export default NoPage;