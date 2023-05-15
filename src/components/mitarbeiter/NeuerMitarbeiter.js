import React from "react";
import '../../App.css';
import useAuth from "../../hooks/useAuth";
import { useState } from "react";
function NeuerMitarbeiter() {
    const {auth} = useAuth();
    const [mitarbeiterData, setMitarbeiterData] = React.useState([])
    const [registerFormData, setRegisterFormData] = useState(
        {
            vorname:"",
            nachname:"",
            email:"",
            passwort:"",
            rollen:[],
            gehalt:0,

        }
    )


    React.useEffect(() => {
        fetch("http://localhost:8080/api/mitarbeiter/alleMitarbeiter",{
            headers:{
                "Authorization":"Bearer " + auth.token
            }
        })
            .then(res => res.json())
            .then(data => setMitarbeiterData(data))
            
    }, [])

    function handleChange(event) {
        const { name, value } = event.target
        setRegisterFormData(prevFormData => {
            return {
                ...prevFormData,
                [name]: value
            }
        })
        console.log(registerFormData.rollen)
    }

    // https://react.dev/reference/react-dom/components/select#enabling-multiple-selection
    const handleChangeMultipleSelect = (event) =>{
        const optionen = [...event.target.selectedOptions];
        const values = optionen.map(option => option.value);

        setRegisterFormData({...registerFormData, rollen: values})
    }
    function register(event) {
        event.preventDefault()
        var data = {
            "firstname": registerFormData.vorname,
            "lastname": registerFormData.nachname,
            "email": registerFormData.vorname + "." + registerFormData.nachname + "@musterAG.de",
            "password": "",
            "rollen": registerFormData.rollen,
            "gehalt":registerFormData.gehalt

        }
        fetch("http://localhost:8080/api/auth/register", {
            method: 'POST',
            headers: new Headers({
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify(data)
        })
            
    }
    

    return (
        <div className="Mitarbeiter">
            <form>
                <fieldset>
                    <legend>Neuen Mitarbeiter erstellen:</legend>
                    <label>vorname
                        <input
                            type="text"
                            onChange={handleChange}
                            name="vorname"
                            value={registerFormData.vorname}
                        />
                    </label>
                    <label>nachname
                        <input
                            type="text"
                            onChange={handleChange}
                            name="nachname"
                            value={registerFormData.nachname}
                        />
                    </label>
                    <label>Gehalt
                        <input
                            type="number"
                            onChange={handleChange}
                            name="gehalt"
                            value={registerFormData.gehalt}
                        />
                    </label>
                    <label>Rollen:
                        <select
                            name="rollen"
                            value={registerFormData.rollen}
                            onChange={handleChangeMultipleSelect}
                            multiple={true}
                        >
                            <option value="USER">Mitabeiter</option>
                            <option value="HAUSMEISTER">Hausmeister</option>
                            <option value="HRM">Personalabteilung</option>
                            <option value="INVENTAR">Lagerist</option>
                            <option value="ADMIN">Admin</option>
                        </select>

                    </label>
                    <button onClick={register}>Registrieren</button>
                </fieldset>
            </form>
        </div>
    )
}
export default NeuerMitarbeiter;