import React, { useState ,useContext} from 'react'
import { observer } from "mobx-react";
import '../assets/styles/sideBarNav.css';
import { NavLink } from 'react-router-dom';
import {APIStoreContext} from '../APIStoreContext';
import hamburgerMenu from '../assets/images/hamburger-menu.svg';
import { useEffect } from 'react';

function SideBarNav({isAdmin}) {
  const [collapsed, setCollapsed] = useState(false);
  const [numFicheArisque, setNumFicheArisque] = useState();
  const { ticketCurativeStore,socketStore } = useContext(APIStoreContext);
  const toggleCollapsed = () => setCollapsed(!collapsed);
  const calculate = () => {
    let tmpArray=[];
    ticketCurativeStore.ticketsC.map((item)=>{
      if(item.etat_ticket){
        var today = new Date();
        var date_to_reply = new Date(item.date_reponse);
        var timeinmilisec = date_to_reply.getTime() - today.getTime();
        if(Math.ceil(timeinmilisec / (1000 * 60 * 60 * 24))<-5){
          tmpArray.push(item);
        }
      }
    })
    setNumFicheArisque(tmpArray.length);
  }
  const isActiveClass = ({isActive}) => isActive ? "selected" : "";

  socketStore.socket.on("mettre_a_jour_ticketsC",() => {
    ticketCurativeStore.loadTickets().then(() => {
      setNumFicheArisque(ticketCurativeStore.ticketsC);
      calculate();
    });
  })

  useEffect(() => {
    ticketCurativeStore.loadTickets().then(() => {
    setNumFicheArisque(ticketCurativeStore.ticketsC);
    calculate();
    });
  }, []);

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

          <NavLink to="/Contrats" className={isActiveClass}>
            <li>
              <h6>Contrats</h6>
            </li>
          </NavLink>

          <NavLink to="/preventive" className={isActiveClass}>
            <li>
              <h6>fiche preventive</h6>
            </li>
          </NavLink>

          <NavLink to="/curative" className={isActiveClass}>
            <li className='listeCurative'>
              <h6>fiche curative</h6>
              {(numFicheArisque>0)?<h6>{numFicheArisque}</h6>:<></>}
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

export default observer(SideBarNav); 