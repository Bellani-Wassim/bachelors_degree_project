import React, { useState, useEffect , useContext} from "react";
import "../assets/styles/employe.css";
import { APIStoreContext } from "../APIStoreContext";
import axios from 'axios';

export default function Inscription({socket}) {
  const [employes, setEmployes] = useState([]);
  const [registrationRequest,setRegistrationRequest] = useState([]);

  const { socketStore } = useContext(APIStoreContext);

  const refuserLaDemande = (index) => {
    const email = employes[index].email;
    axios
      .put('http://localhost:3546/api/employe/delete/', {email})
      .then(() => {
        socketStore.socket.emit('demande_dinscription_rejeter',  employes[index].email );
        getEmploye();})
      .catch(error => console.log(error));
  }

  const confirmerDemande = (index) => {
    const email = employes[index].email;
    axios
      .put('http://localhost:3546/api/employe/approve/', {email})
      .then(() => {
      socketStore.socket.emit('demande_approuver', employes[index].email);
      getEmploye();})
      .catch(error => console.log(error));
      
  }

  socketStore.socket.on("mettre_a_jour_inscription", () => {
    getEmploye();
  })

  const DemandeDenregistrement = () => {
    if (registrationRequest.length!==0) {
     return(
      <>
        <div className="table_inscription">
          <div className="table_head">
            <p>nom</p>
            <p>prenom</p>
            <p>email</p>
          </div>
          <div className="table_body">
          {employes.map((data,index)=>{      
            if (!data.isApproved) {
              return(
                <div className="table_row" key={index}>
                  <p>{data.nom}</p>
                  <p>{data.prenom}</p>
                  <p>{data.email}</p>
                  <button className="dismiss_button" onClick={()=>refuserLaDemande(index)}>rejeter</button>
                  <button className="approve_button" onClick={()=>confirmerDemande(index)}>approuver</button>
                </div>
                )
            }
            })}
        </div>
      </div>
      </>
     ) 
    } else {
      return <h4 className="empty_array">aucune nouvelle demande d'inscription</h4>
    }
  }

  const getEmploye = async () => { 
    await axios
    .get('http://localhost:3546/api/employe')
    .then(({ data }) => {
      setEmployes(data);
      setRegistrationRequest(data.filter((employe)=> !employe.isApproved));})
    .catch((error) => console.error(error));
  }

  useEffect(() => {
    getEmploye();
  }, []);

  return (
    <div className="Employe">
      <h1>demande d'inscription</h1>
      {DemandeDenregistrement()}
    </div>
  );
}