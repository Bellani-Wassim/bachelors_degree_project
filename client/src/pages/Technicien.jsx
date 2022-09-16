import React, { useState, useContext, useEffect } from "react";
import { Button } from "../components/basicComponents";
import AddTechnicien from "../components/technicien/AddTechnicien";
import { observer } from "mobx-react";
import "../assets/styles/technicien.css";
import { APIStoreContext } from "../APIStoreContext";
import SearchInput from "../components/SearchInput";
import TableRow from "../components/basicComponents/TableRow";

function Technicien() {
  const [addTechnicienModalDisplay, setAddTechnicienModalDisplay] = useState(false);
  const [searchText, setSearchText] = useState('');
  const { technicienStore, socketStore } = useContext(APIStoreContext);

  const [rowsData, setRowsData] = useState([]);
  const [rowsDataDisplayed, setRowsDataDisplayed]=useState(rowsData) ;

  socketStore.socket.on("mettre_a_jour_techniciens",() => {
    technicienStore.loadTechniciens().then(() => {
      setRowsData(technicienStore.techniciens);
    }
    )
  })

  useEffect(() => {
    technicienStore.loadTechniciens().then(() =>{
      setRowsData(technicienStore.techniciens);
    }
    );
  }, []);

  useEffect(() => {
    setRowsDataDisplayed(rowsData);
  }, [rowsData]);

  const onchangeSearchInput = (searchText) => {
    const filtere = rowsData.filter(element => {
      return element.id.toLowerCase().includes(searchText.toLowerCase())
      ||element.nom.toLowerCase().includes(searchText.toLowerCase())
      ||element.prenom.toLowerCase().includes(searchText.toLowerCase())
      ||element.telephone.toLowerCase().includes(searchText.toLowerCase())
      ||element.email.toLowerCase().includes(searchText.toLowerCase())
      ||element.id_fournisseur.toLowerCase().includes(searchText.toLowerCase())
     })
    setSearchText(searchText);
    setRowsDataDisplayed(filtere);
  }

  return (  
    <>
    <div className="main">
      <div className="header">       
              <h1>Techniciens</h1>
              <Button onClick={() => setAddTechnicienModalDisplay(true)}>Ajouter un Technicien</Button>
              <AddTechnicien
                addTechnicienModalDisplay={addTechnicienModalDisplay}
                setAddTechnicienModalDisplay={setAddTechnicienModalDisplay}/>
              <SearchInput 
              searchParams={["id", "nom", "prenom"]} 
              onChange={(e) => onchangeSearchInput(e.target.value)}/>
              </div>
          <div className="tableHeaderTechnicien">
          <p>Id</p>
          <p>Nom</p>
          <p>Prenom</p>
          <p>Telephone</p>
          <p>Fournisseur</p>
          <p>Email</p>
          <p>Adresse</p>
        </div>
        <div className="tableBody">
          <TableRow 
          rows_data_displayed={rowsDataDisplayed} 
          page="technicien"/>
        </div>
    </div>
            </>
  );
}

export default observer(Technicien);
