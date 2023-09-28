import React from 'react'
import useAuth from '../../hooks/useAuth'
import { useState, useEffect } from 'react'
const FirmeneventsAngemeldet = () => {
    const { auth } = useAuth();

    const [angemeldeteEvents, setAngemeldeteEvents] = useState([]);
    const [mitarbeiterDaten, setMitarbeiterDaten] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:8080/api/firmenevent/alleTeilgenommenenFirmenventsVon/${auth.userId}`, {
            headers: {
                "Authorization": "Bearer " + auth.token
            }
        })
            .then(response => response.json())
            .then(data => {
                setAngemeldeteEvents(data)

            })
    }, [])

    React.useEffect(() => {
        fetch("http://localhost:8080/api/mitarbeiter/alleMitarbeiterMinimal", {
          headers: {
            "Authorization": "Bearer " + auth.token
          }
        })
          .then(res => res.json())
          .then(data => {
            setMitarbeiterDaten(data)
            //console.log(mitarbeiterDaten)
          })
      }, [])

    const absagen = (firmenevent) => {
        //console.log("UserId teilnehmen: " + auth.userId + "FirmeneventId: " + firmenevent.id);
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

    const getVorUndNachnameMitMitabeiterId = (ids) => {
        var namen = "";
        //Prüft, ob nur ein Teilnehmer in Namensliste umgewandelt werden soll oder mehrere Teilnehmer. Ein Teilnehmer ist nicht itterierbar, deswegen Unterscheidung.
        if(Array.isArray(ids)){
          //console.log("ist array:" + ids)
          for(const id of ids){
            for (const element of mitarbeiterDaten) {
              if (element.id === id) {
                namen += "" + element.vorname + " " + element.nachname + ",";
              }
            }
          }
        } else {
          //console.log("ist nur eins" + ids)
          for (const element of mitarbeiterDaten) {
            if (element.id === ids) {
              return "" + element.vorname + " " + element.nachname;
            }
          }
        }
        if(namen.endsWith(",")){
          namen = namen.slice(0, -1)
    
        }
        return namen;
      }

    return (
        <div>
            <ul>
                {angemeldeteEvents.length ?
                    angemeldeteEvents.map(firmenevent => {
                        return (
                            <div>
                                <li key={firmenevent.id}>
                                    <p>Firmenevent Id: {firmenevent.id}</p>
                                    <p>Titel: {firmenevent.titel}</p>
                                    <p>Beschreibung: {firmenevent.beschreibung}</p>
                                    <p>Ort: {firmenevent.ort}</p>
                                    <p>Uhrzeit: {firmenevent.uhrzeit}</p>
                                    <p>Erstellt von: {getVorUndNachnameMitMitabeiterId(firmenevent.mitarbeiterIdErsteller)}</p>
                                    <p>Teilnehmer: {getVorUndNachnameMitMitabeiterId(firmenevent.mitarbeiterIdTeilnehmer)}</p>

                                </li>
                                <button className="button-profile2" onClick={() => absagen(firmenevent)}>Abmelden</button>
                            </div>
                        )
                    })
                    : "Du hast dich aktuell zu keinen Firmenevents angemeldet"
                }
            </ul>
        </div>
    )
}

export default FirmeneventsAngemeldet
