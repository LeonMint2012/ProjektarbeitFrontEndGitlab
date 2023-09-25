import React from 'react'
import { Link } from 'react-router-dom'
import "./semantic.css"
import useAuth from "../../hooks/useAuth"
const Nav = () => {
  const { auth } = useAuth();
  return (
    <nav>
      <ul>
        <li><Link to="/">Profil</Link></li>

        <li><Link to="/gegenstandAusleihen">Ausleihen</Link></li>

        {(!auth?.rollen?.includes("HAUSMEISTER") || auth?.rollen?.includes("ADMIN")) && <li><Link to="/neueSchadensmeldung">Neue Schadenmeldung</Link></li>}

        <li><Link to="/firmenevents">Firmenevents</Link></li>

        {/* <li><Link to="/">Testumgebung</Link></li> */}

        {auth?.rollen?.includes("INVENTAR") && <li><Link to="/gegenstandsverwaltung">Inventarverwaltung</Link></li>}

        {auth?.rollen?.includes("HRM") && <li><Link to="/mitarbeiterverwaltung">Mitarbeiterverwaltung</Link></li>}

        {auth?.rollen?.includes("HAUSMEISTER") && <li><Link to="/alleSchadensmeldungen">Alle Schadensmeldungen</Link></li>}
      </ul>
    </nav>
  )
}

export default Nav
