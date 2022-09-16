import React, { useState, useContext } from 'react';
import { Modal, Input } from '../basicComponents';
import { APIStoreContext } from '../../APIStoreContext';

export default function ModifierEquipement({ ModifierModalDisplay, setModifierModalDisplay, displayClickOption, index, rows_data_displayed}) {
  const [numeroDeSerie,setNumeroDeSerie] = useState(rows_data_displayed[index].num_serie);
  const [codeFRU, setCodeFRU] = useState(rows_data_displayed[index].FRU);
  const [nomDequipement,setNomDequipement] = useState(rows_data_displayed[index].nom);
  const [idSite, setIdSite] = useState(rows_data_displayed[index].id_site);
  const [idPlateforme, setIdPlatforme] = useState(rows_data_displayed[index].id_plateforme);
  const [severite, setSeverite] = useState(rows_data_displayed[index].severite);
  const [date_mise_marche, setDate_mise_marche] = useState(rows_data_displayed[index].date_mise_en_marche);
  const [date_fin_service, setDate_fin_service] = useState(rows_data_displayed[index].date_fin_service);

  const { equipementStore, plateformeStore, socketStore} = useContext(APIStoreContext);

  const handleActionButton = () => {
    equipementStore.updateEquipement({num_serie: numeroDeSerie,FRU: codeFRU, nom:nomDequipement, id_site:idSite,id_plateforme:idPlateforme, severite:severite,date_mise_en_marche:date_mise_marche, date_fin_service:date_fin_service})
      socketStore.socket.emit('equipements_a_changee');
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
      title="Modifier l'equipement"
      actionButton="modifier"
      onActionButton={() => handleActionButton()}
      onDismissButton={() => handleDismissButton()}>
      <div className="input-groupe">
        <Input
          id="nomdequipement"
          defaultValue={nomDequipement}
          onChange={(e) => setNomDequipement(e.target.value)}>
          Nom d'equipement
        </Input>
      </div>
      <div className="input-groupe">
       <Input   
          id="Severite"
          defaultValue={severite}
          onChange={(e) => setSeverite(e.target.value)}>
          Severite
        </Input>
       <Input
        id="codeFRU"
        defaultValue={codeFRU}
        onChange={(e) => setCodeFRU(e.target.value)}>
          code FRU
        </Input>
        <Input
        dataListOptions={plateformeStore.plateformes.map(a => a.id)}
        list="datalist"
        id="idPlatforme"
        defaultValue={idPlateforme}
        onChange={(e) => setIdPlatforme(e.target.value)}>
          plateforme
        </Input>
      </div>
      <div className="input-groupe">
        <Input
        id="codeSite"
        defaultValue={idSite}
        onChange={(e) => setIdSite(e.target.value)}>
          site
        </Input>
       <Input
        id="MiseEnMarche"
        type="date"
        defaultValue={date_mise_marche}
        onChange={(e) => setDate_mise_marche(e.target.value)}>
          Mise en marche
        </Input>
        <Input
          id="finDeService"
          type="date"
          defaultValue={date_fin_service}
          onChange={(e) => setDate_fin_service(e.target.value)}>
          Fin de service
        </Input>
      </div>
    </Modal>
  )
}