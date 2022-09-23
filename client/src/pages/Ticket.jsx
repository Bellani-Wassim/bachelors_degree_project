import React, { useState, useContext, useEffect } from "react";
import { Button } from "../components/basicComponents";
import TypeDeFiche from "../components/ticket/TypeDeFiche";
import { observer } from "mobx-react";
import "../assets/styles/fournisseur.css";
import { APIStoreContext } from "../APIStoreContext";
import SearchInput from "../components/SearchInput";
import TableRow from "../components/basicComponents/TableRow";
import Fichepreventive from "../components/ticket/Fichepreventive";

function Ticket() {
  const [typeDeFiche, setTypeDeFiche] = useState(false);
  const [cree_fiche_preventive, setCree_fiche_preventive] = useState(false);
  const [donnees_des_fiches, setDonnees_des_fiches] = useState(true);
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
			 	{donnees_des_fiches &&
          <div className="main">
            <div className="header">
              <h1>Ticket</h1>
              <Button onClick={() => setTypeDeFiche(true)}>cree une fiche d'intervention</Button>
              <TypeDeFiche 
							display={typeDeFiche}
							setTypeDeFiche={setTypeDeFiche}
							setDonnees_des_fiches={setDonnees_des_fiches}
							setCree_fiche_preventive={setCree_fiche_preventive}/>
              <SearchInput 
              searchParams={["fiche", "email"]}
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
					}
					{cree_fiche_preventive && <Fichepreventive />}

      </>
    );
}

export default observer(Ticket);
