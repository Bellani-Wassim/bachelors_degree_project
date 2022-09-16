import React, { useState, useContext }  from 'react'
import ModifierFournisseur from '../fournisseur/ModifierFournisseur';
import ModifierTechnicien from '../technicien/ModifierTechnicien';
import ModifierPlateforme from '../plateforme/ModifierPlateforme';
import ModifierEquipement from '../equipement/ModifierEquipement';
import { APIStoreContext } from '../../APIStoreContext';

export default function DropDownOptions({ rows_data_displayed, idx, displayClickOption, page, setArrowId}) {

  const [ModifierModalDisplay, setModifierModalDisplay] = useState(false);  

  const { fournisseurStore, technicienStore, plateformeStore, equipementStore, socketStore } = useContext(APIStoreContext);

  const editRow = () => {
    setModifierModalDisplay(true);
  }
  const deleteRow = () => {
    switch (page) {
      case "fournisseur":
        const fournisseur_id = rows_data_displayed[idx].id;
        fournisseurStore.deleteFournisseur(fournisseur_id)
        socketStore.socket.emit('fournisseurs_a_changee');
        setArrowId(null);
        displayClickOption();
        return;
      case "technicien":
        const technicien_id = rows_data_displayed[idx].id;
        technicienStore.deleteTechnicien(technicien_id)
        socketStore.socket.emit('techniciens_a_changee');
        setArrowId(null);
        displayClickOption();
        return;
      case "plateforme":
        const plateforme_id = rows_data_displayed[idx].id;
        plateformeStore.deletePlateforme(plateforme_id)
        socketStore.socket.emit('plateformes_a_changee');
        setArrowId(null);
        displayClickOption();
        return;
      case "equipement":
        const equipement_id = rows_data_displayed[idx].num_serie;
        equipementStore.deleteEquipement(equipement_id)
        socketStore.socket.emit('equipements_a_changee');
        setArrowId(null);
        displayClickOption();
        return;
      default:
      break;
    }
    
  }

  const displayModifierModal = () => {
    switch (page) {
      case "fournisseur":
        return(
                <ModifierFournisseur
                  ModifierModalDisplay={ModifierModalDisplay}
                  setModifierModalDisplay={setModifierModalDisplay}
                  displayClickOption={displayClickOption}
                  index={idx}
                  rows_data_displayed={rows_data_displayed}/>
        )
      case "technicien":
        return(
                <ModifierTechnicien
                  ModifierModalDisplay={ModifierModalDisplay}
                  setModifierModalDisplay={setModifierModalDisplay}
                  displayClickOption={displayClickOption}
                  index={idx}
                  rows_data_displayed={rows_data_displayed}/>
      )
      case "plateforme":
        return(
                <ModifierPlateforme
                  ModifierModalDisplay={ModifierModalDisplay}
                  setModifierModalDisplay={setModifierModalDisplay}
                  displayClickOption={displayClickOption}
                  index={idx}
                  rows_data_displayed={rows_data_displayed}/>
      )
      case "equipement":
        return(
                <ModifierEquipement
                  ModifierModalDisplay={ModifierModalDisplay}
                  setModifierModalDisplay={setModifierModalDisplay}
                  displayClickOption={displayClickOption}
                  index={idx}
                  rows_data_displayed={rows_data_displayed}/>
      )
    }
  }
  return (
        <>
          <button className='dropDownOption' onClick={() => editRow()}>Modifier</button>
          <button className='dropDownOption' onClick={() => deleteRow()}>Supprimer</button>
          {displayModifierModal()}
        </>
  )
} 