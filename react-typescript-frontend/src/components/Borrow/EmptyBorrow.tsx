function EmptyBorrow() {
    return (
        <>
            <h1 className={"text-center text-white"}>You have no borrowed books!</h1>

            <div className={"d-flex justify-content-center gap-3 pt-3"}>
                <a href={"/books"} target={"_self"} className={"btn btn-primary"}>Go to Books</a>
                <a href={"/home"} target={"_self"} className={"btn btn-info"}>Home</a>
            </div>
        </>
    )
}

export default EmptyBorrow;