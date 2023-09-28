import React from "react";
import '../../App.css';
import useAuth from "../../hooks/useAuth";
import {useState, useEffect} from 'react'


function NeuerSchaden({ onChange, onSubmit }) {
    const {auth} = useAuth();

    const [toast, setToast] = useState(null);

    function showToast(nachricht) {
        setToast(nachricht);
    
        setTimeout(() => {
          setToast(null);
        }, 3000); // Schließt die Benachrichtigung nach 3 Sekunden
      };

    
    const [schadenFormData, setSchadenFormData] = React.useState({
        gebaude: "",
        etage: 0,
        titel: "",
        beschreibung: "",
        dringlichkeit: "HOCH",
    });


    function handleInputChange(event) {
        const { name, value } = event.target;
        setSchadenFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
        
    }

    function addSchaden(event) {
        showToast("Schadenmeldung erfolgreich gesendet")
        event.preventDefault()
        var data = {
            "gebaeude": schadenFormData.gebaude,
            "etage": schadenFormData.etage,
            "titel": schadenFormData.titel,
            "beschreibung": schadenFormData.beschreibung,
            "dringlichkeit": schadenFormData.dringlichkeit
        }
        fetch("http://localhost:8080/api/schaden", {
            method: 'POST',
            headers: new Headers({              
                "Authorization":"Bearer " + auth.token,           
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify(data)
        })
            .then(reponse => reponse.json())

    }

    return (
        <div>

        {toast && (
        <div className="toast">
            {toast}
        </div>
        )}
            <div className="center-form">
                <form onSubmit={onSubmit}>
                    <fieldset>
                        <legend>Neuen Schaden hinzufügen:</legend>
                        <label>Gebäude*:
                            <input
                                type="text"
                                placeholder="Gebäude"
                                name="gebaude"
                                value={schadenFormData.gebaude}
                                onChange={handleInputChange}
                            />
                        </label>
                        <br />
                        <label>Etage:
                            <input
                                type="number"
                                placeholder="Etage"
                                name="etage"
                                value={schadenFormData.etage}
                                onChange={handleInputChange}
                            />
                        </label>
                        <br />
                        <label>Titel*:
                            <input
                                type="text"
                                placeholder="Titel"
                                name="titel"
                                value={schadenFormData.titel}
                                onChange={handleInputChange}
                            />
                        </label>
                        <br />
                        <label>Beschreibung:
                            <textarea
                                placeholder="Beschreibung"
                                name="beschreibung"
                                value={schadenFormData.beschreibung}
                                onChange={handleInputChange}
                            ></textarea>
                        </label>
                        <br />
                        <label>Dringlichkeit:
                            <select
                                name="dringlichkeit"
                                value={schadenFormData.dringlichkeit}
                                onChange={handleInputChange}
                            >
                                <option value="HOCH">Hoch</option>
                                <option value="MITTEL">Mittel</option>
                                <option value="GERING">Gering</option>
                            </select>
                        </label>
                        <br />
                        <button type="submit" disabled={schadenFormData.gebaude === "" || schadenFormData.titel === ""} onClick={addSchaden}>Schaden hinzufügen</button>
                    </fieldset>
                </form>
            </div>
        </div>
    );
}

export default NeuerSchaden;
