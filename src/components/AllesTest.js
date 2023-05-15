import { useNavigate, Link } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../kontext/AuthProvider";
import NeuerMitarbeiter from "./mitarbeiter/NeuerMitarbeiter";

import NeuerSchaden from "./schadensmeldung/NeuerSchaden";
import MitarbeiterProfil from "./mitarbeiter/MitarbeiterProfil";

const AllesTest = () => {
    const { setAuth } = useContext(AuthContext);
   

    const logout = async () => {
        // if used in more components, this should be in context 
        // axios to /logout endpoint 
        setAuth({});
        
    }

    return (
        <section>
            <h1>Home</h1>
            <br />
            
            
            <NeuerMitarbeiter/>
            {/* <NeuerGegenstand/>
            <AusgeliehendeGegenstaende/> */}
            <NeuerSchaden/>
            
            <Link to="/login">Go to the Login</Link>
            <br />
            <Link to="/register">Go to the Register</Link>
            <br />
            <br />
            <Link to="/gegenstand">Go to the Gegenstand page</Link>
            <br />
            <Link to="/mitarbeiter">Go to the Mitarbeiter page</Link>
            <br />
            <Link to="/neueSchadensmeldung">Go to the neue Schadenmeldung</Link>
            <br />
            <Link to="/alleSchadensmeldungen">Go to the alle Schadenmeldungen</Link>
            <br />
            
            <button onClick={logout}>Sign Out</button>       
        </section>
    )
}

export default AllesTest;