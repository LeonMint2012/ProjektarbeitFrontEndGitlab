import React from 'react'
import { useState } from 'react';
import "../../App.css"
const MitarbeiterBearbeiten = ({ editiereMitarbeiter, handleUpdateMitarbeiter, schliesseEditDialog }) => {
    const [neuMitarbeiterFormData, setNeuMitarbeiterFormData] = useState(
        {   
            id: editiereMitarbeiter.id,
            vorname: editiereMitarbeiter.vorname,
            nachname: editiereMitarbeiter.nachname,
            email: editiereMitarbeiter.email,
            rollen: editiereMitarbeiter.rollen,
            gehalt: editiereMitarbeiter.gehalt
        }
    )

    // https://react.dev/reference/react-dom/components/select#enabling-multiple-selection
    const handleChangeMultipleSelect = (event) =>{
        const optionen = [...event.target.selectedOptions];
        const values = optionen.map(option => option.value);

        setNeuMitarbeiterFormData({...neuMitarbeiterFormData, rollen: values})
    }

    function handleChange(event) {
        const { name, value } = event.target
        setNeuMitarbeiterFormData(prevFormData => {
            return {
                ...prevFormData,
                [name]: value
            }
        });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        handleUpdateMitarbeiter(neuMitarbeiterFormData)
    }
    return (
        <div
            role="dialog"
        >
            <form>
                <label>Gehalt
                    <input
                        type="number"
                        onChange={handleChange}
                        name="gehalt"
                        value={neuMitarbeiterFormData.gehalt}
                    />
                </label>
                <label>Rollen:
                    <select
                        name="rollen"
                        value={neuMitarbeiterFormData.rollen}
                        onChange={handleChangeMultipleSelect}
                        multiple={true}
                    >
                        <option value="USER">Mitabeiter</option>
                        <option value="HAUSMEISTER">Hausmeister</option>
                        <option value="HRM">Personalabteilung</option>
                        <option value="INVENTAR">Lagerist</option>
                        <option value="ADMIN">Admin</option>
                    </select>
                </label>
                <button onClick={handleSubmit}>Speichern</button>
                <button onClick={schliesseEditDialog}>Abbrechen</button>
            </form>
        </div>
    )
}

export default MitarbeiterBearbeiten
