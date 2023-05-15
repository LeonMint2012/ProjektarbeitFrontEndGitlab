import React from 'react'
import useAuth from "../../hooks/useAuth";
import { useState, useEffect } from "react";
import "../../App.css"
import FirmeneventsAngemeldet from '../firmenevents/FirmeneventsAngemeldet';

const MitarbeiterProfil = () => {

  const { auth } = useAuth();
  const [mitDaten, setMitDaten] = useState(
    {
      id:0,
      vorname:"",
      nachname:"",
      email:"",
      rollen:[],
      gehalt:0
    }
  )

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

  useEffect(() =>{
    
    if(neuesPasswort === neuesPasswortWdh){
      setPwGleich(true);
    }else{
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
  }

  function changePassword(event) {
    event.preventDefault()
    var data ={
      "mitarbeiterId":auth.userId,
      "neuesPasswort":neuesPasswort
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
    setNeuesPasswort("");
    setNeuesPasswortWDh("");
  }

  function getRollen(event){
    event.preventDefault()
    console.log(auth.rollen)
    console.log(auth?.rollen?.includes("HAUSMEISTER"))
  }
  return (
    <section>
      <div className="center-form">
      <h3>Mitarbeiterprofil:</h3>
      
        <form>
          <label>Id
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
          <label>E-mail
            <input
              type="email"
              onChange={handleChange}
              name="email"
              value={mitDaten.email}
              disabled
            />
          </label>
          <label>Role
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
          
          <button onClick={aktualisiereProfil}>Aktualisiere Profil</button>

        </form>
        <button onClick={getRollen}>Get Rollen</button>
      </div>
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
        <button disabled={!pwGleich || !neuesPasswort.length} onClick={changePassword}>Passwort ändern</button>
        
      </form>
    <h3>Firmenevents an denen du aktuell teilnimmst:</h3>
    <FirmeneventsAngemeldet/>
    </section>
  )
}

export default MitarbeiterProfil