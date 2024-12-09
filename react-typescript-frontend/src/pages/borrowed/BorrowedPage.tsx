import Navbar from "../../components/navbar.tsx";
import {useEffect, useState} from "react";
import getAllBorrow from "../../Utils/borrowedUtils/getAllBorrow.ts";
import deleteBorrow from "../../Utils/borrowedUtils/deleteBorrow.ts";
import EmptyBorrow from "../../components/Borrow/EmptyBorrow.tsx";
import LoginToSee from "../../components/Borrow/LoginToSee.tsx";
import BorrowType from "../../types/BorrowType.ts";
import BorrowCard from "../../components/Borrow/BorrowCard.tsx";

function BorrowedPage() {
    document.querySelector('title')!.innerText = "Library | Borrowed";

    const [reload, setReload] = useState(false);
    const [borrowed, setBorrowed] = useState<BorrowType[]>([]);
    const [userName, setUserName] = useState<string | null>(sessionStorage.getItem('profileName'));

    const [isAlert, setIsAlert] = useState<boolean>(false);

    const [emptyResponse, setEmptyResponse] = useState<boolean>(false);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setIsAlert(false)
        }, 5000)

        return () => clearTimeout(timeout);

    }, [isAlert]);

    useEffect(() => {
        if (userName) {
            getAllBorrow(userName).then(res => {
                setBorrowed(res.data.borrow);
                console.debug(res.data.borrow);

                if (res.data.borrow.length === 0) {
                    setEmptyResponse(true);
                } else {
                    setEmptyResponse(false);
                }
            }).catch(err => {
                console.error(err);
            });
        } else {
            setUserName(null);
        }
    }, [userName, reload]);

    const handleRemove = (id: number, bookId: number, userId: string) => {
        deleteBorrow(id, bookId, userId).then(() => {
            setReload(prev => !prev);
        }).catch(err => {
            console.error(err);
            setIsAlert(true);
        })
    };

    return (
        <>
            {emptyResponse && <EmptyBorrow/>}

            {isAlert && (
                <>
                    <div className="alert alert-danger position-absolute bottom-0 right-2" role="alert">
                        Something went wrong!
                    </div>
                </>
            )}

            {userName ? (
                <>
                    <Navbar/>

                    <div className="d-flex justify-content-center align-items-center flex-row gap-3 pt-3">
                        {borrowed.map((item: BorrowType) => (
                            <BorrowCard item={item} handleRemove={handleRemove} />
                        ))}
                    </div>
                </>
            ) : <LoginToSee/>}
        </>
    );
}

export default BorrowedPage;
