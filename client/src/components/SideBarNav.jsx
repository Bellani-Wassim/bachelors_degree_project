import React, { useState } from 'react'
import '../assets/styles/sideBarNav.css';
import { NavLink } from 'react-router-dom';
import hamburgerMenu from '../assets/images/hamburger-menu.svg';

export default function SideBarNav({isAdmin}) {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = () => setCollapsed(!collapsed);

  const isActiveClass = ({isActive}) => isActive ? "selected" : "";

  return (
    <div className={`sideBar-container ${collapsed ? 'collapsed' : ''}`}>
      <img className="hamburgerMenu" src={hamburgerMenu} alt="toggle side bar" onClick={toggleCollapsed} />
      <nav className="sideBar-nav">
        <ul>
          <NavLink to="/" className={isActiveClass}>
            <li>
              <h6>Fournisseurs</h6>
            </li>
          </NavLink>

          <NavLink to="/techniciens" className={isActiveClass}>
            <li>
              <h6>Techniciens</h6>
            </li>
          </NavLink>

          <NavLink to="/equipements" className={isActiveClass}>
            <li>
              <h6>Équipements</h6>
            </li>
          </NavLink>

          <NavLink to="/plateformes" className={isActiveClass}>
            <li>
              <h6>Plateformes</h6>
            </li>
          </NavLink>

          <NavLink to="/FicheDintervetionGenerator" className={isActiveClass}>
            <li>
              <h6>fiche d'intervention</h6>
            </li>
          </NavLink>

          <NavLink to="/Ticket" className={isActiveClass}>
            <li>
              <h6>cree ticket</h6>
            </li>
          </NavLink>

          {isAdmin && 
          <>
          <NavLink to="/employe" className={isActiveClass}>
            <li>
              <h6>employes</h6>
            </li>
          </NavLink>
          <NavLink to="/inscription" className={isActiveClass}>
            <li>
              <h6>Inscription</h6>
            </li>
          </NavLink>
          </>}

        </ul>
      </nav>
    </div>
  )
}
