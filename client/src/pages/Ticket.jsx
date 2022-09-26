import React, { useState, useContext, useEffect } from "react";
import { Button } from "../components/basicComponents";
import TypeDeFiche from "../components/ticket/TypeDeFiche";
import { observer } from "mobx-react";
import "../assets/styles/ficheDinterventionGenerator.css";
import { APIStoreContext } from "../APIStoreContext";
import SearchInput from "../components/SearchInput";
import TableRow from "../components/basicComponents/TableRow";
import Fichepreventive from "../components/ticket/Fichepreventive";

function Ticket() {
  const [typeDeFiche, setTypeDeFiche] = useState(false);
  const [cree_fiche_preventive, setCree_fiche_preventive] = useState(false);
  const [donnees_des_fiches, setDonnees_des_fiches] = useState(true);
  const [searchText, setSearchText] = useState();
  const [indexDownload, setIndexDownload] = useState();
  const { ticketStore, socketStore } = useContext(APIStoreContext);
  const [download, setDownload] = useState(false);
  const [a, setA] = useState(false);

  const [rowsData, setRowsData] = useState([]);
  const [modifier, set_modifier] = useState(false);
  const [afficher, set_afficher] = useState(false);
  const [rowsDataDisplayed, setRowsDataDisplayed]=useState(rowsData) ;

  socketStore.socket.on("mettre_a_jour_ticket",() => {
    ticketStore.loadTickets().then(() => 
      setRowsData(ticketStore.tickets)
    )
  })

  useEffect(() => {
    ticketStore.loadTickets().then(() => 
      setRowsData(ticketStore.tickets)
    )
  }, []);

  useEffect(() => {
    setRowsDataDisplayed(rowsData);
    setSearchText("");
  }, [rowsData]);

  useEffect(() => {
    if (afficher) {
      setCree_fiche_preventive(true);
      setDonnees_des_fiches(false);
    }
  }, [afficher]);

  useEffect(() => {
    if (modifier) {
      setCree_fiche_preventive(true);
      setDonnees_des_fiches(false);
    }
  }, [modifier]);

  const onchangeSearchInput = (searchText) => {
    const filtere = rowsData.filter(element => {
      return element.id_ticket.toLowerCase().includes(searchText.toLowerCase())
      ||element.id_fournisseur.toLowerCase().includes(searchText.toLowerCase())
      ||element.id_technicien.toLowerCase().includes(searchText.toLowerCase())
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
              searchParams={["fiche", "ticket"]}
              onChange={(e) => onchangeSearchInput(e.target.value)}/>
            </div>
            <div className="tableHeaderTicket">
                <p>Fiche</p>
                <p>Ticket</p>
                <p>Etat</p>
                <p>Periode</p>
                <p>Fournisseur</p>
                <p>Technicien</p>
              </div>
              <div className="tableBody">
                <TableRow 
                rows_data_displayed={rowsDataDisplayed} 
                page="ticket"
                set_afficher={set_afficher}
                set_modifier={set_modifier}
                setIndexDownload={setIndexDownload}
                setDownload={setDownload}/>
              </div>
          </div>
					}
          <div style={{ display: cree_fiche_preventive ? 'block' : 'none' }}>
          <Fichepreventive 
            setCree_fiche_preventive={setCree_fiche_preventive} 
            setDonnees_des_fiches={setDonnees_des_fiches}
            download={download}
            setDownload={setDownload}
            rowsData={rowsData}
            setA={setA}
            indexDownload={indexDownload}
            typeDeFiche={typeDeFiche}
            set_afficher={set_afficher}
            afficher={afficher}
            set_modifier={set_modifier}
            modifier={modifier}
            />
          </div> 

      </>
    );
}

export default observer(Ticket);
