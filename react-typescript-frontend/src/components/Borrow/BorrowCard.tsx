import BorrowType from "../../types/BorrowType.ts";

function BorrowCard({item, handleRemove}: {
    item: BorrowType,
    handleRemove: (id: number, book_id: number, user_id: string) => void
}) {

    return (
        <>
            <div className="card w-80 h-96 p-3" key={item.id} style={{backgroundColor: "lightblue"}}>
                <center>
                    <img src={item.book_image} alt={item.book_title}
                         className={"w-36 h-60 object-cover"}/>
                </center>
                <div className={"card-body"}>
                    <h2 className={"card-title text-2xl"}>{item.book_title}</h2>
                    <p className={"card-text text-lg"}>{item.book_author}</p>
                    <p className={"card-text text-sm"}>{item.book_publisher}</p>
                    <p className={"card-text text-sm"}>
                        {Intl.DateTimeFormat("hu-HU", {
                                dateStyle: "medium"
                            }).format(new Date(item.loan_date.split(' ')[0].replace(/-/g, '.')))
                            + ' - ' +
                            Intl.DateTimeFormat("hu-HU", {
                                dateStyle: 'medium'
                            }).format(new Date(item.return_deadline.split(' ')[0].replace(/-/g, '.')))
                        }
                    </p>

                    <button className="btn btn-danger"
                            onClick={() => {
                                handleRemove(item.id, item.book_id, item.user_id)
                            }
                            }>Remove
                    </button>
                </div>
            </div>
        </>
    )
}

export default BorrowCard;