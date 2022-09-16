import React, { useState, useEffect, useContext } from "react";
import "../assets/styles/employe.css";
import { APIStoreContext } from "../APIStoreContext";
import empty_star from "../assets/images/empty_star.svg";
import full_star from "../assets/images/full_star.svg";
import axios from 'axios';

export default function Employe({socket}) {
  const [employes, setEmployes] = useState([]);

  const { socketStore } = useContext(APIStoreContext);

  const deleteEmploye = (index) => {
    const email = employes[index].email;
    axios
      .put('http://localhost:3546/api/employe/delete/', {email})
      .then(() => {
        socketStore.socket.emit('employe_supprimer',  email );
        getEmploye();})
      .catch(error => console.log(error));
  }

  const changeEmployeStatus = (index) => {
    const email = employes[index].email;
    const admin = employes[index].admin;
    axios
      .put('http://localhost:3546/api/employe/employeStatus/', { email , admin })
      .then(() => {
        socketStore.socket.emit('employe_admin_status_changed',  email , admin);
        getEmploye();
      })
      .catch(error => console.log(error));
  }

  socket.on("mettre_a_jour_employe", () => {
    getEmploye();
  })


  const listeEmployes = () => {
     return(
      <>
        <div className="table_employe">
          <div className="table_head">
            <p>nom</p>
            <p>prenom</p>
            <p>email</p>
          </div>
          <div className="table_body">
          {employes.map((data,index)=>{      
            if (data.isApproved) {
              return(
                <div className="table_row" key={index}>
                  <p>{data.nom}</p>
                  <p>{data.prenom}</p>
                  <p>{data.email}</p>
                  <div className="star_div">
                    {/* <img 
                    className="star_icon" 
                    src={data.admin ?  full_star : empty_star} 
                    title={data.admin ? "employe admin" : "l'employe n'est pas admin"}
                    onClick={() => changeEmployeStatus(index)}/> */}
                  </div>
                  <button className="dismiss_button" onClick={() => deleteEmploye(index)}>supprimer</button>
                </div>
                )
            }
            })}
        </div>
      </div>
      </>
     )
  }

  const getEmploye = async () => { 
    await axios
    .get('http://localhost:3546/api/employe')
    .then(({data}) =>setEmployes(data))
    .catch((error) => console.error(error));
  }

  useEffect(() => {
    getEmploye();
  }, []);

  return (
    <div className="Employe">
      <h1>liste des employees</h1>
      {listeEmployes()}
    </div>
  );
}