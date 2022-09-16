import React, { useState, useContext } from 'react';
import { Modal, Input } from '../basicComponents';
import { APIStoreContext } from '../../APIStoreContext';

export default function ModifierPlateforme({ ModifierModalDisplay, setModifierModalDisplay, displayClickOption, index, rows_data_displayed}) {
  const [nom,setNom]=useState(rows_data_displayed[index].nom);

  const { plateformeStore, socketStore } = useContext(APIStoreContext);

  const handleActionButton = () => {
    let id = rows_data_displayed[index].id;
    plateformeStore.updatePlateforme({id: id, nom: nom});
    socketStore.socket.emit('plateformes_a_changee');
    setModifierModalDisplay(false);
    displayClickOption();
  }
  const handleDismissButton = () => {
  setModifierModalDisplay(false);
  displayClickOption();
  }

  return (
    <Modal
      display={ModifierModalDisplay}
      title="Modifier la plateforme"
      actionButton="Modifier"
      onActionButton={() => handleActionButton()}
      onDismissButton={() => handleDismissButton()}>
      <Input 
        id="nom"
        defaultValue={rows_data_displayed[index].nom}
        onChange={(e) => setNom(e.target.value)}>
        Nom
      </Input>
    </Modal>
  )
}