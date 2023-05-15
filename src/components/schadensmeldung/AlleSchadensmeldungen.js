import React from "react";
import { Link } from "react-router-dom"
import useAuth from "../../hooks/useAuth";
import { useState, useEffect } from "react";

const AlleSchadensmeldungen = () => {

    const { auth } = useAuth();
    const [schaeden, setSchaeden] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8080/api/schaden/offeneSchaeden", {
            headers: {
                "Authorization": "Bearer " + auth.token
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setSchaeden(data)

            })
    }, [])

    const schadenErledigt = (schaden) => {
        console.log("schadensId: " + schaden);
        var data = {
            "id": schaden.id
        }
        console.log(data)
        fetch("http://localhost:8080/api/schaden/schadenBearbeitet", {
            method: 'POST',
            headers: new Headers({
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + auth.token
            }),
            body: JSON.stringify(schaden.id)
        })
            .then(reponse => reponse.json())
            .then(data => {
                console.log(data);
                const neuSchaeden = schaeden.filter((schaden) => schaden.id !== data.id);
                console.log("neu Schäden" + neuSchaeden)
                setSchaeden(neuSchaeden);
            })
        }
    return (
        <section>
            <h2 className="text-center">AlleSchadensmeldungen Page</h2>
            <br />
            {schaeden.length ? 
            <ul>
                {schaeden.map(schaden => {
                    return (
                        <li key={schaden.id}>
                            <p>Schadensnummer: {schaden.id}</p>
                            <p>Im Gebäude: {schaden.gebaeude}</p>
                            <p>Auf der Etage: {schaden.etage}</p>
                            <p>Der Title lautet: {schaden.titel}</p>
                            <p>Der Mitarbeiter hat folgendes dazu geschrieben: {schaden.beschreibung}</p>
                            <p>Der Mitarbeiter schätzt die Dringlichkeit
                                als {schaden.dringlichkeit.toLowerCase()} ein.
                            </p>
                            <p>Der Schaden wurde gemeldet am: {schaden.erstelltAm}</p>
                            <button onClick={() => schadenErledigt(schaden)}>Erledigt</button>
                        </li>
                    )
                })}
            </ul>
            : <h3>Es gibt keine neuen Schäden</h3>
            }
            <div>
                <Link to="/">Home</Link>
            </div>
        </section>
    )
}

export default AlleSchadensmeldungen;