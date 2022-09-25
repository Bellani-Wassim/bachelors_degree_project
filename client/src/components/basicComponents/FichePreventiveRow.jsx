import React, {useEffect, useState} from 'react';
import "../../assets/styles/modal.css";

function FichePreventiveRow({ index, array, setArray}) {
  let id_equip = "equipement_input"+index.toString();
  let id_type = "type_input"+index.toString();
  let id_num_serie = "num_serie_input"+index.toString();
  let id_etat = "etat_input"+index.toString();
  let id_observation = "observation_input"+index.toString();
  const calculate = () => {
    let top = 964 + 38*index;
    top = top.toString()+ 'px';

    let element = document.getElementById(id_equip);
    element.style.top = top;

    let element_type = document.getElementById(id_type);
    element_type.style.top = top;

    let element_num_serie = document.getElementById(id_num_serie);
    element_num_serie.style.top = top;

    let element_etat = document.getElementById(id_etat);
    element_etat.style.top = top;

    let element_ob = document.getElementById(id_observation);
    element_ob.style.top = top;

    let more_button = document.getElementById("more_equipement");
    more_button.style.top = top;
    
  }

  useEffect(() => {
    calculate();
  }, []);
  return (
      <>
        <input type="text" id={id_equip} className='equipement_1' maxLength="22" defaultValue={array[index].nom_equipement} onChange={(e)=>{
          let newRowsData = [...array];
          newRowsData[index] = {nom_equipement:e.target.value, type_model:array[index].type_model, num_serie:array[index].num_serie, etat:array[index].etat, observation:array[index].observation}  
          setArray(newRowsData);
        }} />
				<input type="text" id={id_type} className='type_1' maxLength="16" defaultValue={array[index].type_model} onChange={(e)=>{
          let newRowsData = [...array];
          newRowsData[index] = {nom_equipement:array[index].nom_equipement, type_model:e.target.value, num_serie:array[index].num_serie, etat:array[index].etat, observation:array[index].observation}  
          setArray(newRowsData);
        }} />
				<input type="text" id={id_num_serie} className='num_serie_1' maxLength="15" defaultValue={array[index].num_serie} onChange={(e)=>{
          let newRowsData = [...array];
          newRowsData[index] = {nom_equipement:array[index].nom_equipement, type_model:array[index].type_model, num_serie:e.target.value, etat:array[index].etat, observation:array[index].observation}  
          setArray(newRowsData);
        }} />
				<input type="text" id={id_etat} className='etat_1' maxLength="9" defaultValue={array[index].etat} onChange={(e)=>{
          let newRowsData = [...array];
          newRowsData[index] = {nom_equipement:array[index].nom_equipement, type_model:array[index].type_model, num_serie:array[index].num_serie, etat:e.target.value, observation:array[index].observation}  
          setArray(newRowsData);
        }} />
				<input type="text" id={id_observation} className='observation_1' maxLength="27" defaultValue={array[index].observation} onChange={(e)=>{
          let newRowsData = [...array];
          newRowsData[index] = {nom_equipement:array[index].nom_equipement, type_model:array[index].type_model, num_serie:array[index].num_serie, etat:array[index].etat, observation:e.target.value}  
          setArray(newRowsData);
        }} />
      </>
    );
}

export default FichePreventiveRow;
