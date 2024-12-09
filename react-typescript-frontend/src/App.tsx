import './App.css'
import Home from "./pages/home/HomePage.tsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "./pages/login/LoginPage.tsx";
import SignUp from "./pages/signup/SignUpPage.tsx";
import Books from "./pages/books/BooksPage.tsx";
import AuthorsPage from "./pages/authors/AuthorsPage.tsx";
import BorrowedPage from "./pages/borrowed/BorrowedPage.tsx";
import NoPage from "./pages/nopage/NoPage.tsx";

function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path={"/"} element={ <Home /> } />
                <Route path={"home"} element={ <Home/> } />
                <Route path={"authors"} element={ <AuthorsPage/> } />
                <Route path={"borrowed"} element={ <BorrowedPage/> } />
                <Route path={"books"} element={ <Books/> } />
                <Route path={"login"} element={ <Login/> } />
                <Route path={"signup"} element={ <SignUp/> } />
                <Route path={"*"} element={ <NoPage/> } />
            </Routes>
        </BrowserRouter>
    )
}

export default App
