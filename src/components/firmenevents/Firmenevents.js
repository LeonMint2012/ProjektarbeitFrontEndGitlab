import React from 'react'
import useAuth from '../../hooks/useAuth'
import { useState } from 'react'
import NeuesFirmenevent from './NeuesFirmenevent';

const Firmenevents = () => {
  const {auth} = useAuth();

  const [firmenevents, setFirmenevents] = useState([]);

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

  const teilnehmen = (firmenevent) => {
    console.log("UserId teilnehmen: " + auth.userId + "FirmeneventId: " + firmenevent.id);
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
          if(firmenevent.id === data.id){
            return{...firmenevent, mitarbeiterIdTeilnehmer: data.mitarbeiterIdTeilnehmer}
          }
          return firmenevent
        })
        setFirmenevents(neuFirmeneventList);
      })
  }

  
  return (
    <div>
      <h2 className="text-center">Startseite der Firmenevents</h2>
      <NeuesFirmenevent setFirmenevents={setFirmenevents}/>
      <p>Liste der aktuellen anstehenden Firmenevents:</p>
      <ul>
        {firmenevents.map(firmenevent => {
          return(
            <li key={firmenevent.id}>
              <p>Firmenevent Id: {firmenevent.id}</p>
              <p>Titel: {firmenevent.titel}</p>
              <p>Beschreibung: {firmenevent.beschreibung}</p>
              <p>Ort: {firmenevent.ort}</p>
              <p>Uhrzeit: {firmenevent.uhrzeit}</p>
              <p>Erstellt von: {firmenevent.mitarbeiterIdErsteller}</p>
              <p>Teilnehmer: {firmenevent.mitarbeiterIdTeilnehmer.toString()}</p>
              <button onClick={() => teilnehmen(firmenevent)}>Teilnehmen</button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default Firmenevents
