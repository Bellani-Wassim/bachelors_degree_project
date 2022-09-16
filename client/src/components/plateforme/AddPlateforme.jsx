import React, { useState, useContext } from 'react';
import { Modal, Input } from '../basicComponents';
import { APIStoreContext } from '../../APIStoreContext';

export default function AddPlateforme({ addPlateformeModalDisplay, setAddPlateformeModalDisplay }) {
  const [nom, setNom] = useState('');

  const { plateformeStore, socketStore } = useContext(APIStoreContext);

  const generateRandomId = () => {
    let tmp= Math.floor(Math.random() * 99999).toString();
    let listeId = plateformeStore.plateformes.map(a => a.id);
      while(listeId.includes(tmp)){
        tmp= Math.floor(Math.random() * 99999).toString();
      }
    return tmp;
  }

  const handleActionButton = () => {
    let newRow = {id: generateRandomId(),nom: nom};
    
    plateformeStore
    .addPlateforme(newRow)

    socketStore.socket.emit('plateformes_a_changee');

    setAddPlateformeModalDisplay(false);
  }
  
  const handleDismissButton = () => {
    setNom('');  
    setAddPlateformeModalDisplay(false);
    }

  return (
    <Modal
      display={addPlateformeModalDisplay}
      title="Ajouter un Plateforme"
      actionButton="Ajouter"
      onActionButton={() => handleActionButton()}
      onDismissButton={() => handleDismissButton()}>
        <Input
        id="nom"
        value={nom}
        onChange={(e) => setNom(e.target.value)}>
          nom
        </Input>
    </Modal>
  )
}
