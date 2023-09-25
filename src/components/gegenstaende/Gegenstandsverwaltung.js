import React from 'react'
import useAuth from '../../hooks/useAuth'
import { useState } from 'react';
import NeuerGegenstand from './NeuerGegenstand';
import GegenstandBearbeiten from './GegenstandBearbeiten';
const Gegenstandsverwaltung = () => {
  const { auth } = useAuth();

  const [gegenstaende, setGegenstaende] = useState([]);

  const [editierterGegenstand, setEditierterGegenstand] = useState(null);
  const [wirdEditiert, setWirdEditiert] = useState(false);
  const [mitarbeiterDaten, setMitarbeiterDaten] = useState([]);

  React.useEffect(() => {
    fetch("http://localhost:8080/api/gegenstand/alleGegenstaende", {
      headers: {
        "Authorization": "Bearer " + auth.token
      }
    })
      .then(res => res.json())
      .then(data => {
        setGegenstaende(data)
        console.log(gegenstaende)
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
        console.log(mitarbeiterDaten)
      })
  }, [])
  // function handleAddGegenstand(event) {
  //   event.preventDefault()
  // }

  const handleUpdateGegenstand = (gegenstand) => {
    console.log(gegenstand);

    var data = {
      "id": gegenstand.id,
      "mitarbeiterId": gegenstand.mitarbeiterId,
      "bezeichnung": gegenstand.bezeichnung,
      "preis": gegenstand.preis
    }
    fetch("http://localhost:8080/api/gegenstand/editiereGegenstand", {
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

        const neuesGegenstandsList = gegenstaende.map(gegenstand => {
          if (gegenstand.id === data.id) {
            return { ...gegenstand, bezeichnung: data.bezeichnung, preis: data.preis, istAusgeliehen: data.istAusgeliehen }
          }
          return gegenstand;
        })
        setGegenstaende(neuesGegenstandsList)
      })

    schliesseEditDialog();
  }

  const oeffneEditDialog = (gegenstand) => {
    setEditierterGegenstand(gegenstand);
    setWirdEditiert(true);

  }

  const schliesseEditDialog = () => {
    setWirdEditiert(false);
  }



  const handleDeleteGegenstand = async (gegenstandZumLoeschen) => {
    console.log(gegenstandZumLoeschen);
    await fetch(`http://localhost:8080/api/gegenstand/loescheGegenstand/${gegenstandZumLoeschen.id}`, {
      method: "DELETE",
      headers: new Headers({
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        "Authorization": "Bearer " + auth.token
      })
    })
      .then(response => response.json())
      .then(data => {
        const neueGegenstaende = gegenstaende.filter((item) => item.id !== data.id);
        setGegenstaende(neueGegenstaende);
      })
  }

  const handleGegenstandFreigeben = async (gegenstand) => {
    console.log(gegenstand);

    var data = {
      "id": gegenstand.id,
      "mitarbeiterId": null,
      "bezeichnung": gegenstand.bezeichnung,
      "preis": gegenstand.preis
    }
    fetch("http://localhost:8080/api/gegenstand/editiereGegenstand", {
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

        const neuesGegenstandsList = gegenstaende.map(gegenstand => {
          if (gegenstand.id === data.id) {
            return { ...gegenstand, bezeichnung: data.bezeichnung, preis: data.preis, istAusgeliehen: data.istAusgeliehen }
          }
          return gegenstand;
        })
        setGegenstaende(neuesGegenstandsList)
      })
  }

  const getVorUndNachnameMitMitabeiterId = (id) => {
    for (const element of mitarbeiterDaten) {
      if (element.id === id) {
        return "" + element.vorname + " " + element.nachname;
      }
    }
    return " ";
  }


  return (
    <div>
      <h2 className="text-center">Startseite der Gegenstandsverwaltung</h2>
      <NeuerGegenstand setGegenstaende={setGegenstaende} />
      {wirdEditiert && (<GegenstandBearbeiten
        editierterGegenstand={editierterGegenstand}
        handleUpdateGegenstand={handleUpdateGegenstand}
        schliesseEditDialog={schliesseEditDialog}
      />
      )}
      <ul>
        {gegenstaende.map(gegenstand => {
          return (
            <li key={gegenstand.id}>
              <p>Gegenstand Id: {gegenstand.id}</p>
              {/* <p>Ausgeliehen von: {gegenstand.mitarbeiter ? `${gegenstand.mitarbeiter.firstname} ${gegenstand.mitarbeiter.lastname} ${gegenstand.mitarbeiter.email}`: "Niemandem"}</p> */}
              <p>Ausgeliehen von: {gegenstand.istAusgeliehen ? `${getVorUndNachnameMitMitabeiterId(gegenstand.mitarbeiterId)}` : "Niemandem"}</p>
              <p>Bezeichnung: {gegenstand.bezeichnung}</p>
              <p>Preis fürs leihen: {gegenstand.preis}</p>
              <p>Ist ausgeliehen: {gegenstand.istAusgeliehen ? "Ja" : "Nein"}</p>
              <button onClick={() => oeffneEditDialog(gegenstand)}>Aktualisieren</button>
              {!gegenstand.istAusgeliehen &&<button onClick={() => handleDeleteGegenstand(gegenstand)}>Löschen</button>}
              {gegenstand.istAusgeliehen && <button onClick={() => handleGegenstandFreigeben(gegenstand)}>Freigeben</button>}
            </li>
          )
        })}
      </ul>

      

    </div>
  )
}

export default Gegenstandsverwaltung
