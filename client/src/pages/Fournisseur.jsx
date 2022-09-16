import React, { useState, useContext, useEffect } from "react";
import { Button } from "../components/basicComponents";
import AddFournisseur from "../components/fournisseur/AddFournisseur";
import { observer } from "mobx-react";
import "../assets/styles/fournisseur.css";
import { APIStoreContext } from "../APIStoreContext";
import SearchInput from "../components/SearchInput";
import TableRow from "../components/basicComponents/TableRow";

function Fournisseur() {
  const [addFournisseurModalDisplay, setAddFournisseurModalDisplay] = useState(false);
  const [searchText, setSearchText] = useState();
  const { fournisseurStore, socketStore } = useContext(APIStoreContext);

  const [rowsData, setRowsData] = useState([]);
  const [rowsDataDisplayed, setRowsDataDisplayed]=useState(rowsData) ;

  socketStore.socket.on("mettre_a_jour_fournisseur",() => {
    fournisseurStore.loadFournisseurs().then(() => 
      setRowsData(fournisseurStore.fournisseurs)
    )
  })

  useEffect(() => {
    fournisseurStore.loadFournisseurs().then(() => 
      setRowsData(fournisseurStore.fournisseurs)
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
      ||element.email.toLowerCase().includes(searchText.toLowerCase())
     })
    setSearchText(searchText);
    setRowsDataDisplayed(filtere);
  }

  return (
      <>
          <div className="main">
            <div className="header">
              <h1>Fournisseur</h1>
              <Button onClick={() => setAddFournisseurModalDisplay(true)}>Ajouter un fournisseur</Button>
              <AddFournisseur
                addFournisseurModalDisplay={addFournisseurModalDisplay}
                setAddFournisseurModalDisplay={setAddFournisseurModalDisplay}/>
              <SearchInput 
              searchParams={["nom", "email"]}
              onChange={(e) => onchangeSearchInput(e.target.value)}/>
            </div>
            <div className="tableHeaderFournisseur">
                <p>Id</p>
                <p>Nom</p>
                <p>Email</p>
                <p>Adresse</p>
              </div>
              <div className="tableBody">
                <TableRow 
                rows_data_displayed={rowsDataDisplayed} 
                page="fournisseur"/>
              </div>
          </div>
      </>
    );
}

export default observer(Fournisseur);
