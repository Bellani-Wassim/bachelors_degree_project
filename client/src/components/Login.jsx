import React, { useState, useContext }  from "react";
import axios from 'axios';
import InputPassword from "./basicComponents/InputPassword";
import { APIStoreContext } from "../APIStoreContext";

export default function Login({setAuthenticated , setIsAdmin, setEmploye }) {
  const [login , setLogin] = useState(false);
  const [title , setTitre] = useState("se connecter");
  const [signUp, setSignUp] = useState("s'enregistrer");
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [motDePasse, setMotDePasse] = useState("");
  const [confirmationMDP, setConfirmationMDP] = useState("");
  const [waitingApproval, setWaitingApproval] = useState(false);
  const [message, setMessage] = useState("");
  const [waiting_message, setWaiting_message] = useState("votre demande d'enregistrement est en cour de traitement .\nveuillez attendre l'approbation de l'admin");

  const { socketStore } = useContext(APIStoreContext);

  socketStore.socket.on("autoriser_lacces",(email_socket) => {
    if (email==email_socket) {
      setEmploye({
        "nom": nom,
        "prenom": prenom,
        "email": email,
        "admin": false,
        "isApproved": true})
      setWaitingApproval(false);
      setAuthenticated(true);
    }
  }) 

  socketStore.socket.on("interdir_lacces", (email_socket) => {
		if (email==email_socket) {
			setAuthenticated(false);		
      setWaitingApproval(true);	
      setWaiting_message("vous n'etes pas autorise a acceder au site");
		}
	})

  const changeAuth = () => {
    if(login){
      setTitre(signUp);
      setLogin(!login);
      setSignUp("s'enregistrer");
    }else{
      setTitre("s'enregistrer");
      setLogin(!login);
      setSignUp("se connecter");
    }
  }

  const sendUserData = () => {
    if (!login) {
        axios
        .post('http://localhost:3546/api/authentication/login/', {email, motDePasse})
        .then(res => 
          {
            console.log(res);
            setEmploye(res.data.employe);
            if (res.data.employe.admin) {
              setAuthenticated(true);
              setIsAdmin(res.data.employe.admin);              
            } else if (res.data.employe.isApproved) {
              setAuthenticated(true);
            } else {
              setWaitingApproval(true);
            }
          ;})
        .then(console.log("employe auth"))
        .catch(error => {
          setMessage("erreur de connexion");
          setMessage(error.response.data.error);
         }); 
    }else{
          axios
          .post('http://localhost:3546/api/authentication/register/', {nom, prenom, email, motDePasse, confirmationMDP})
          .then(res => 
            {
              setMessage(res.data);
              setWaitingApproval(true);
              socketStore.socket.emit('demande_dinscription');
            })
          .catch(error => {
            setMessage(error.response.data.error)
        });

    }
  }

  return (
    <>
      {waitingApproval && <h3 className="waiting_message">{waiting_message}</h3>}
      {!waitingApproval &&
      <div  className="authentification">
        <h4>{title}</h4>
        <p className="messageDerreur">{message}</p>
        {login &&<><label >nom</label>
        <input 
          id="nom" 
          type="text" 
          defaultValue={nom} 
          onChange={(e) => setNom(e.target.value)}/></>}
        {login && <><label >prenom</label>
        <input 
          id="prenom" 
          type="text" 
          defaultValue={prenom} 
          onChange={(e) => setPrenom(e.target.value)}/></>}
        <label >email</label>
        <input 
          id="email" 
          type="text" 
          defaultValue={email} 
          onChange={(e) => setEmail(e.target.value)}/>
        <label >mot de passe</label>
        <InputPassword setMotDePasse={setMotDePasse} motDePasse={motDePasse} />
        {login && <> <label >confirmer mot de passe </label>
        <InputPassword setMotDePasse={setConfirmationMDP} motDePasse={confirmationMDP} /></>}
        <div className="boutonsSauthenrifier">
          <p onClick={()=>changeAuth()}>{signUp}</p>
          <button onClick={()=>sendUserData()}>{title}</button>
        </div>
      </div>}
    </>
    )
}