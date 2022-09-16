import React, { useEffect, useState } from 'react';
import exit from '../assets/images/exit.svg';
import axios from 'axios';
import InputPassword from './basicComponents/InputPassword';


export default function MyAccount({ myAccountModelDisplay, setMyAccountModelDisplay, employe, setEmploye}) {
  const [nom, setNom] = useState(employe.nom);
  const [prenom, setPrenom] = useState(employe.prenom);
  const [email, setEmail] = useState(employe.email);
  const [motDePasse, setMotDePasse] = useState("");
  const [confirmerMotDePasse, setConfirmerMotDePasse] = useState("");
  const [nouveauMotDePasse, setNouveauMotDePasse] = useState("");

  const [prevnom, setPrevNom] = useState(nom);
  const [prevprenom, setPrevPrenom] = useState(prenom);
  const [prevemail, setPrevEmail] = useState(email);

  const [changeNom,setChangeNom] = useState(false);
  const [changePrenom,setChangePrenom] = useState(false);
  const [changeEmail,setChangeEmail] = useState(false);
  const [changeMotDePasse,setChangeMotDePasse] = useState(false);

  const [messageErreur,setMessageErreur] = useState(false);
  const [messagePositif,setMessagePositif] = useState(false);

  const confirmEdit = (option) => {
    switch (option) {
      case "nom":
        setPrevNom(nom);
        setChangeNom(false);
        axios
        .put('http://localhost:3546/api/updateEmploye/updateName', {nom, email})
        .then(res =>{ (res.status == 200) ? setMessagePositif("votre nom a bien etait modifier") : setMessageErreur("une erreur est survenue")}) 
        .then(
          setEmploye({
            "nom": nom,
            "prenom": employe.prenom,
            "email": employe.email,
            "admin": employe.admin,
            "isApproved": employe.isApproved,
          })
        )
        .catch((error) => setMessageErreur(error.response.data.error));
        
        break;
      case "prenom":
        setPrevPrenom(prenom);
        setChangePrenom(false);
        axios
        .put('http://localhost:3546/api/updateEmploye/updateSurname', {prenom, email})
        .then(res =>{ (res.status == 200) ? setMessagePositif("votre prenom a bien etait modifier") : setMessageErreur("une erreur est survenue")}) 
        .then(
          setEmploye({
            "nom": employe.nom,
            "prenom": prenom,
            "email": employe.email,
            "admin": employe.admin,
            "isApproved": employe.isApproved,
          })
        )
        .catch((error) => setMessageErreur(error.response.data.error));
        break;
      case "email":
        setPrevEmail(email);
        setChangeEmail(false);
        axios
        .put('http://localhost:3546/api/updateEmploye/updateEmail', {nom, prenom, email})
        .then(res =>{ (res.status == 200) ? setMessagePositif("votre email a bien etait modifier") : setMessageErreur("une erreur est survenue")}) 
        .then(
          setEmploye({
            "nom": employe.nom,
            "prenom": employe.prenom,
            "email": email,
            "admin": employe.admin,
            "isApproved": employe.isApproved,
          })
        )
        .catch((error) => setMessageErreur(error.response.data.error));
        break;
      case "mot de passe":
        if (nouveauMotDePasse==confirmerMotDePasse) {
          setMessageErreur("");
          console.log(nouveauMotDePasse+motDePasse);
          axios
          .put('http://localhost:3546/api/updateEmploye/updatePassword', {email, motDePasse, nouveauMotDePasse})
          .then(res => {
            setMessagePositif("votre mot de passe a bien etait modifier");
            setChangeMotDePasse(false);
        })
          .catch(error => {
            setMessageErreur(error.response.data.error);
           }); 
          } else {
            setMessageErreur("les mots de passes ne sont pas identiques");
          }
        break;
    }
    setTimeout(() => {
      setMessagePositif("");
      setMessageErreur("");
    }, 2800);
  }

  const cancelEdit = (option) => {
    switch (option) {
      case "nom":
        setNom(prevnom);
        setChangeNom(false);
        break;
      case "prenom":
        setPrenom(prevprenom);
        setChangePrenom(false);
        break;
      case "email":
        setEmail(prevemail);
        setChangeEmail(false);
        break;
      case "mot de passe":
        setChangeMotDePasse(false);
        setMessageErreur("");
        break;
    }
  }

  const closeMyAccountModel = () => {
    setMessagePositif("");
    setMessageErreur("");
    setChangeMotDePasse(false);
    setChangeEmail(false);
    setChangePrenom(false);
    setChangeNom(false);
    cancelEdit();
    setMyAccountModelDisplay(false);
  }

  return (
    <div className={`modal-container ${myAccountModelDisplay ? "" : "d-none"}`}>
      <div className="modal" id="myAccount">
      <img className="closeIcon" src={exit} alt="quitter" onClick={() => closeMyAccountModel()}/>
        <h3 className="modal-title">mon compte</h3>
        <div className='flex-box-my-account'>

          <div className='my-account-row'>
          <h5>nom</h5>
          {!changeNom && 
          <> <h5>{nom}</h5>
          <h6 className='editEmployeData' onClick={() => setChangeNom(true) }>changer</h6> </>}
          {changeNom && 
          <> <input type="text" defaultValue={nom} onChange={(e) => setNom(e.target.value)} autoFocus/>
          <h6 className='cancelEditData' onClick={() => cancelEdit("nom") }>annuler</h6> 
          <h6 className='confirmEditData' onClick={() => confirmEdit("nom") }>confirmer</h6> </>}
          </div>

          <div className='my-account-row'>
          <h5>prenom</h5>
          {!changePrenom && 
          <> <h5>{prenom}</h5>
          <h6 className='editEmployeData' onClick={() => setChangePrenom(true) }>changer</h6> </>}
          {changePrenom && 
          <> <input type="text" defaultValue={prenom} onChange={(e) => setPrenom(e.target.value)} autoFocus/>
          <h6 className='cancelEditData' onClick={() => cancelEdit("prenom") }>annuler</h6> 
          <h6 className='confirmEditData' onClick={() => confirmEdit("prenom") }>confirmer</h6> </>}
          </div>

          <div className='my-account-row'>
          <h5>email</h5>
          {!changeEmail && 
          <> <h5>{email}</h5>
          <h6 className='editEmployeData' onClick={() => setChangeEmail(true) }>changer</h6> </>}
          {changeEmail && 
          <> <input type="text" defaultValue={email} onChange={(e) => setEmail(e.target.value)} autoFocus/>
          <h6 className='cancelEditData' onClick={() => cancelEdit("email") }>annuler</h6> 
          <h6 className='confirmEditData' onClick={() => confirmEdit("email") }>confirmer</h6> </>}
          </div>


          <div className='my-account-row'>
          <h5>mot de passe</h5>
          {!changeMotDePasse && 
          <> <h5>***********</h5>
          <h6 className='editEmployeData' onClick={() => setChangeMotDePasse(true) }>changer</h6> </>}
          {changeMotDePasse && 
          <>
          <div className='change-password'> 
          <p>mot de passe actuel :</p>
          <InputPassword setMotDePasse={setMotDePasse} motDePasse={motDePasse} />
          <p>nouveau mot de passe :</p>
          <InputPassword setMotDePasse={setNouveauMotDePasse} motDePasse={nouveauMotDePasse} />
          <p>confirmer le mot de passe :</p>
          <InputPassword setMotDePasse={setConfirmerMotDePasse} motDePasse={confirmerMotDePasse} />
          </div>
          <h6 className='cancelEditData' onClick={() => cancelEdit("mot de passe") }>annuler</h6> 
          <h6 className='confirmEditData' onClick={() => confirmEdit("mot de passe") }>confirmer</h6> </>}
          </div>
          <p className="messageDerreur">{messageErreur}</p>
          <p className="messagePositif">{messagePositif}</p>

        </div>
        <div className="modal-body"></div>

        <div className="modal-footer">
        </div>
      </div>
    </div>
)
}
