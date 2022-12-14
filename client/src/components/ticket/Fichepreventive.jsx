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

function Fichepreventive({set_afficher, typeDeFiche, setCree_fiche_preventive, setDonnees_des_fiches, download, setDownload, indexDownload, rowsData,afficher, set_modifier, modifier}) {
	const [array, setArray] = useState([]);
	const [apercu, set_apercu] = useState(false);
	const [input_numero_ticket, set_input_numero_ticket] = useState("");
	const [input_periode, set_input_periode] = useState("");
	const [checked_ticket_ouvert, set_checked_ticket_ouvert] = useState(true);
	const [checked_ticket_ferme, set_checked_ticket_ferme] = useState(false);
	const [input_site, set_input_site] = useState("");
	const [input_conclusion_generale, set_input_conclusion_generale] = useState("");
  const { ticketStore,socketStore } = useContext(APIStoreContext);
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
		}
		
		imageObj.setAttribute('crossOrigin', 'anonymous');
		imageObj.src = ticket_telecharge;
		
		return false;
	}

	const telecharger = () => {
		if (modifier) {
			ticketStore.updateTickets({
				id_ticket:input_numero_ticket,
				id_site:input_site,
				id_fournisseur:input_nom_fournisseur,
				id_technicien:input_nom_technicien,
				periode_ticket:input_periode,
				etat_ticket:checked_ticket_ouvert,
				conclusion_general:input_conclusion_generale,
				equip_ursi:array
			});
			socketStore.socket.emit('tickets_a_changee');
			return_to_main();
		} else {
			ReImg.fromCanvas(document.getElementById('idCanvas')).downloadPng();
			if (!download && input_numero_ticket.length !==0) {
				ticketStore.addTickets({
					id_ticket:input_numero_ticket,
					id_site:input_site,
					id_fournisseur:input_nom_fournisseur,
					id_technicien:input_nom_technicien,
					periode_ticket:input_periode,
					etat_ticket:checked_ticket_ouvert,
					conclusion_general:input_conclusion_generale,
					equip_ursi:array
				});
				socketStore.socket.emit('tickets_a_changee');
			}
		}
		setCree_fiche_preventive(false);
		set_apercu(false);
		setDonnees_des_fiches(true);
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

	const showResultForDownload = () => {
			var canvas = document.getElementById('idCanvas');
			var context = canvas.getContext('2d');
		
			var imageObj = new Image();

			imageObj.onload = function() {
			context.drawImage(imageObj, 0, 0);
			context.fillStyle = "black";

			context.font = "48px Calibri";

			if (rowsData[indexDownload].etat_ticket) {
				context.fillText("X", 464, 861);
			} else {
				context.fillText("X", 669, 861);			
			}

			context.font = "42px Calibri";

			context.fillText(rowsData[indexDownload].id_ticket, 420, 622);
			context.fillText(rowsData[indexDownload].id_site, 256, 670);
			context.fillText(rowsData[indexDownload].id_fournisseur, 415, 716);
			context.fillText(rowsData[indexDownload].id_technicien, 400, 764);
			context.fillText(rowsData[indexDownload].periode_ticket, 317, 811);


			context.font = "41px Calibri";
			if (rowsData[indexDownload].conclusion_general) {
				var parts = rowsData[indexDownload].conclusion_general.match(/[\s\S]{1,80}/g)
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
				rowsData[indexDownload].equip_ursi.map((item, index) => {
					context.fillText(item.nom_equipement, 30, 1463+index*63);
					context.fillText(item.type_model, 439, 1463+index*63);
					context.fillText(item.num_serie, 747, 1463+index*63);
					context.fillText(item.etat, 1005, 1463+index*63);
					context.fillText(item.observation, 1169, 1463+index*63);
				})

				context.strokeStyle = 'black';
				context.lineWidth = 3;

				context.beginPath();
				for (let i = 0; i < rowsData[indexDownload].equip_ursi.length; i++) {	
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

	const return_to_main = () => {
		setCree_fiche_preventive(false);
		setDonnees_des_fiches(true);
		set_apercu(false);
		set_afficher(false);
		set_modifier(false);
	}

	useEffect(() => {
    if (typeof indexDownload !== "undefined" || indexDownload >-1) {
			setReadyToDownload(true);
			showResultForDownload(); 
    }
  }, [indexDownload]);

	useEffect(() => {
    if (afficher) {
			set_apercu(true);
		}
  }, [afficher]);

	useEffect(() => {
    if (modifier) {
			set_apercu(false);
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
		}
  }, [modifier]);
  

	useEffect(() => {
		if (!modifier) {
			set_apercu(false);
			set_input_numero_ticket("");
			set_input_site("");
			set_input_nom_fournisseur("");
			set_input_nom_technicien("");
			set_input_periode("");
			set_checked_ticket_ouvert(true);
			set_input_conclusion_generale("")
			setArray([  
				{nom_equipement: "",
				type_model: "" ,
				num_serie: "",
				etat: "" ,
				observation: "" }]);	
		}
  }, [typeDeFiche]);
  

	useEffect(() => {
		if (array.length==0) {
			add_row();
		}
		showResult();
	}, []);

	return (
		<div className='ticket_container_ag' >

			{readyToDownload && <div className='ticket'>
				{apercu && !afficher && 
					<div className='button_container'>
						<Button onClick={() => set_apercu(false)}>modifier</Button>
						<Button onClick={() => telecharger()}>enregistrer</Button>
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
				<canvas id="idCanvas" width="1765" height="2463" style={{display : (apercu) ? "block" : "none"}} ></canvas>
				</div>}
			<img src={return_button} id="return_button" alt="add" onClick={() =>return_to_main()}></img>			
			{!apercu && <Button onClick={() => {showResult(); set_apercu(true);}} id="preview_button">apercu</Button>}
		</div>
	);
}

export default observer(Fichepreventive);
