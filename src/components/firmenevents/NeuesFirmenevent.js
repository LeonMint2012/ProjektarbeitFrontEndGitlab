import React, { useEffect } from 'react'
import useAuth from '../../hooks/useAuth'
import { useState } from 'react'
import "../../App.css"
const NeuesFirmenevent = (props) => {
    const {auth} = useAuth()
    const [firmeneventNeuFormData, setFirmeneventNeuFormData] = useState(
        {
            titel: "",
            beschreibung: "", 
            ort: "",
            datum:"",
        }
    )
    
    const [toast, setToast] = useState(null);

    function showToast(nachricht) {
        setToast(nachricht);
    
        setTimeout(() => {
          setToast(null);
        }, 3000); // Schließt die Benachrichtigung nach 3 Sekunden
      };

    const [gueltigeUhrzeit, setGueltigeUhrzeit] = useState(false);

    useEffect(() =>{
        const dateForm = new Date(firmeneventNeuFormData.datum)
        const dateAktuell = new Date()
        setGueltigeUhrzeit(dateAktuell < dateForm)
    },[firmeneventNeuFormData.datum])

    function handleChange(event) {
        const { name, value } = event.target
        setFirmeneventNeuFormData(prevFormData => {
            return {
                ...prevFormData,
                [name]: value
            }
        });
    }
    const neuesFirmeneventErstellen = (event) =>{
        event.preventDefault()
        var data = {
            "titel": firmeneventNeuFormData.titel,
            "beschreibung": firmeneventNeuFormData.beschreibung,
            "mitarbeiterIdErsteller": auth.userId,
            "ort": firmeneventNeuFormData.ort,
            "datum": firmeneventNeuFormData.datum
        }
        fetch("http://localhost:8080/api/firmenevent/erstelleFirmenevent", {
            method: 'POST',
            headers: new Headers({
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Authorization":"Bearer " + auth.token
            }),
            body: JSON.stringify(data)
        })
            .then(reponse => reponse.json())
            .then(data => {
                console.log(data)
                props.setFirmenevents(prevFirmenevents =>[...prevFirmenevents, data])
                console.log("versendet")
                firmeneventNeuFormData.titel="";
                firmeneventNeuFormData.beschreibung="";
                firmeneventNeuFormData.ort="";
                firmeneventNeuFormData.datum="";
            })
        showToast("Neues Firmenevent erstellt")
    }
    return (
        <div>
            {toast && 
            <div className="toast"> 
                {toast}
            </div>}
            <p>Neues Firmenevent erstellen:</p>
            <form>
                <label>Titel:
                    <input
                        type='text'
                        onChange={handleChange}
                        name="titel"
                        value={firmeneventNeuFormData.titel}
                    />
                </label>
                <label>Beschreibung:
                    <input
                        type='text'
                        onChange={handleChange}
                        name="beschreibung"
                        value={firmeneventNeuFormData.beschreibung}
                    />
                </label>
                <label>Ort:
                    <input
                        type='text'
                        onChange={handleChange}
                        name="ort"
                        value={firmeneventNeuFormData.ort}
                    />
                </label>
                <div className="zeigeGueltig">
                    <label>Datum:
                        
                            <input
                                type='datetime-local'
                                onChange={handleChange}
                                name="datum"
                                value={firmeneventNeuFormData.datum}
                                min={new Date().toISOString().slice(0,16)}
                            />
                        
                    </label>
                </div>
                <button disabled={!gueltigeUhrzeit} onClick={neuesFirmeneventErstellen}>Neues Firmenevent erstellen</button>
            </form>
        </div>
    )
}

export default NeuesFirmenevent
