import React, { useState, useContext, useEffect } from "react";
import { Button } from "../components/basicComponents";
import TypeDeFiche from "../components/ticket/TypeDeFiche";
import { observer } from "mobx-react";
import "../assets/styles/ficheDinterventionGenerator.css";
import exit from '../assets/images/exit.svg';
import { APIStoreContext } from "../APIStoreContext";
import SearchInput from "../components/SearchInput";
import TableRow from "../components/basicComponents/TableRow";
import Fichecurative from "../components/ticket/Fichecurative";


function Ticket_curative() {
  const [typeDeFiche, setTypeDeFiche] = useState(false);
  const [cree_fiche_preventive, setCree_fiche_preventive] = useState(false);
  const [searchText, setSearchText] = useState();
  const [donnees_des_fiches, setDonnees_des_fiches] = useState(true);
  const [indexDownload, setIndexDownload] = useState();
  const { ticketCurativeStore, socketStore } = useContext(APIStoreContext);
  const [download, setDownload] = useState(false);
  const [type_curative, setType_curative] = useState(false);

  const [rowsData, setRowsData] = useState([]);
  const [modifier, set_modifier] = useState(false);
  const [consulter, setConsulter] = useState(false);
  const [afficher, set_afficher] = useState(false);
  const [rowsDataDisplayed, setRowsDataDisplayed]=useState(rowsData) ;

  const [numFicheArisque, setNumFicheArisque] = useState();
  const calculate = () => {
    let tmpArray=[];
    ticketCurativeStore.ticketsC.map((item)=>{
      if(item.etat_ticket){
        var today = new Date();
        var date_to_reply = new Date(item.date_reponse);
        var timeinmilisec = date_to_reply.getTime() - today.getTime();
        if(Math.ceil(timeinmilisec / (1000 * 60 * 60 * 24))<-5){
          tmpArray.push(item);
        }
      }
    })
    setNumFicheArisque(tmpArray.length);
  }
  socketStore.socket.on("mettre_a_jour_ticketsC",() => {
    ticketCurativeStore.loadTickets().then(() =>
    { 
      setRowsData(ticketCurativeStore.ticketsC);
      calculate();
    })
  })

  const creefiche = () => {
    setCree_fiche_preventive(true);
    setDonnees_des_fiches(false);
  }

  useEffect(() => {
    ticketCurativeStore.loadTickets().then(() =>
    { 
      setRowsData(ticketCurativeStore.ticketsC);
      calculate();
    })
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
              <h1>Fiche curative</h1>
              <Button onClick={() => creefiche()}>cree une fiche curative</Button>
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
                type_curative={type_curative}
                setType_curative={setType_curative}
                setIndexDownload={setIndexDownload}
                setDownload={setDownload}/>
            </div>
            {(numFicheArisque!=0)? <div className="ficheArisqueModal">
            {!consulter &&  
             <> <h3>le nombre d'equipements a risque est de {numFicheArisque}</h3>
              <h3 onClick={()=>setConsulter(true)}> consulter</h3></>}
              <div className={`modal-container-curativeARisque ${consulter ? "" : "d-none"}`}>
              <div className="modal">
              <img className="closeIcon" src={exit} alt="quitter" onClick={() => setConsulter(false)}/>
              <div className="tableHeaderTicket">
                <p>Equipement</p>
                <p>Ticket</p>
                <p>Etat</p>
                <p>Severite</p>
                <p>Date reponse</p>
              </div>
              {ticketCurativeStore.ticketsC.map((item)=>{
                if(item.etat_ticket){
                  var today = new Date();
                  var date_to_reply = new Date(item.date_reponse);
                  var timeinmilisec = date_to_reply.getTime() - today.getTime();
                  console.log(date_to_reply+"donc = "+Math.ceil(timeinmilisec / (1000 * 60 * 60 * 24)));
                  if(Math.ceil(timeinmilisec / (1000 * 60 * 60 * 24))<-4){
                    return (
                      <div className="tableRowticket" key={item.num_serie}>
                        <>
                          <p>{item.num_serie}</p>
                          <p>{item.id_ticket}</p>
                          <p>{item.etat_machine_final}</p>
                          <p>{item.severite_equip}</p>
                          <p>{item.date_reponse}</p>
                        </>
                      </div>
                    )
                  }
                }
              })}
              </div>
            </div>
            </div>: <></>}
            
          </div>
					}
          
          <div style={{ display: cree_fiche_preventive ? 'block' : 'none' }}>
            <Fichecurative 
              setCree_fiche_preventive={setCree_fiche_preventive} 
              setDonnees_des_fiches={setDonnees_des_fiches}
              download={download}
              setDownload={setDownload}
              rowsData={rowsData}
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

export default observer(Ticket_curative);
