import React, { useState, useContext, useEffect } from "react";
import { Button } from "../components/basicComponents";
import AddContrat from "../components/contrat/AddContrat";
import { observer } from "mobx-react";
import "../assets/styles/contrat.css";
import { APIStoreContext } from "../APIStoreContext";
import SearchInput from "../components/SearchInput";
import threeDots from '../assets/images/three-dots.svg'

function Contrat() {
  const [addContratModalDisplay, setAddContratModalDisplay] = useState(false);

  return (
      <>
          <div className="main">
            <div className="header">
              <h1>Contrat</h1>
              <Button onClick={() => setAddContratModalDisplay(true)}>Ajouter un contrat</Button>
              <AddContrat
                addContratModalDisplay={addContratModalDisplay}
                setAddContratModalDisplay={setAddContratModalDisplay}/>
              <SearchInput 
              searchParams={["Contrat", "Plateform"]}
              onChange={(e) => onchangeSearchInput(e.target.value)}/>
            </div>
            <div className="tableHeaderContrat">
                <p>Contrat</p>
                <p>Plateforme</p>
                <p>Fournisseur</p>
                <p>Date fin</p>
                <p>Date debut</p>
              </div>
              <div className="tableBody">
              <img className='threeDotsIcon' src={threeDots} alt=''/>
                <div className="tableRowContrat">
                  <p>UR8F7RE441</p>
                  <p>12545</p>
                  <p>123</p>
                  <p>18-10-2023</p>
                  <p>07-1-2022</p>
                </div>
              </div>
          </div>
      </>
    );
}

export default observer(Contrat);
