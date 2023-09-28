import React from 'react'
import useAuth from '../../hooks/useAuth'
import { useState } from 'react'
import NeuerMitarbeiter from './NeuerMitarbeiter';
import MitarbeiterBearbeiten from './MitarbeiterBearbeiten';
const Mitarbeiterverwaltung = () => {
  const {auth} = useAuth();

  const [alleMitarbeiter, setAlleMitarbeiter] = useState([])
  
  const [editiereMitarbeiter, setEditiereMitarbeiter] = useState(null)
  const [wirdEditiert, setWirdEditiert] = useState(false);

  React.useEffect(() => {
    fetch("http://localhost:8080/api/mitarbeiter/alleMitarbeiterMinimal", {
      headers: {
        "Authorization": "Bearer " + auth.token
      }
    })
      .then(res => res.json())
      .then(data => {
        setAlleMitarbeiter(data)
      })
  }, [])

  const handleUpdateMitarbeiter = (mitarbeiter) =>{
    var data ={
      "id":mitarbeiter.id,
      "vorname":mitarbeiter.vorname,
      "nachname":mitarbeiter.nachname,
      "email":mitarbeiter.email,
      "rollen":mitarbeiter.rollen,
      "gehalt":mitarbeiter.gehalt
    }
    //console.log(JSON.stringify(data) + "neue Mitarbeiter infos")
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

        const neueMitarbeiterList = alleMitarbeiter.map(mitarbeiter => {
          if (mitarbeiter.id === data.id) {
            return { ...mitarbeiter, rollen: data.rollen, gehalt: data.gehalt}
          }
          return mitarbeiter;
        })
        setAlleMitarbeiter(neueMitarbeiterList)
      })

    schliesseEditDialog();
  }

  const oeffneEditDialog = (mitarbeiter) => {
    setEditiereMitarbeiter(mitarbeiter);
    setWirdEditiert(true);

  }

  const schliesseEditDialog = () => {
    setWirdEditiert(false);
  }

  const handleDeletMitarbeiter = async (mitarbeiterZumLoeschen) => {
    //console.log(mitarbeiterZumLoeschen);
    await fetch(`http://localhost:8080/api/mitarbeiter/loescheMitarbeiter/${mitarbeiterZumLoeschen.id}`, {
      method: "DELETE",
      headers: new Headers({
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        "Authorization": "Bearer " + auth.token
      })
    })
      .then(response => response.json())
      .then(data => {
        const neueMitarbeiter = alleMitarbeiter.filter((mitarbeiter) => mitarbeiter.id !== data.id);
        setAlleMitarbeiter(neueMitarbeiter);
      })
  }
  
  return (
    <div>
        <h3 className="text-center">Mitarbeiterverwaltung</h3>
        <NeuerMitarbeiter setAlleMitarbeiter={setAlleMitarbeiter}/>
          {wirdEditiert && (<MitarbeiterBearbeiten 
            editiereMitarbeiter={editiereMitarbeiter}
            handleUpdateMitarbeiter={handleUpdateMitarbeiter}
            schliesseEditDialog={schliesseEditDialog}
            />
          )}
        <ul>
          {
            alleMitarbeiter.map(mitarbeiter => {
              return(
                <li key={mitarbeiter.id}>
                  <p>Id: {mitarbeiter.id}</p>
                  <p>Vorname: {mitarbeiter.vorname}</p>
                  <p>Nachname: {mitarbeiter.nachname}</p>
                  <p>Email: {mitarbeiter.email}</p>
                  <p>Rollen: {mitarbeiter.rollen.toString()}</p>
                  <p>Gehalt: {mitarbeiter.gehalt}</p>
                  <button onClick={() => oeffneEditDialog(mitarbeiter)}>Aktualisieren</button>
                  <button onClick={() => handleDeletMitarbeiter(mitarbeiter)}>Löschen</button>
                </li>
              )
            })
          }  
        </ul>
    </div>
  )
}

export default Mitarbeiterverwaltung
