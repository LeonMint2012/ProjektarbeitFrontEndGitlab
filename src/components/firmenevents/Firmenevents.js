import React from 'react'
import useAuth from '../../hooks/useAuth'
import { useState } from 'react'
import NeuesFirmenevent from './NeuesFirmenevent';

const Firmenevents = () => {
  const { auth } = useAuth();

  const [firmenevents, setFirmenevents] = useState([]);
  const [mitarbeiterDaten, setMitarbeiterDaten] = useState([]);

  React.useEffect(() => {
    fetch("http://localhost:8080/api/firmenevent/alleFirmenevents", {
      headers: {
        "Authorization": "Bearer " + auth.token
      }
    })
      .then(res => res.json())
      .then(data => {
        setFirmenevents(data)
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
        
      })
  }, [])

  const teilnehmen = (firmenevent) => {
    //console.log("UserId teilnehmen: " + auth.userId + "FirmeneventId: " + firmenevent.id);
    var data = {
      "firmeneventId": firmenevent.id,
      "mitarbeiterId": auth.userId
    }
    fetch("http://localhost:8080/api/firmenevent/teilnehmen", {
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
        const neuFirmeneventList = firmenevents.map(firmenevent => {
          if (firmenevent.id === data.id) {
            return { ...firmenevent, mitarbeiterIdTeilnehmer: data.mitarbeiterIdTeilnehmer }
          }
          return firmenevent
        })
        setFirmenevents(neuFirmeneventList);
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
      <h2 className="text-center">Startseite der Firmenevents</h2>
      <NeuesFirmenevent setFirmenevents={setFirmenevents} />
      <p>Liste der aktuellen anstehenden Firmenevents:</p>
      <ul>
        {firmenevents.map(firmenevent => {
          return (
            <li key={firmenevent.id}>
              <p>Firmenevent Id: {firmenevent.id}</p>
              <p>Titel: {firmenevent.titel}</p>
              <p>Beschreibung: {firmenevent.beschreibung}</p>
              <p>Ort: {firmenevent.ort}</p>
              <p>Uhrzeit: {firmenevent.uhrzeit}</p>
              <p>Erstellt von: {getVorUndNachnameMitMitabeiterId(firmenevent.mitarbeiterIdErsteller)}</p>
              <p>Teilnehmer: {firmenevent.mitarbeiterIdTeilnehmer ? getVorUndNachnameMitMitabeiterId(firmenevent.mitarbeiterIdTeilnehmer) : ""}</p>
              <button onClick={() => teilnehmen(firmenevent)}>Teilnehmen</button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default Firmenevents
