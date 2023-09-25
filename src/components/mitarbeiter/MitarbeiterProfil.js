import React from 'react'
import useAuth from "../../hooks/useAuth";
import { useState, useEffect } from "react";
import "../../App.css"
import FirmeneventsAngemeldet from '../firmenevents/FirmeneventsAngemeldet';
import "./Profil.css"

const MitarbeiterProfil = () => {

  const { auth } = useAuth();
  const [mitDaten, setMitDaten] = useState(
    {
      id: 0,
      vorname: "",
      nachname: "",
      email: "",
      rollen: [],
      gehalt: 0
    }
  )

  const [toast, setToast] = useState(null);

  function showToast(nachricht) {
    setToast(nachricht);

    setTimeout(() => {
      setToast(null);
    }, 3000); // Schließt die Benachrichtigung nach 3 Sekunden
  };

  // const [altesPasswort, setAltesPasswort] = useState("");
  const [neuesPasswort, setNeuesPasswort] = useState("");
  const [neuesPasswortWdh, setNeuesPasswortWDh] = useState("");
  const [pwGleich, setPwGleich] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:8080/api/mitarbeiter/mitarbeiterInfosMinimal/${auth.userId}`, {
      headers: {
        "Authorization": "Bearer " + auth.token
      },

    })
      .then(response => response.json())
      .then(data => setMitDaten(data))
  }, [])

  useEffect(() => {

    if (neuesPasswort === neuesPasswortWdh) {
      setPwGleich(true);
    } else {
      setPwGleich(false);
    }
  }, [neuesPasswort, neuesPasswortWdh])

  function handleChange(event) {
    const { name, value, type, checked } = event.target
    setMitDaten(prevFormData => {
      return {
        ...prevFormData,
        [name]: value
      }
    });
  }

  function aktualisiereProfil(event) {
    event.preventDefault()
    var data = mitDaten;
    fetch("http://localhost:8080/api/mitarbeiter/editiereMitarbeiter", {
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
        setMitDaten(data);
      })
    showToast("Profil erfolgreich aktualisiert")
  }

  function changePassword(event) {
    event.preventDefault()
    var data = {
      "mitarbeiterId": auth.userId,
      "neuesPasswort": neuesPasswort
    }
    fetch("http://localhost:8080/api/mitarbeiter/aktualisierePassword", {
      method: 'POST',
      headers: new Headers({
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        "Authorization": "Bearer " + auth.token
      }),
      body: JSON.stringify(data)
    })
    showToast("Passwort erfolgreich geändert")
    setNeuesPasswort("");
    setNeuesPasswortWDh("");
  }
  return (
    <section>
      {toast &&
        <div className="toast">
          {toast}
        </div>
      }


      <div className="flex-container-profile">
        <div>
          <h3>Mitarbeiterprofil:</h3>
          <form>
            <label>ID
              <input
                type="text"
                // onChange={handleChange}
                name="id"
                value={mitDaten.id}
                disabled
              />
            </label>
            <label>Vorname
              <input
                type="text"
                onChange={handleChange}
                name="vorname"
                value={mitDaten.vorname}

              />
            </label>
            <label>Nachname
              <input
                type="text"
                onChange={handleChange}
                name="nachname"
                value={mitDaten.nachname}
              />
            </label>
            <label>E-Mail
              <input
                type="email"
                onChange={handleChange}
                name="email"
                value={mitDaten.email}
                disabled
              />
            </label>
            <label>Role(n)
              <input
                type="text"
                // onChange={handleChange}
                name="role"
                value={mitDaten.rollen}
                disabled
              />
            </label>
            <label>Gehalt
              <input
                type="text"
                // onChange={handleChange}
                name="gehalt"
                value={mitDaten.gehalt}
                disabled
              />
            </label>

            <button className="button-profile" onClick={aktualisiereProfil}>Aktualisiere Profil</button>

          </form>
        </div>

        <div>
          <h3>Passwort ändern:</h3>

          <form>
            {/* <label>Altes Passwort
            <input
              type="password"
              name="altesPasswort"
              value={altesPasswort}
              onChange={(e) => setAltesPasswort(e.target.value)}
            />
          </label> */}
            <label>Neues Passwort
              <input
                type="password"
                name="neuesPasswort"
                value={neuesPasswort}
                onChange={(e) => setNeuesPasswort(e.target.value)}
              />
            </label>
            <label>Neues Passwort wiederholen
              <input
                type="password"
                name="neuesPasswortWdh"
                value={neuesPasswortWdh}
                onChange={(e) => setNeuesPasswortWDh(e.target.value)}
              />
            </label>
            {!pwGleich && <p>Passwörter stimmen nicht überein</p>}
            <button className="button-profile" disabled={!pwGleich || !neuesPasswort.length} onClick={changePassword}>Passwort ändern</button>

          </form>
        </div>
      </div>
      <div className="firmeneventAngemeldetContainer">
        <h3>Firmenevents an denen du aktuell teilnimmst:</h3>
        <FirmeneventsAngemeldet />
      </div>
    </section>
  )
}

export default MitarbeiterProfil