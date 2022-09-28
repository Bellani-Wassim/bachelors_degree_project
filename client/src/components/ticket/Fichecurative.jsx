import React, { useEffect, useContext } from 'react';
import { useState } from 'react';
import {ReImg} from 'reimg'
import { observer } from "mobx-react";
import { APIStoreContext } from "../../APIStoreContext";
import ticket from '../../assets/images/fiche_curative.jpg'
import "../../assets/styles/ficheDinterventionGenerator.css"
import ticket_telecharge from '../../assets/images/fiche_curative.jpg'
import return_button from '../../assets/images/return_button.svg'
import { Button } from '../basicComponents';

function Fichecurative({set_afficher, typeDeFiche, setCree_fiche_preventive, setDonnees_des_fiches, download, setDownload, indexDownload, rowsData,afficher, set_modifier, modifier}) {
	const [apercu, set_apercu] = useState(false);
	const [input_numero_ticket, set_input_numero_ticket] = useState("");
	const [input_periode, set_input_periode] = useState("");
	const [checked_ticket_ouvert, set_checked_ticket_ouvert] = useState(true);
	const [checked_ticket_ferme, set_checked_ticket_ferme] = useState(false);
	const [input_site, set_input_site] = useState("");
	const [input_severite, set_input_severite] = useState("");
	const [input_temps_resolution, set_input_temps_resolution] = useState("");
	const [input_temps_restoration, set_input_temps_restoration] = useState("");
	const [input_numero_serie, set_input_numero_serie] = useState("");
	const [input_id_equipement, set_input_id_equipement] = useState("");
	const [input_date_heure_signalisation, set_input_date_heure_signalisation] = useState("");
	const [input_date_heure_reponse, set_input_date_heure_reponse] = useState("");
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
			var canvas = document.getElementById('id_canvas_curative');
			var context = canvas.getContext('2d');
		
			var imageObj = new Image();

			imageObj.onload = function() {
			context.drawImage(imageObj, 0, 0);
			context.fillStyle = "black";

			context.font = "48px Calibri";

			if (checked_ticket_ouvert) {
				context.fillText("X", 464, 873);
			} else if (checked_ticket_ferme) {
				context.fillText("X", 669, 873);			
			}

			context.font = "42px Calibri";
			let dateSignal= input_date_heure_signalisation.substring(0, input_date_heure_signalisation.indexOf('T')); 
			let heureSignal= input_date_heure_signalisation.substring(input_date_heure_signalisation.indexOf('T') + 1);
			let dateReponse= input_date_heure_reponse.substring(0, input_date_heure_reponse.indexOf('T')); 
			let heureReponse= input_date_heure_reponse.substring(input_date_heure_reponse.indexOf('T') + 1);
			context.fillText(input_numero_ticket, 420, 635);
			context.fillText(input_site, 256, 683);
			context.fillText(input_nom_fournisseur, 415, 729);
			context.fillText(input_nom_technicien, 400, 778);
			context.fillText(input_periode, 317, 823);
			context.fillText(input_numero_serie, 110, 1343);
			context.fillText(input_id_equipement, 480, 1343);
			context.fillText("le  "+dateSignal, 80, 1620);
			context.fillText("a  "+heureSignal, 100, 1663);
			context.fillText("le  "+dateReponse, 470, 1620);
			context.fillText("a  "+heureReponse, 490, 1663);
			context.fillText(input_severite, 853, 1620);
			context.fillText(input_temps_restoration, 970, 1620);
			context.fillText(input_temps_resolution, 1300, 1620);
			context.strokeStyle = 'black';
			context.lineWidth = 3;
		}
		
		imageObj.setAttribute('crossOrigin', 'anonymous');
		imageObj.src = ticket_telecharge;
		
		return false;
	}

	const telecharger = () => {
		let dateSignal= input_date_heure_signalisation.substring(0, input_date_heure_signalisation.indexOf('T')); 
		let heureSignal= input_date_heure_signalisation.substring(input_date_heure_signalisation.indexOf('T') + 1);
		let dateReponse= input_date_heure_reponse.substring(0, input_date_heure_reponse.indexOf('T')); 
		let heureReponse= input_date_heure_reponse.substring(input_date_heure_reponse.indexOf('T') + 1);
		if (modifier) {
			ticketStore.updateTickets_curative({
				id_ticket:input_numero_ticket,
				id_site:input_site,
				id_fournisseur:input_nom_fournisseur,
				id_technicien:input_nom_technicien,
				periode_ticket:input_periode,
				etat_ticket:checked_ticket_ouvert,
				date_signalisation:dateSignal,
        heur_signalisation:heureSignal,
        date_reponse:dateReponse,
        heure_reponse:heureReponse,
        severite_equip:input_severite,
        temps_restauration:input_temps_restoration,
        temps_resolution:input_temps_resolution,
        num_serie:input_numero_serie,
        etat_machine_final:input_id_equipement,
			});
			socketStore.socket.emit('ticketsC_a_changee');
			return_to_main();
		} else {
			ReImg.fromCanvas(document.getElementById('id_canvas_curative')).downloadPng();
			if (!download&& input_numero_ticket.length !==0) {
				ticketStore.addTickets_curative({
					id_ticket:input_numero_ticket,
					id_site:input_site,
					id_fournisseur:input_nom_fournisseur,
					id_technicien:input_nom_technicien,
					periode_ticket:input_periode,
					etat_ticket:checked_ticket_ouvert,
					date_signalisation:dateSignal,
					heur_signalisation:heureSignal,
					date_reponse:dateReponse,
					heure_reponse:heureReponse,
					severite_equip:input_severite,
					temps_restauration:input_temps_restoration,
					temps_resolution:input_temps_resolution,
					num_serie:input_numero_serie,
					etat_machine_final:input_id_equipement,
				});
				socketStore.socket.emit('ticketsC_a_changee');
			}
		}
		setCree_fiche_preventive(false);
		set_apercu(false);
		setDonnees_des_fiches(true);
	}

  useEffect(() => {
    if (download) {
      showResult(true);
			telecharger();
			setDownload(false);
    }
  }, [download]);

	const showResultForDownload = () => {
			var canvas = document.getElementById('id_canvas_curative');
			var context = canvas.getContext('2d');
		
			var imageObj = new Image();

			imageObj.onload = function() {
			context.drawImage(imageObj, 0, 0);
			context.fillStyle = "black";

			context.font = "48px Calibri";

			if (rowsData[indexDownload].etat_ticket) {
				context.fillText("X", 464, 871);
			} else {
				context.fillText("X", 669, 871);			
			}

			context.font = "42px Calibri";
			context.fillText(rowsData[indexDownload].id_ticket, 420, 635);
			context.fillText(rowsData[indexDownload].id_site, 256, 683);
			context.fillText(rowsData[indexDownload].id_fournisseur, 415, 729);
			context.fillText(rowsData[indexDownload].id_technicien, 400, 778);
			context.fillText(rowsData[indexDownload].periode_ticket, 317, 825);
			context.fillText(rowsData[indexDownload].num_serie, 110, 1343);
			context.fillText(rowsData[indexDownload].etat_machine_final, 480, 1343);
			context.fillText("le  "+rowsData[indexDownload].date_signalisation, 80, 1620);
			context.fillText("a  "+rowsData[indexDownload].heur_signalisation, 100, 1663);
			context.fillText("le  "+rowsData[indexDownload].date_reponse, 470, 1620);
			context.fillText("a  "+rowsData[indexDownload].heure_reponse, 490, 1663);
			context.fillText(rowsData[indexDownload].severite_equip, 853, 1620);
			context.fillText(rowsData[indexDownload].temps_restauration, 1050, 1620);
			context.fillText(rowsData[indexDownload].temps_resolution, 1400, 1620);
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
			set_input_numero_ticket(rowsData[indexDownload].id_ticket);
			set_input_periode(rowsData[indexDownload].periode_ticket);
			if (rowsData[indexDownload].etat_ticket) {
				set_checked_ticket_ouvert(true);
			}else {
				set_checked_ticket_ferme(true);
			}
			set_input_site(rowsData[indexDownload].id_site);
			set_input_nom_fournisseur(rowsData[indexDownload].id_fournisseur);
			set_input_nom_technicien(rowsData[indexDownload].id_technicien);
			set_input_id_equipement(rowsData[indexDownload].etat_machine_final);
			set_input_severite(rowsData[indexDownload].severite_equip);
			set_input_numero_serie(rowsData[indexDownload].num_serie);
			set_input_date_heure_reponse(rowsData[indexDownload].date_reponse+"T"+rowsData[indexDownload].heure_reponse);
			set_input_date_heure_signalisation(rowsData[indexDownload].date_signalisation+"T"+rowsData[indexDownload].heur_signalisation);
			set_input_temps_resolution(rowsData[indexDownload].temps_resolution);
			set_input_temps_restoration(rowsData[indexDownload].temps_restauration);
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
			set_input_site("");
			set_input_nom_fournisseur("");
			set_input_nom_technicien("");
			set_input_id_equipement("");
			set_input_severite("");
			set_input_numero_serie("");
			set_input_date_heure_reponse("");
			set_input_date_heure_signalisation("");
			set_input_temps_resolution("");
			set_input_temps_restoration("");
		}
  }, [typeDeFiche]);
  

	useEffect(() => {
		showResult();
	}, []);

	return (
		<div className='ticket_container_curative' >

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
					
          <textarea type="text" className='numero_de_serie_curative' maxLength="23" defaultValue={input_numero_serie} onChange={(e) => set_input_numero_serie(e.target.value)}/>
					<textarea type="text" className='id_equipement' maxLength="23" defaultValue={input_id_equipement} onChange={(e) => set_input_id_equipement(e.target.value)}/>
					
          <input type="datetime-local" className='date_heure_signalisation' maxLength="23" defaultValue={input_date_heure_signalisation} onChange={(e) => set_input_date_heure_signalisation(e.target.value)}/>
					<input type="datetime-local" className='date_heure_reponse' maxLength="23" defaultValue={input_date_heure_reponse} onChange={(e) => set_input_date_heure_reponse(e.target.value)}/>
					<input type="text" className='severite' maxLength="23" defaultValue={input_severite} onChange={(e) => set_input_severite(e.target.value)}/>
					<input type="text" className='temps_restoration' maxLength="23" defaultValue={input_temps_restoration} onChange={(e) => set_input_temps_restoration(e.target.value)}/>
					<input type="text" className='temps_resolution' maxLength="23" defaultValue={input_temps_resolution} onChange={(e) => set_input_temps_resolution(e.target.value)}/>

					</>
				}
				<canvas id="id_canvas_curative" width="1700" height="2200" style={{display : (apercu) ? "block" : "none"}} ></canvas>
				</div>}
			<img src={return_button} id="return_button" alt="add" onClick={() =>return_to_main()}></img>			
			{!apercu && <Button onClick={() => {showResult(); set_apercu(true);}} id="preview_button">apercu</Button>}
		</div>
	);
}

export default observer(Fichecurative);
