import React, { useState, useContext, useEffect } from "react";
import { Button } from "../components/basicComponents";
import AddPlateforme from "../components/plateforme/AddPlateforme";
import { observer } from "mobx-react";
import "../assets/styles/plateforme.css";
import { APIStoreContext } from "../APIStoreContext";
import SearchInput from "../components/SearchInput";
import TableRow from "../components/basicComponents/TableRow";

function Plateforme() {
  const [addPlateformeModalDisplay, setAddPlateformeModalDisplay] = useState(false);
  const [searchText, setSearchText] = useState();
  const { plateformeStore, socketStore } = useContext(APIStoreContext);

  const [rowsData, setRowsData] = useState([]);
  const [rowsDataDisplayed, setRowsDataDisplayed]=useState(rowsData) ;

  socketStore.socket.on("mettre_a_jour_plateformes",() => {
    plateformeStore.loadPlateformes().then(() => 
      setRowsData(plateformeStore.plateformes)
    )
  })

  useEffect(() => {
    plateformeStore.loadPlateformes().then(() => 
      setRowsData(plateformeStore.plateformes)
    )
  }, []);

  useEffect(() => {
    setRowsDataDisplayed(rowsData);
    setSearchText("");
  }, [rowsData]);

  const onchangeSearchInput = (searchText) => {
    const filtere = rowsData.filter(element => {
      return element.id.toLowerCase().includes(searchText.toLowerCase())
      ||element.nom.toLowerCase().includes(searchText.toLowerCase())
     })
    setSearchText(searchText);
    setRowsDataDisplayed(filtere);
  }

  return (
      <>
          <div className="main">
            <div className="header">
              <h1>Plateforme</h1>
              <Button onClick={() => setAddPlateformeModalDisplay(true)}>Ajouter une plateforme</Button>
              <AddPlateforme
                addPlateformeModalDisplay={addPlateformeModalDisplay}
                setAddPlateformeModalDisplay={setAddPlateformeModalDisplay}/>
              <SearchInput 
              searchParams={["nom", "email"]}
              onChange={(e) => onchangeSearchInput(e.target.value)}/>
            </div>
            <div className="tableHeaderPlateforme">
                <p>Id</p>
                <p>Nom</p>
              </div>
              <div className="tableBody">
                <TableRow 
                rows_data_displayed={rowsDataDisplayed} 
                page="plateforme"/>
              </div>
          </div>
      </>
      );
}

export default observer(Plateforme);
