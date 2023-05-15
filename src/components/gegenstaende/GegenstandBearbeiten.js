import React from 'react'
import { useState, useEffect } from 'react';
import "../../App.css"
const GegenstandBearbeiten = ({editierterGegenstand, handleUpdateGegenstand, schliesseEditDialog}) => {
    //(mitarbeiter), bezeichnung, preis, (istAusgeliehen(automatisch ändern, wenn mitarbeiter entfernt/hinzugefügt wird))
    const [neuGegenstandFormData, setNeuGegenstandFormData] = useState(
        {   
            id:editierterGegenstand.id,
            mitarbeiterId:editierterGegenstand.mitarbeiterId,
            bezeichnung: editierterGegenstand.bezeichnung,
            preis: editierterGegenstand.preis         
        }
    )

    function handleChange(event) {
        const { name, value, type, checked } = event.target
        setNeuGegenstandFormData(prevFormData => {
            return {
                ...prevFormData,
                [name]: value
            }
        });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        handleUpdateGegenstand(neuGegenstandFormData)
    }
    return (
        <div
            role="dialog"
        // onClick fürs schließen
        >
            <form>
                {/* Es soll nur möglich sein Mitarbeiter zu entfernen, Umsetzung: Button? */}
                <label>Ausgeliehen von
                    <input
                        type="text"
                        onChange={handleChange}
                        value={neuGegenstandFormData.mitarbeiterId ? neuGegenstandFormData.mitarbeiterId : "Niemandem"}
                        name="mitarbeiterId"
                    />
                </label>
                <label>Bezeichnung
                        <input
                            type="text"
                            onChange={handleChange}
                            name="bezeichnung"
                            value={neuGegenstandFormData.bezeichnung}
                        />
                </label>
                <label>Preis:
                        <input
                            type="number"
                            onChange={handleChange}
                            name="preis"
                            value={neuGegenstandFormData.preis}
                        />
                </label>
                <button onClick={handleSubmit}>Speichern</button>
                <button onClick={schliesseEditDialog}>Abbrechen</button>
            </form>
        </div>
    )
}

export default GegenstandBearbeiten
