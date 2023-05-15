import React from "react";
import {useState} from "react";

function Register(){
    const [registerFormData, setRegisterFormData] = useState(
        {
            vorname:"",
            nachname:"",
            email:"",
            pwd:"",
            pwdWdh:""
        }
    )

    function handleChange(event) {
        const { name, value, type, checked } = event.target
        setRegisterFormData(prevFormData => {
            return {
                ...prevFormData,
                [name]: value
            }
        });
    }
    function register(event) {
        event.preventDefault()
        var data = {
            "firstname": registerFormData.vorname,
            "lastname": registerFormData.nachname,
            "email": registerFormData.email,
            "password": registerFormData.pwd,
            "role": "USER"

        }
        fetch("http://localhost:8080/register", {
            method: 'POST',
            headers: new Headers({
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify(data)
        })
            
    }

    return(
        <section>
            <h2>Register:</h2>
            <form>
                <fieldset>
                    <legend>Registrieren:</legend>
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
                    <label>email
                        <input
                            type="email"
                            onChange={handleChange}
                            name="email"
                            value={registerFormData.email}
                        />
                    </label>
                    <label>passwort
                        <input
                            type="password"
                            onChange={handleChange}
                            name="pwd"
                            value={registerFormData.pwd}
                        />
                    </label>
                    <label>passwort wiederholen
                        <input
                            type="password"
                            onChange={handleChange}
                            name="pwdWdh"
                            value={registerFormData.pwdWdh}
                        />
                    </label>
                    <button onClick={register}>Registrieren</button>
                </fieldset>
            </form>
        </section>
    )
};

export default Register;