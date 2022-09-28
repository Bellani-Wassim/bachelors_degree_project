import React, { useState, useContext, useEffect } from "react";
import { Button } from "../components/basicComponents";
import AddEquipement from "../components/equipement/AddEquipement"
import { observer } from "mobx-react";
import "../assets/styles/equipement.css";
import { APIStoreContext } from "../APIStoreContext";
import SearchInput from "../components/SearchInput";
import TableRow from "../components/basicComponents/TableRow";

function Equipement() {
  const [addEquipementModalDisplay, setAddEquipementModalDisplay] = useState(false);
  const [searchText, setSearchText] = useState('');
  const { equipementStore, socketStore } = useContext(APIStoreContext);

  const [rowsData, setRowsData] = useState([]);
  const [rowsDataDisplayed, setRowsDataDisplayed]=useState(rowsData) ;

  socketStore.socket.on("mettre_a_jour_equipements",() => {
    equipementStore.loadEquipements().then(() => {
      setRowsData(equipementStore.equipements);
    }
    )
  })

  useEffect(() => {
    equipementStore.loadEquipements().then(() =>{
      setRowsData(equipementStore.equipements);
    }
    );
  }, []);

  useEffect(() => {
    setRowsDataDisplayed(rowsData);
  }, [rowsData]);

  const onchangeSearchInput = (searchText) => {
    const filtere = rowsData.filter(element => {
      return element.num_serie.toLowerCase().includes(searchText.toLowerCase())
      ||element.FRU.toLowerCase().includes(searchText.toLowerCase())
      ||element.nom.toLowerCase().includes(searchText.toLowerCase())
      ||element.id_site.toLowerCase().includes(searchText.toLowerCase())
      ||element.severite.toLowerCase().includes(searchText.toLowerCase())
      ||element.id_plateforme.toLowerCase().includes(searchText.toLowerCase())
     })
    setSearchText(searchText);
    setRowsDataDisplayed(filtere);
  }

  return (  
    <>
    <div className="main">
      <div className="header">       
        <h1>Equipements</h1>
        <Button onClick={() => setAddEquipementModalDisplay(true)}>Ajouter un Equipement</Button>
        <AddEquipement
          addEquipementModalDisplay={addEquipementModalDisplay}
          setAddEquipementModalDisplay={setAddEquipementModalDisplay}/>
        <SearchInput 
          searchParams={["Numero de serie"]} 
          onChange={(e) => onchangeSearchInput(e.target.value)}/>
      </div>
      <div className="tableHeaderEquipement">
        <p>Numero de serie</p>
        <p>FRU</p>
        <p>Nom</p>
        <p>Site</p>
        <p>Plateforme</p>
        <p>Severite</p>
        <p>Date mise en marche</p>
        <p>Date fin de service</p>
      </div>
      <div className="tableBody">
        <TableRow 
        rows_data_displayed={rowsDataDisplayed} 
        page="equipement" />
      </div>
    </div>
            </>
  );
}

export default observer(Equipement);
