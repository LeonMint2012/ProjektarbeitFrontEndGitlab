import React from 'react'
import useAuth from '../../hooks/useAuth'
import { useState, useEffect } from 'react'
const FirmeneventsAngemeldet = () => {
    const { auth } = useAuth();

    const [angemeldeteEvents, setAngemeldeteEvents] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:8080/api/firmenevent/alleTeilgenommenenFirmenventsVon/${auth.userId}`, {
            headers: {
                "Authorization": "Bearer " + auth.token
            }
        })
            .then(response => response.json())
            .then(data => {
                setAngemeldeteEvents(data)
                for(const ele in data){
                    console.log(data.id)
                }
            })
    }, [])

    const absagen = (firmenevent) => {
        console.log("UserId teilnehmen: " + auth.userId + "FirmeneventId: " + firmenevent.id);
        var data = {
          "firmeneventId": firmenevent.id,
          "mitarbeiterId": auth.userId
        }
        fetch("http://localhost:8080/api/firmenevent/absagen", {
          method: 'POST',
          headers: new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "Authorization": "Bearer " + auth.token
          }),
          body: JSON.stringify(data)
        })
          .then(reponse => reponse.json())
          .then(data => {
            const neuAngemeldeteFirmenevents = angemeldeteEvents.filter(firmenevent => firmenevent.id !== data.id)
            setAngemeldeteEvents(neuAngemeldeteFirmenevents)
          })
      }

    return (
        <div>
            <ul>
                {angemeldeteEvents.length ?
                angemeldeteEvents.map(firmenevent => {
                    return (
                        <li key={firmenevent.id}>
                            <p>Firmenevent Id: {firmenevent.id}</p>
                            <p>Titel: {firmenevent.titel}</p>
                            <p>Beschreibung: {firmenevent.beschreibung}</p>
                            <p>Ort: {firmenevent.ort}</p>
                            <p>Uhrzeit: {firmenevent.uhrzeit}</p>
                            <p>Erstellt von: {firmenevent.mitarbeiterIdErsteller}</p>
                            <p>Teilnehmer: {firmenevent.mitarbeiterIdTeilnehmer}</p>
                            <button onClick={() => absagen(firmenevent)}>Abmelden</button>
                        </li>
                    )
                })
                : "Du hast dich aktuell zu keinen Firmenevents angemeldet"
                }
            </ul>
        </div>
    )
}

export default FirmeneventsAngemeldet
