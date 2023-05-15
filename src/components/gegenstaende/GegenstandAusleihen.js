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



    useEffect(() => {
        var authString = "Bearer " + auth.token;
        fetch("http://localhost:8080/api/principal", {
            headers: {
                "Authorization": authString
            },

        })
            .then(response => response.json())
            .then(data => {

                setMitDaten(data)
            })
    }, [])



    const ausleihen = async (gegenstandZumAusleihen) => {
        var data = {
            "gegenstandId": gegenstandZumAusleihen.id,
            "mitarbeiterId": mitDaten.id
        }
        fetch("http://localhost:8080/api/gegenstand/ausleihen", {
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
                const neueVerfuegbareGegenstaende = verfuegbareGegenstaende.filter(
                    (gegenstand) => gegenstand.id !== data.id);
                setVerfuegbareGegenstaende(neueVerfuegbareGegenstaende);
                setAusgeliehendeGegenstaende(prevGegenstaende => [...prevGegenstaende, data])
            })
    }

    const zurueckgeben = async (gegenstandZumZurueckgeben) => {
        var data = {
            "gegenstandId": gegenstandZumZurueckgeben.id,
            "mitarbeiterId": mitDaten.id
        }
        console.log(verfuegbareGegenstaende)
        console.log(ausgeliehendeGegenstaende)
        console.log(data);
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
