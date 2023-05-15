import React from 'react'
import "./semantic.css"
import AuthContext from '../../kontext/AuthProvider';
import { useContext } from 'react';
import useAuth from '../../hooks/useAuth';
const Footer = () => {
  const { setAuth } = useContext(AuthContext);
  const {auth} = useAuth(); 

    const logout = async () => {
        // if used in more components, this should be in context 
        // axios to /logout endpoint 
        setAuth({});
        
    }
  return (
    <footer>
      <div className="mittigTest">
        <small>&copy; by Muster AG</small>
        {auth?.token && <button onClick={logout}>Ausloggen</button>}
      </div>
    </footer>
  )
}

export default Footer
