import React from "react";
import '../../App.css';
import { useState } from 'react'

import useAuth from "../../hooks/useAuth";
const NeuerGegenstand = (props) =>{
    const {auth} = useAuth();
    const [gegenstandFormData, setGegenstandFormData] = React.useState(
        {
            bezeichnung: "",
            preis: 0,
        }
    )
    
    const [toast, setToast] = useState(null);

    function showToast(nachricht) {
        setToast(nachricht);
    
        setTimeout(() => {
          setToast(null);
        }, 3000); // Schließt die Benachrichtigung nach 3 Sekunden
      };

    function handleChange(event) {
        const { name, value, type, checked } = event.target
        setGegenstandFormData(prevFormData => {
            return {
                ...prevFormData,
                [name]: value
            }
        });
    }

    function addGegenstand(event) {
        event.preventDefault()
        var data = {
            "bezeichnung": gegenstandFormData.bezeichnung,
            "preis": gegenstandFormData.preis
        }
        fetch("http://localhost:8080/api/gegenstand/erstelleGegenstand", {
            method: 'POST',
            headers: new Headers({
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Authorization":"Bearer " + auth.token
            }),
            body: JSON.stringify(data)
        })
            .then(reponse => reponse.json())
            .then(data => props.setGegenstaende(prevItemData => [...prevItemData, data]))
        
        gegenstandFormData.bezeichnung = "";
        gegenstandFormData.preis = 0;
        showToast("Gegenstand erfolgreich erstellt");
    }

    // function ausleihen(event) {
    //     event.preventDefault()
    //     var data = {
    //         "gegenstandId": gegenstandFormData.gegenstandId,
    //         "mitarbeiterId": gegenstandFormData.mitarbeiterId
    //     }
    //     fetch("http://localhost:8080/api/gegenstand/ausleihen", {
    //         method: 'POST',
    //         headers: new Headers({
    //             'Accept': 'application/json',
    //             'Content-Type': 'application/json'
    //         }),
    //         body: JSON.stringify(data)
    //     })
    //         .then(reponse => reponse.json())
    //         .then(data => setItemData(prevItemData => prevItemData.map(
    //             //iteriert über alle Elemente der vorherigen liste, prüft ob die element id gleich der Gegenstandsid ist die ich vom veränderten Object zurückbekommen, wenn ja dann verändere den Status den Object 
    //             el => el.id === data.id ? { ...el, istAusgeliehen: true } : el
    //         )))
    // }

    
    return (
        <div>
            {toast && 
            <div className="toast">
                {toast}
            </div>}
            <p>Gegenstandsverwaltung:</p>
            <form>
                <fieldset>
                    <legend>Erstellen:</legend>
                    <label>Name des Gegenstands*:
                        <input
                            type="text"
                            placeholder="Bezeichnung"
                            onChange={handleChange}
                            name="bezeichnung"
                            value={gegenstandFormData.bezeichnung}
                        />
                    </label>
                    <br></br>
                    <label>Preis:
                        <input
                            type="number"
                            onChange={handleChange}
                            name="preis"
                            value={gegenstandFormData.preis}
                        />
                    </label>
                    <br></br>
                    <button disabled={gegenstandFormData.bezeichnung === ""} onClick={addGegenstand} type='button'>Neuen Gegenstand erstellen</button>
                </fieldset>
            </form>
           

            
         
            
        </div>
    );
}


export default NeuerGegenstand;