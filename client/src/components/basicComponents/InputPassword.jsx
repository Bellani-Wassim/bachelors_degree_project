import React, { useState }  from "react";
import closedEye from '../../assets/images/closed-eye.svg';
import openEye from '../../assets/images/open-eye.svg';

export default function InputPassword({setMotDePasse , motDePasse}) {
  const [passwordType, setPasswordType] = useState("password");


  const togglePassword =()=>{
    if(passwordType==="password")
      {
      setPasswordType("text");
      return;
      }
      setPasswordType("password");
  }
  return(
    <div className="inputPassword">
      <input type={passwordType} defaultValue={motDePasse} onChange={(e) => setMotDePasse(e.target.value)} />
      <img src={passwordType=="password" ? closedEye : openEye} onClick={() => togglePassword(3)}/>
    </div>
  )
}