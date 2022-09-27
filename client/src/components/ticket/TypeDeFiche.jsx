import React from 'react';
import "../../assets/styles/modal.css";

function TypeDeFiche({ display, setTypeDeFiche, setCree_fiche_preventive,setCurative, setDonnees_des_fiches, setCree_fiche_curative, setPreventive}) {
  const display_fiche_preventive = () => {
    setTypeDeFiche(false);
    setCree_fiche_preventive(true);
    setDonnees_des_fiches(false);
    setPreventive(true);
    setCurative(false);
  }

  const display_fiche_curative = () => {
    setTypeDeFiche(false);
    setCree_fiche_curative(true);
    setDonnees_des_fiches(false);
    setPreventive(false);
    setCurative(true);

  }
  return (
    <div className={`modal-container ${display ? "" : "d-none"}`}>
      <div className="modal_type_de_fiche">
        <div className="typedefiche_modal_body">
          <h3 className="choix_type_de_fiche" onClick={()=>display_fiche_curative()}>curative</h3>
          <h3 className="choix_type_de_fiche" onClick={()=>display_fiche_preventive()}>preventive</h3>
        </div>
      </div>
    </div>);
}

export default TypeDeFiche;