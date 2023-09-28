import React from 'react'
import { useState, useEffect } from 'react'
import useAuth from '../../hooks/useAuth'
import AusgeliehendeGegenstaendeNeu from './AusgeliehendeGegenstaendeNeu';
const GegenstandAusleihen = () => {
    const { auth } = useAuth();

    const [verfuegbareGegenstaende, setVerfuegbareGegenstaende] = useState([]);
    const [mitDaten, setMitDaten] = useState();
    const [ausgeliehendeGegenstaende, setAusgeliehendeGegenstaende] = useState([]);
    const [aenderung, setAenderung] = useState(false);
    useEffect(() => {
        fetch("http://localhost:8080/api/gegenstand/verfuegbar", {
            headers: {
                "Authorization": "Bearer " + auth.token
            }
        })
            .then(res => res.json())
            .then(data => setVerfuegbareGegenstaende(data))
    }, [aenderung])

    const [toast, setToast] = useState(null);

    function showToast(nachricht) {
        setToast(nachricht);
    
        setTimeout(() => {
          setToast(null);
        }, 3000); // Schließt die Benachrichtigung nach 3 Sekunden
      };

    // useEffect(() => {
    //     var authString = "Bearer " + auth.token;
    //     fetch("http://localhost:8080/api/principal", {
    //         headers: {
    //             "Authorization": authString
    //         },

    //     })
    //         .then(response => response.json())
    //         .then(data => {
    //             console.log(data)
    //             setMitDaten(data)
    //         })
    // }, [])



    const ausleihen = async (gegenstandZumAusleihen) => {
        //console.log("MitarbeitID: " + auth.userId)
        var data = {
            "gegenstandId": gegenstandZumAusleihen.id,
            "mitarbeiterId": auth.userId
        }
        try {
            const response = await fetch("http://localhost:8080/api/gegenstand/ausleihen", {
                method: 'POST',
                headers: new Headers({
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    "Authorization": "Bearer " + auth.token
                }),
                body: JSON.stringify(data)
            });
    
            if (response.status === 200) {
                const responseData = await response.json();
                
                if (responseData === null) {
                    showToast("Gehalt ist nicht ausreichend");
                } else {
                    const neueVerfuegbareGegenstaende = verfuegbareGegenstaende.filter(
                        (gegenstand) => gegenstand.id !== responseData.id
                    );
                    setVerfuegbareGegenstaende(neueVerfuegbareGegenstaende);
                    setAusgeliehendeGegenstaende((prevGegenstaende) => [...prevGegenstaende, responseData]);
                }
            } else {
                showToast("Fehler bei der Anfrage");
            }
        } catch (error) {
            //console.error("Fehler beim Ausleihen:", error);
            showToast("Nicht ausreichend Gehalt");
        }
        // fetch("http://localhost:8080/api/gegenstand/ausleihen", {
        //     method: 'POST',
        //     headers: new Headers({
        //         'Accept': 'application/json',
        //         'Content-Type': 'application/json',
        //         "Authorization": "Bearer " + auth.token
        //     }),
        //     body: JSON.stringify(data)
        // })
        //     .then(response => {
        //              console.log("das steckt hinter dem response ding: ")
        //              console.log("check response: " + response !== null);
        //         if(response === null){
        //             showToast("Gehalt ist nicht ausreichend")
        //         }else{
        //          return response.json()
        //         }
        //     })
        //     .then(data => {
        //         console.log("das steck hinter data:" + data)
        //         if(data === null){
        //             console.log("Fehler null")
        //         }
        //         const neueVerfuegbareGegenstaende = verfuegbareGegenstaende.filter(
        //             (gegenstand) => gegenstand.id !== data.id);
        //         setVerfuegbareGegenstaende(neueVerfuegbareGegenstaende);
        //         setAusgeliehendeGegenstaende(prevGegenstaende => [...prevGegenstaende, data])
        //     })
    }

    const zurueckgeben = async (gegenstandZumZurueckgeben) => {
        var data = {
            "gegenstandId": gegenstandZumZurueckgeben.id,
            "mitarbeiterId": auth.userId
        }
        //console.log(verfuegbareGegenstaende)
        //console.log(ausgeliehendeGegenstaende)
        //console.log(data);
        fetch("http://localhost:8080/api/gegenstand/zurueckgeben", {
            method: 'POST',
            headers: new Headers({
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + auth.token
            }),
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(data => {
                const neueAusgelieheneGegenstaende = ausgeliehendeGegenstaende.filter(
                    (gegenstand) => gegenstand.id !== data.id);
                setAusgeliehendeGegenstaende(neueAusgelieheneGegenstaende);
                setVerfuegbareGegenstaende(prevGegenstaende => [...prevGegenstaende, data])
            })
    }

    return (
        <div>
            {toast && 
            <div className="toast-fehler">
                {toast}
            </div>}
            <h3>Verfügbare Gegenstände:</h3>
            <ul>
                {verfuegbareGegenstaende.map(gegenstand => {
                    return (
                        <li key={gegenstand.id}>
                            <p>Bezeichnung: {gegenstand.bezeichnung}</p>
                            <p>Preis fürs leihen: {gegenstand.preis}</p>
                            <button onClick={() => ausleihen(gegenstand)}>Ausleihen</button>
                        </li>
                    )
                })}
            </ul>

            <h3>Bereits ausgeliehende Gegenstände:</h3>
            <AusgeliehendeGegenstaendeNeu
                mitDaten={mitDaten}
                ausgeliehendeGegenstaende={ausgeliehendeGegenstaende}
                setAusgeliehendeGegenstaende={setAusgeliehendeGegenstaende}
                zurueckgeben={zurueckgeben}
                aenderung={aenderung}
            />
        </div>
    )
}

export default GegenstandAusleihen
