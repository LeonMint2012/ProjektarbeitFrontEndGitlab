import { Outlet } from "react-router-dom"
import Header from "../semanticElements/Header";
import Nav from "../semanticElements/Nav";
import Footer from "../semanticElements/Footer";
import useAuth from "../../hooks/useAuth";

const Layout = () => {
    const { auth } = useAuth();
    return (
        <main className="App">
            <Header/>
            {auth?.username && <Nav/>}
            <Outlet />
            <Footer/>
        </main>
    )
}

export default Layout;