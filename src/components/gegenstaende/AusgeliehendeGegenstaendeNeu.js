import React from 'react'
import { useEffect } from 'react'
import useAuth from '../../hooks/useAuth'
const AusgeliehendeGegenstaendeNeu = ({mitDaten, ausgeliehendeGegenstaende, setAusgeliehendeGegenstaende, zurueckgeben, aenderung}) => {
    const {auth} = useAuth();
    useEffect(() => {
        
        if(auth.userId){
        console.log(auth?.userId)
        console.log(auth.token)
        fetch(`http://localhost:8080/api/gegenstand/gegenstaendeVon/${auth?.userId}`, {
            
            headers: {
                "Authorization": "Bearer " + auth.token
            }
        })
            .then(res => res.json())
            .then(data => {
                            setAusgeliehendeGegenstaende(data)
                            console.log("reload")
            })
    }
    }, [])
    

  return (
    <div>
      <ul>
                {ausgeliehendeGegenstaende.map(gegenstand => {
                    return (
                        <li key={gegenstand.id}>
                            <p>Bezeichnung: {gegenstand.bezeichnung}</p>
                            <p>Preis fürs leihen: {gegenstand.preis}</p>
                            <button onClick={() => zurueckgeben(gegenstand)}>Zurückgeben</button>
                        </li>
                    )
                })}
            </ul>
    </div>
  )
}

export default AusgeliehendeGegenstaendeNeu
