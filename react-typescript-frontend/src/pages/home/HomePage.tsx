import Navbar from "../../components/navbar.tsx";
import Discover from "../../components/Home/DiscoverComponent.tsx";
import Authors from "../../components/Home/AuthorsComponent.tsx";


function Home() {
    document.querySelector('title')!.innerText = "Library | Home"

    return (
        <>
            <div className={"p-4 d-flex flex-column justify-content-center align-items-center gap-3"}>
                <Navbar/>

                <div className={"d-flex justify-content-center align-items-center flex-row gap-2 mt-20"}>
                    <img src="https://img.icons8.com/ios/50/compass--v1.png" alt="compass"/>
                    <h1 className={"text-black"}>Discover</h1>
                </div>

                <Discover/>

                <hr className={"w-100"}/>

                <div className={"d-flex justify-content-center align-items-center flex-row gap-2"}>
                    <img src="https://img.icons8.com/ios-filled/50/leanpub.png" alt="compass"/>
                    <h1 className={"text-black"}>Authors</h1>
                </div>

                <Authors/>

                <hr className={"w-100"}/>
            </div>
        </>
    )
}

export default Home