import React, { useEffect, useContext } from 'react';
import { useState } from 'react';
import {ReImg} from 'reimg'
import { observer } from "mobx-react";
import { APIStoreContext } from "../../APIStoreContext";
import ticket from '../../assets/images/fiche_dintervention.jpg'
import "../../assets/styles/ficheDinterventionGenerator.css"
import ticket_telecharge from '../../assets/images/fiche_dintervention.jpg'
import more from '../../assets/images/plus_icon.svg';
import return_button from '../../assets/images/return_button.svg'
import FichePreventiveRow from '../basicComponents/FichePreventiveRow';
import { Button } from '../basicComponents';

function Fichepreventive({setCree_fiche_preventive, setDonnees_des_fiches, download, setDownload, indexDownload, setA}) {
	const [array, setArray] = useState([]);
	const [apercu, set_apercu] = useState(false);
	const [input_numero_ticket, set_input_numero_ticket] = useState("");
	const [input_periode, set_input_periode] = useState("fqsd");
	const [checked_ticket_ouvert, set_checked_ticket_ouvert] = useState(true);
	const [checked_ticket_ferme, set_checked_ticket_ferme] = useState(false);
	const [input_site, set_input_site] = useState("");
	const [input_conclusion_generale, set_input_conclusion_generale] = useState("");
  const { ticketStore } = useContext(APIStoreContext);
  const [rowsData, setRowsData] = useState([]);
	const [readyToDownload, setReadyToDownload] = useState(true);

	const [input_nom_fournisseur, set_input_nom_fournisseur] = useState("");
	const [input_nom_technicien, set_input_nom_technicien] = useState("");

	const handle_checked_fiche = (fiche) => {
		switch (fiche) {
			case "curative":
				set_checked_curative(true);
				set_checked_preventive(false);
			break;
			case "preventive":
				set_checked_curative(false);
				set_checked_preventive(true);
			break;
			case "ouvert":
				set_checked_ticket_ferme(false);
				set_checked_ticket_ouvert(true);
			break;
			case "ferme":
				set_checked_ticket_ouvert(false);
				set_checked_ticket_ferme(true);
			break;
		}
	}

  const showResult = () => {
		  console.log("showing the result");
			var canvas = document.getElementById('idCanvas');
			var context = canvas.getContext('2d');
		
			var imageObj = new Image();

			imageObj.onload = function() {
			context.drawImage(imageObj, 0, 0);
			context.fillStyle = "black";

			context.font = "48px Calibri";

			if (checked_ticket_ouvert) {
				context.fillText("X", 464, 861);
			} else if (checked_ticket_ferme) {
				context.fillText("X", 669, 861);			
			}

			context.font = "42px Calibri";

			context.fillText(input_numero_ticket, 420, 622);
			context.fillText(input_site, 256, 670);
			context.fillText(input_nom_fournisseur, 415, 716);
			context.fillText(input_nom_technicien, 400, 764);
			context.fillText(input_periode, 317, 811);


			context.font = "41px Calibri";
			if (input_conclusion_generale) {
				var parts = input_conclusion_generale.match(/[\s\S]{1,80}/g)
				if (parts[0]) {
					context.fillText(parts[0], 80, 1040);
				} 
				if (parts[1]) {
					context.fillText(parts[1], 80, 1080);
				} 
				if (parts[2]) {
					context.fillText(parts[2], 80, 1120);
				}
				if (parts[3]) {
					context.fillText(parts[3], 80, 1160);
				}
				if (parts[4]) {
					context.fillText(parts[4], 80, 1200);
				}}
				context.font = "36px Calibri";
				array.map((item, index) => {
					context.fillText(item.nom_equipement, 30, 1463+index*63);
					context.fillText(item.type_model, 439, 1463+index*63);
					context.fillText(item.num_serie, 747, 1463+index*63);
					context.fillText(item.etat, 1005, 1463+index*63);
					context.fillText(item.observation, 1169, 1463+index*63);
				})

				context.strokeStyle = 'black';
				context.lineWidth = 3;

				context.beginPath();
				for (let i = 0; i < array.length; i++) {	
					context.moveTo(23.5, 1417+i*63);
					context.lineTo(23.5, 1480+i*63);

					context.moveTo(432, 1417+i*63);
					context.lineTo(432, 1480+i*63);

					context.moveTo(740.5, 1417+i*63);
					context.lineTo(740.5, 1480+i*63);

					context.moveTo(998.5, 1417+i*63);
					context.lineTo(998.5, 1480+i*63);

					context.moveTo(1162.5, 1417+i*63);
					context.lineTo(1162.5, 1480+i*63);

					context.moveTo(1604, 1480+i*63);
					context.lineTo(23, 1480+i*63);

					context.moveTo(1603, 1417+i*63);
					context.lineTo(1603, 1480+i*63);
				}
				context.stroke();
				set_apercu(true);
		}
		
		imageObj.setAttribute('crossOrigin', 'anonymous');
		imageObj.src = ticket_telecharge;
		
		return false;
	}
	const telecharger = () => {
		ReImg.fromCanvas(document.getElementById('idCanvas')).downloadPng();
	}

	const add_row = () => {
		if (array.length<14) {
			setArray([...array,  
				{nom_equipement: "",
				type_model: "" ,
				num_serie: "",
				etat: "" ,
				observation: "" }]);
		}
	}

  useEffect(() => {
    if (download) {
      showResult(true);
			telecharger();
			setDownload(false);
    }
  }, [download]);

	useEffect(() => {
    if (typeof indexDownload !== "undefined" || indexDownload >-1) {
			console.log("clicked");
			setReadyToDownload(false);
			setArray(rowsData[indexDownload].equip_ursi);
			set_input_numero_ticket(rowsData[indexDownload].id_ticket);
			set_input_periode(rowsData[indexDownload].periode_ticket);
			if (rowsData[indexDownload].etat_ticket) {
				set_checked_ticket_ouvert(true);
			}else {
				set_checked_ticket_ferme(true);
			}
			set_input_site(rowsData[indexDownload].id_site);
			set_input_conclusion_generale(rowsData[indexDownload].conclusion_general);
			set_input_nom_fournisseur(rowsData[indexDownload].id_fournisseur);
			set_input_nom_technicien(rowsData[indexDownload].id_technicien);
			setReadyToDownload(true);
			showResult(); 
			setA(true);
    }
  }, [indexDownload]);
  
	useEffect(() => {
		console.log("dans le useeffect");

		ticketStore.loadTickets().then(() => 
		setRowsData(ticketStore.tickets));
		
		if (array.length==0) {
			add_row();
		}

		showResult();
  }, []);

	return (
		<div className='ticket_container_ag' >

			{readyToDownload && <div className='ticket'>
				{apercu && 
					<div className='button_container'>
						<Button onClick={() => set_apercu(false)}>modifier</Button>
						<Button onClick={() => telecharger()}>telecharger</Button>
					</div>
				}
				{!apercu &&
					<>
					<img src={ticket} id="ticket" alt="ticket"></img>

					<input type="checkbox" className='ticket_ouvert' checked={checked_ticket_ouvert} onChange={() => handle_checked_fiche("ouvert")}/>
					<input type="checkbox" className='ticket_ferme' checked={checked_ticket_ferme} onChange={() => handle_checked_fiche("ferme")}/> 

					<input type="text" className='num_ticket' maxLength="22" defaultValue={input_numero_ticket} onChange={(e) => set_input_numero_ticket(e.target.value)}/>
					<input type="text" className='id_site' maxLength="25" defaultValue={input_site} onChange={(e) => set_input_site(e.target.value)}/>
					<input type="text" className='id_fournisseur' maxLength="21" defaultValue={input_nom_fournisseur} onChange={(e) => set_input_nom_fournisseur(e.target.value)}/>
					<input type="text" className='id_technicien' maxLength="23" defaultValue={input_nom_technicien} onChange={(e) => set_input_nom_technicien(e.target.value)}/>
					<input type="text" className='periode' maxLength="23" defaultValue={input_periode} onChange={(e) => set_input_periode(e.target.value)}/>

					<img src={more} id="more_equipement" alt="add" onClick={() => add_row()}></img>
					<textarea className='conclusion_generale_ticket' wrap="hard" maxLength="362" defaultValue={input_conclusion_generale} onChange={(e) => set_input_conclusion_generale(e.target.value)}/>
					{
						array.map((object , i) => {
							return <FichePreventiveRow index={i} array={array} setArray={setArray}/>
						})	
					}
					</>
				}
				 
				<canvas id="idCanvas" width="1765" height="2463"  ></canvas>
			</div>}
			<img src={return_button} id="return_button" alt="add" onClick={() =>{setCree_fiche_preventive(false);setDonnees_des_fiches(true) ;} }></img>			
			{!apercu && <Button onClick={() => showResult()} id="preview_button">apercu</Button>}
		</div>
	);
}

export default observer(Fichepreventive);
