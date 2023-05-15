import React from 'react'
import useAuth from '../../hooks/useAuth'
import { useState } from 'react'
import NeuerMitarbeiter from './NeuerMitarbeiter';
const Mitarbeiterverwaltung = () => {
  const {auth} = useAuth();

  const [mitarbeiter, setMitarbeiter] = useState([])
  
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
        setMitarbeiter(data)
      })
  }, [])

  const handleUpdateMitarbeiter = (mitarbeiter) =>{

  }

  const oeffneEditDialog = (mitarbeiter) => {
    setEditiereMitarbeiter(mitarbeiter);
    setWirdEditiert(true);

  }

  const schliesseEditDialog = () => {
    setWirdEditiert(false);
  }

  const handleDeletMitarbeiter = async (mitarbeiterZumLoeschen) => {

  }
  
  return (
    <div>
        <h3 className="text-center">Mitarbeiterverwaltung</h3>
        <ul>
          {
            mitarbeiter.map(mitarbeiter => {
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
          <NeuerMitarbeiter/>
        </ul>
    </div>
  )
}

export default Mitarbeiterverwaltung
