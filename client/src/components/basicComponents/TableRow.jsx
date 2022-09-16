import React, { useState, useContext, useEffect } from 'react'
import threeDots from '../../assets/images/three-dots.svg'
import moreArrow from '../../assets/images/arrow-more.svg'
import minimiseArrow from '../../assets/images/arrow-down.svg'
import DropDownOptions from './DropDownOptions';
import { observer } from "mobx-react";
import { APIStoreContext } from '../../APIStoreContext';

function TableRow({rows_data_displayed, page}) {

  const { fournisseurStore, plateformeStore } = useContext(APIStoreContext);

  const [dropDown, setDropdown] = useState(null);
  const [arrowId, setArrowId] = useState(null);
  const [classTableRow, setClassTableRow]=useState("tableRow"+page);


  const displayClickOption = (index) => {
    setDropdown((prev) => {
        return prev === index ? null : index;
    });
  };
  const arrowHandleClick = (index) => {
    setArrowId((prev) => {
        return prev === index ? null : index;
    });
  };
  const displayRow = (data,page) => {
    switch (page) {
      case "fournisseur":
        return(<>
            <p>{data.id}</p>
            <p>{data.nom}</p>
            <p>{data.email}</p>
            <p>{data.adresse}</p>
        </>)
      case "technicien":
        return(<>
          <p>{data.id}</p>
          <p>{data.nom}</p>
          <p>{data.prenom}</p>
          <p>{data.telephone}</p>
          <p>&emsp;&nbsp;{data.id_fournisseur}</p>
          <p>{data.email}</p>
          <p>{data.adresse}</p>
      </>)
      case "plateforme":
        return(<>
          <p>{data.id}</p>
          <p>{data.nom}</p>
      </>)
      case "equipement":
        return(<>
          <p>{data.num_serie}</p>
          <p>{data.FRU}</p>
          <p>{data.nom}</p>
          <p>{data.id_site}</p>
          <p>{data.id_plateforme}</p>
          <p>&emsp;&nbsp;{data.severite}</p>
          <p>{data.date_mise_en_marche}</p>
          <p>{data.date_fin_service}</p>
      </>)
    }
  }
  const arrowMoreDisplay = (page,index) => {
    switch (page) {
      case "technicien":
        return(<>
          <img className='moreArrow' src={moreArrow} alt='' onClick={()=>arrowHandleClick(index)} style={{ display: arrowId === index ? 'none' : 'block'}}/>
          <img className='moreArrow' src={minimiseArrow} alt='' onClick={()=>arrowHandleClick(index)} style={{ display: arrowId === index ? 'block' : 'none' }}/>
      </>)
      case "equipement":
        return(<>
          <img className='moreArrow' src={moreArrow} alt='' onClick={()=>arrowHandleClick(index)} style={{ display: arrowId === index ? 'none' : 'block'}}/>
          <img className='moreArrow' src={minimiseArrow} alt='' onClick={()=>arrowHandleClick(index)} style={{ display: arrowId === index ? 'block' : 'none' }}/>
      </>)
    }
  }

  const displayMoreInfo = (page,data,index) =>{
      switch (page) {
        case "technicien":
          let obj = {id:"000",nom:"introuvable",email:"introuvable",adresse:"introuvable"};
          if(arrowId === index){
            fournisseurStore.fournisseurs.filter(o => {
            if (o.id === rows_data_displayed[index].id_fournisseur) {
              obj=o;
              return;
            } 
          })}
        return(<>
          <div className="rowInfoFournisseur" key={data.id} style={{ display: arrowId === index ? 'flex' : 'none' }}> 
            <p>nom du fournisseur  &nbsp;:  &nbsp;{obj.nom}</p>
            <p>email du fournisseur  &nbsp;:  &nbsp;{obj.email}</p>
            <p>adresse du fournisseur  &nbsp;:  &nbsp;{obj.adresse}</p>
            </div></>
            )
        case "equipement":
          let obj2 = {id:"000",nom:"introuvable"};
          if(arrowId === index){
            plateformeStore.plateformes.filter(o => {
            if (o.id === rows_data_displayed[index].id_plateforme) {
              obj2=o;
              return;
            } 
          })}
          return(<>
            <div className="rowInfoEquipement" style={{ display: arrowId === index ? 'flex' : 'none' }}> 
              <p>nom de la plateforme  &nbsp;:  &nbsp;{obj2.nom}</p>
            </div></>)
      }      
  }


  useEffect(() => {
    fournisseurStore.loadFournisseurs();
    plateformeStore.loadPlateformes();
  }, []);

  return (<>
          {rows_data_displayed.map((data,index)=>{      
          return(<div key={data.id || data.num_serie}>
          <div className={classTableRow} > 
            {arrowMoreDisplay(page,index)}
            {displayRow(data,page)}
            <div className='dropDown'>
              <img className='threeDotsIcon' src={threeDots} alt='' onClick={()=>displayClickOption(index)}/>
              <div className='dropDownMenu' style={{ display: dropDown === index ? 'block' : 'none' }}>
                    <DropDownOptions 
                      rows_data_displayed={rows_data_displayed} 
                      idx={index} 
                      displayClickOption={displayClickOption}
                      page={page}
                      setArrowId={setArrowId}/>
              </div>    
            </div>
          </div>
          {displayMoreInfo(page,data,index)}          
          </div>
          )
        })}
        </>
  )
}

export default observer(TableRow);