import React, { useState, useContext } from 'react';
import { Modal, Input } from '../basicComponents';
import { APIStoreContext } from '../../APIStoreContext';

export default function AddFournisseur({ addFournisseurModalDisplay, setAddFournisseurModalDisplay }) {
  const [nom, setNom] = useState('');
  const [email, setEmail] = useState('');
  const [adresse, setAdresse] = useState('');

  const { fournisseurStore, socketStore } = useContext(APIStoreContext);

  const generateRandomId = () => {
    let listeId = fournisseurStore.fournisseurs.map(a => a.id);
    let tmp;
    for (let int = 0; int < 1000; int++) {
      if(int<10){
        tmp="00".concat(int.toString());
      }else if(9<int<100){
        tmp="0".concat(int.toString());
      }else{
        tmp=int.toString();
      }
      if(!listeId.includes(tmp)){
        break;
      }
    }
    return tmp
  }

  const handleActionButton = () => {
    let newRow = {id: generateRandomId(),nom: nom,email:email,adresse:adresse};
    setNom('');   
    setEmail('');  
    setAdresse(''); 

    fournisseurStore
    .addFournisseur(newRow);

    socketStore.socket.emit('fournisseurs_a_changee');

    setAddFournisseurModalDisplay(false);
  }
  const handleDismissButton = () => {
    setNom('');  
    setEmail('');  
    setAdresse('');  
    setAddFournisseurModalDisplay(false);
      }

  return (
    <Modal
      display={addFournisseurModalDisplay}
      title="Ajouter un Fournisseur"
      actionButton="Ajouter"
      onActionButton={() => handleActionButton()}
      onDismissButton={() => handleDismissButton()}>
      <div className="input-groupe">
        <Input
          id="nom"
          value={nom}
          onChange={(e) => setNom(e.target.value)}>
          Nom
        </Input>
        <Input
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}>
          Email
        </Input>
      </div>

      <Input 
        id="adresse"
        value={adresse}
        onChange={(e) => setAdresse(e.target.value)}>
        Adresse
      </Input>
    </Modal>
  )
}
