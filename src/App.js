import './App.css';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NeuerGegenstand from './components/gegenstaende/NeuerGegenstand';
import NeuerSchaden from './components/schadensmeldung/NeuerSchaden';
import NeuerMitarbeiter from './components/mitarbeiter/NeuerMitarbeiter';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import FehlendeBerechtigung from './components/auth/FehlendeBerechtigung';
import AllesTest from './components/AllesTest';

import Layout from './components/auth/Layout';

import RequireAuth from './components//auth/RequireAuth';
import AlleSchadensmeldungen from './components/schadensmeldung/AlleSchadensmeldungen';
import MitarbeiterProfil from './components/mitarbeiter/MitarbeiterProfil';
import Gegenstandsverwaltung from './components/gegenstaende/Gegenstandsverwaltung';
import Firmenevents from './components/firmenevents/Firmenevents';
import Mitarbeiterverwaltung from './components/mitarbeiter/Mitarbeiterverwaltung';
import GegenstandAusleihen from './components/gegenstaende/GegenstandAusleihen';

function App() {
  const ROLES = {
    "User":"USER",
    "Hausmeister":"HAUSMEISTER",
    "Inventar":"INVENTAR",
    "Hrm":"HRM"
  }
  
  return (
    <Routes>
        <Route path="/" element={<Layout/>}>
          {/* Routen die public sind */}
          <Route index path="login" element={<Login/>} />
          <Route path="register" element={<Register/>} />
          <Route path="fehlendeberechtigung" element={<FehlendeBerechtigung/>} />

          {/* TODO sowas wie ne link page sammlung */}
          {/* <Route path="register" element={<Register/>} /> */}
          {/* Routen die geschützt sind */}
          

          <Route element={<RequireAuth allowedRoles={ROLES.User}/> }>
            {/* <Route path="/" element={<AllesTest/>} /> */}
            <Route path="gegenstand" element={<NeuerGegenstand/>} />
            <Route path="gegenstandAusleihen" element={<GegenstandAusleihen/>} />
            <Route index path="mitarbeiterProfil" element={<MitarbeiterProfil/>} />
            <Route path="mitarbeiter" element={<NeuerMitarbeiter/>} />
            <Route path="neueSchadensmeldung" element={<NeuerSchaden/>} />
            <Route path="firmenevents" element={<Firmenevents/>} />
          </Route>

          {/* Route die nur vom Hausmeister abgerufen werden kann */}
          <Route element={<RequireAuth allowedRoles={ROLES.Inventar}/> }>
            <Route path="gegenstandsverwaltung" element={<Gegenstandsverwaltung/>} />
          </Route>

          <Route element={<RequireAuth allowedRoles={ROLES.Hrm}/> }>
            <Route path="mitarbeiterverwaltung" element={<Mitarbeiterverwaltung/>} />
          </Route>
          
          <Route element={<RequireAuth allowedRoles={ROLES.Hausmeister}/> }>
            <Route path="alleSchadensmeldungen" element={<AlleSchadensmeldungen/>} />
          </Route>

          
          
          {/* Nicht vorhanden */}
          {/* <Route path="*" element={<Gegenstand/>} /> */}
          
        </Route>
      </Routes>
  );
}

export default App;
