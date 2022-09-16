import React, { useState, useContext } from 'react';
import { Modal, Input } from '../basicComponents';
import { APIStoreContext } from '../../APIStoreContext';

export default function ModifierTechnicien({ ModifierModalDisplay, setModifierModalDisplay, displayClickOption, index, rows_data_displayed}) {
  const [id,setId]=useState(rows_data_displayed[index].id);
  const [nom,setNom]=useState(rows_data_displayed[index].nom);
  const [prenom,setPrenom]=useState(rows_data_displayed[index].prenom);
  const [email,setEmail]=useState(rows_data_displayed[index].email);
  const [adresse,setAdresse]=useState(rows_data_displayed[index].adresse);
  const [telephone,setTelephone]=useState(rows_data_displayed[index].telephone);  
  const [idFournisseur,setIdFournisseur]=useState(rows_data_displayed[index].id_fournisseur);

  const { technicienStore, fournisseurStore, socketStore} = useContext(APIStoreContext);

  const handleActionButton = () => {
      technicienStore.updateTechnicien({id: id,nom: nom, prenom:prenom, telephone:telephone,email:email,id_fournisseur:idFournisseur,adresse:adresse})
      socketStore.socket.emit('techniciens_a_changee');
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
      title="Modifier le Technicien"
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
        id="prenom"
        defaultValue={rows_data_displayed[index].prenom}
        onChange={(e) => setPrenom(e.target.value)}>
          prenom
        </Input>
      </div>
      <div className="input-groupe-second">
      <Input
          id="telephone"
          defaultValue={rows_data_displayed[index].telephone}
          onChange={(e) => setTelephone(e.target.value)}>
          telephone
        </Input>
        <Input
        id="email"
        type="email"
        defaultValue={rows_data_displayed[index].email}
        onChange={(e) => setEmail(e.target.value)}>
          Email
        </Input>
        <Input
        dataListOptions={fournisseurStore.fournisseurs.map(o => o.id)}
        list="datalist"
        id="id fournisseur"
        defaultValue={rows_data_displayed[index].id_fournisseur}
        onChange={(e) => setIdFournisseur(e.target.value)}>
          fournisseur
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