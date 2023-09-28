import React from "react";
import { useState, useContext } from "react";
import AuthContext from "../../kontext/AuthProvider";
import {  useNavigate, useLocation } from 'react-router-dom';

function Login(){
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const [mitarbeiter, setMitarbeiter] = useState("admin");

    const [passwort, setPasswort] = useState("pwd");

    //const [jwtToken, setjwtToken] = useState("");
    const { setAuth } = useContext(AuthContext);

    const [showModal, setShowModal] = useState(false)
    const [nutzerRueckmeldung, setNutzerRueckmeldung] = useState(null);

    function anmelden(event){
        event.preventDefault()
        var data = {
            "username":mitarbeiter,
            "password": passwort
        }
        fetch("http://localhost:8080/api/auth/login", {
            method: 'POST',
            headers: new Headers({
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify(data)
        })  
            .then(response => {
                if(!response.ok){
                    openModal("Anmeldung fehlgeschlagen")
                  
                }
                return response.json()
            })
            .then(data => {
                //console.log(data)          
                const userId = data?.userId
                const username = data?.username
                const token = data?.token
                const rollen = data?.role
                //console.log(userId + " " + username + " " +  token + " " + rollen)
                setAuth({userId, username, token, rollen})
                navigate(from, {replace: true})
               
            }
            )  
            
    }

    function openModal(nachricht){
        setNutzerRueckmeldung(nachricht)
        setShowModal(true)
    }
    function closeModal(){
        setShowModal(false)
    }



    return(
        <section>
            <div className="center-form">
            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <p>{nutzerRueckmeldung}</p>
                        <button onClick={closeModal}>OK</button>
                    </div>
                </div>
            )}
            <form>
                <fieldset>
                    {/* kein Feedback über anmeldung */}
                    <legend>Anmelden</legend>
                    <label>Benutzeremail
                        <input
                            type="text"
                            placeholder="mustermail"
                            onChange={(e) => setMitarbeiter(e.target.value)}
                            value={mitarbeiter}
                            default="test"
                        />
                    </label>
                    <label>Passwort:
                        <input
                                type="password"
                                onChange={(e) => setPasswort(e.target.value)}
                                value={passwort}
                            />
                    </label>
                    <br/>
                    <button onClick={anmelden}>Anmelden</button>
                </fieldset>
            </form>
            </div>
        </section>
    );
};

export default Login;