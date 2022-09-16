import React, { useState, useContext } from 'react';
import { Modal, Input } from '../basicComponents';
import { APIStoreContext } from '../../APIStoreContext';

export default function ModifierFournisseur({ ModifierModalDisplay, setModifierModalDisplay, displayClickOption, index, rows_data_displayed}) {
  const [nom,setNom]=useState(rows_data_displayed[index].nom);
  const [email,setEmail]=useState(rows_data_displayed[index].email);
  const [adresse,setAdresse]=useState(rows_data_displayed[index].adresse);

  const { fournisseurStore, socketStore } = useContext(APIStoreContext);

  const handleActionButton = () => {
    let id = rows_data_displayed[index].id;
      fournisseurStore.updateFournisseur({id: id,nom: nom,email:email,adresse:adresse})
      socketStore.socket.emit('fournisseurs_a_changee');
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
      title="Modifier le Fournisseur"
      actionButton="Modifier"
      onActionButton={() => handleActionButton()}
      onDismissButton={() => handleDismissButton()}>
      <div className="input-groupe">
        <Input
          id="nom"
          defaultValue={rows_data_displayed[index].nom}
          onChange={(e) => setNom(e.target.value)}>
          Nom
        </Input>
        <Input
        id="email"
        type="email"
        defaultValue={rows_data_displayed[index].email}
        onChange={(e) => setEmail(e.target.value)}>
          Email
        </Input>
      </div>
      <Input 
        id="adresse"
        defaultValue={rows_data_displayed[index].adresse}
        onChange={(e) => setAdresse(e.target.value)}>
        Adresse
      </Input>
    </Modal>
  )
}