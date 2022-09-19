import React from 'react';
import { useState } from 'react';
import {ReImg} from 'reimg'
import ticket from '../assets/images/fiche_dintervention.jpg'
import "../assets/styles/ficheDinterventionGenerator.css"
import ticket_telecharge from '../assets/images/fiche_dintervention_telecharge.jpg'
import { Button } from '../components/basicComponents';

function Ticket() {
	const [loaded, setLoaded] = useState(false);
	const [apercu, set_apercu] = useState(false);
	const [checked_curative, set_checked_curative] = useState(false);
	const [checked_preventive, set_checked_preventive] = useState(false);
	const [input_numero_ticket, set_input_numero_ticket] = useState("");
	const [input_trimestre, set_input_trimestre] = useState("");
	const [input_annee, set_input_annee] = useState("");
	const [checked_ticket_ouvert, set_checked_ticket_ouvert] = useState(false);
	const [checked_ticket_ferme, set_checked_ticket_ferme] = useState(false);
	const [input_site, set_input_site] = useState("");
	const [input_date_heure_signalisation, set_input_date_heure_signalisation] = useState("");
	const [input_date_heure_reponse, set_input_date_heure_reponse] = useState("");
	const [input_severite, set_input_severite] = useState("");
	const [input_temp_restoration, set_input_temp_restoration] = useState("");
	const [input_temp_resolution, set_input_temp_resolution] = useState("");
	const [input_conclusion_generale, set_input_conclusion_generale] = useState("");
	const [r_1, set_r_1] = useState("");
	const [r_2, set_r_2] = useState("");
	const [r_3, set_r_3] = useState("");
	const [r_4, set_r_4] = useState("");
	const [r_5, set_r_5] = useState("");
	const [r_6, set_r_6] = useState("");
	const [r_7, set_r_7] = useState("");
	const [r_8, set_r_8] = useState("");
	const [o_1, set_o_1] = useState("");
	const [o_2, set_o_2] = useState("");
	const [o_3, set_o_3] = useState("");
	const [o_4, set_o_4] = useState("");
	const [o_5, set_o_5] = useState("");
	const [o_6, set_o_6] = useState("");
	const [o_7, set_o_7] = useState("");
	const [o_8, set_o_8] = useState("");

	const [input_nom_fournisseur, set_input_nom_fournisseur] = useState("");
	const [input_nom_client, set_input_nom_client] = useState("");
	const [input_commentaire_client, set_input_commentaire_client] = useState("");

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

	const long_text_area_fill = (context, input, width ,h1 , h2 , h3) => {
		if (input) {
			var parts = input.match(/[\s\S]{1,18}/g)
			if (parts[0]) {
				context.fillText(parts[0], width, h1);
			} 
			if (parts[1]) {
				context.fillText(parts[1], width, h2);
			} 
			if (parts[2]) {
				context.fillText(parts[2], width, h3);
			}
	  }
	}

	const text_area_fill = (context, input, width ,h1 , h2, h3) => {
		if (input) {
			var parts = input.match(/[\s\S]{1,12}/g)
			if (parts[0]) {
				context.fillText(parts[0], width, h1);
			} 
			if (parts[1]) {
				context.fillText(parts[1], width, h2);
			} 
			if (parts[2]) {
				context.fillText(parts[2], width, h3);
			}}
	}

  const showResult = () => {
			var canvas = document.getElementById('idCanvas');
			var context = canvas.getContext('2d');
		
			var imageObj = new Image();

			imageObj.onload = function() {
			context.drawImage(imageObj, 0, 0);
			context.fillStyle = "black";

			context.font = "55px Calibri";

			if (checked_curative) {
				context.fillText("X", 1238, 468);
			} else {
				context.fillText("X", 829, 475);			
			}

			if (checked_ticket_ouvert) {
				context.fillText("X", 347, 568);
			} else if (checked_ticket_ferme) {
				context.fillText("X", 518, 576);			
			}

			context.font = "28px Calibri";

			context.fillText(input_trimestre, 338, 490);
			context.fillText(input_annee, 449, 491);

			context.font = "32px Calibri";
			context.fillText(input_numero_ticket, 215, 558);

			long_text_area_fill(context, input_site, 115, 828, 856, 884);
			long_text_area_fill(context, input_date_heure_signalisation, 394, 828, 856, 884);
			long_text_area_fill(context, input_date_heure_reponse, 700, 828, 856, 884);
			context.fillText(input_severite, 1070, 832);
			text_area_fill(context, input_temp_restoration, 1160, 830, 858, 886);
			text_area_fill(context, input_temp_resolution, 1367, 830, 858, 886);

			context.font = "25px Calibri";

			context.fillText(r_1, 752, 1060);
			context.fillText(r_2, 752, 1110);
			context.fillText(r_3, 752, 1160);
			context.fillText(r_4, 752, 1200);
			context.fillText(r_5, 752, 1250);
			context.fillText(r_6, 752, 1294);
			context.fillText(r_7, 752, 1342);
			context.fillText(r_8, 752, 1396);

			context.fillText(o_1, 902, 1060);
			context.fillText(o_2, 902, 1110);
			context.fillText(o_3, 902, 1160);
			context.fillText(o_4, 902, 1200);
			context.fillText(o_5, 902, 1250);
			context.fillText(o_6, 902, 1294);
			context.fillText(o_7, 902, 1342);
			context.fillText(o_8, 902, 1396);

			context.font = "33px Calibri";
			if (input_conclusion_generale) {
				var parts = input_conclusion_generale.match(/[\s\S]{1,105}/g)
				if (parts[0]) {
					context.fillText(parts[0], 110, 1490);
				} 
				if (parts[1]) {
					context.fillText(parts[1], 110, 1524);
				} 
				if (parts[2]) {
					context.fillText(parts[2], 110, 1558);
				}
				if (parts[3]) {
					context.fillText(parts[3], 110, 1592);
				}
				if (parts[4]) {
					context.fillText(parts[4], 110, 1626);
				}}

				context.font = "32px Calibri";
				if (input_commentaire_client) {
					var parts = input_commentaire_client.match(/[\s\S]{1,37}/g)
					if (parts[0]) {
						context.fillText(parts[0], 665, 1919);
					} 
					if (parts[1]) {
						context.fillText(parts[1], 665, 1953);
					} 
					if (parts[2]) {
						context.fillText(parts[2], 665, 1987);
					}
					if (parts[3]) {
						context.fillText(parts[3], 665, 2021);
					}
					if (parts[4]) {
						context.fillText(parts[4], 665, 2055);
					}}

					context.font = "34px Calibri";
					context.fillText(input_nom_fournisseur, 178, 1919);
					context.fillText(input_nom_client, 1262, 1917);
		}
		imageObj.setAttribute('crossOrigin', 'anonymous');
		imageObj.src = ticket_telecharge;
		set_apercu(true);
		return;
	}

	const telecharger = () => {
		ReImg.fromCanvas(document.getElementById('idCanvas')).downloadPng();
		set_apercu(false);
	}

	return (
		<div className='ticket_container_ag' style={!loaded ? { display: 'block' } : { display: 'none' }}>

			<div className='ticket'>
				{!apercu &&
				<>
				<img src={ticket} id="ticket" alt="ticket" onload={() => setLoaded(true)}></img>

				<input type="checkbox" className='ticket_ouvert' checked={checked_ticket_ouvert} onClick={() => handle_checked_fiche("ouvert")}/>
				<input type="checkbox" className='ticket_ferme' checked={checked_ticket_ferme} onClick={() => handle_checked_fiche("ferme")}/> 

				<input type="text" className='num_ticket' maxLength="25" onChange={(e) => set_input_numero_ticket(e.target.value)}/>
				<input type="text" className='id_site' maxLength="25" onChange={(e) => set_input_numero_ticket(e.target.value)}/>
				<input type="text" className='id_fournisseur' maxLength="25" onChange={(e) => set_input_numero_ticket(e.target.value)}/>
				<input type="text" className='id_technicien' maxLength="25" onChange={(e) => set_input_numero_ticket(e.target.value)}/>
				<input type="text" className='periode' maxLength="25" onChange={(e) => set_input_numero_ticket(e.target.value)}/>

				<input type="text" className='equipement_1' maxLength="13" defaultValue={r_1} onChange={(e) => set_r_1(e.target.value)}/>
				<input type="text" className='type_1' maxLength="68" defaultValue={o_1} onChange={(e) => set_o_1(e.target.value)}/>
				<input type="text" className='num_serie_1' maxLength="13" defaultValue={r_1} onChange={(e) => set_r_1(e.target.value)}/>
				<input type="text" className='etat_1' maxLength="68" defaultValue={o_1} onChange={(e) => set_o_1(e.target.value)}/>
				<input type="text" className='observation_1' maxLength="68" defaultValue={o_1} onChange={(e) => set_o_1(e.target.value)}/>


				<textarea className='conclusion_generale_ticket' wrap="hard" maxLength="1100" defaultValue={input_conclusion_generale} onChange={(e) => set_input_conclusion_generale(e.target.value)}/>
				</>}
				<canvas id="idCanvas" width="1765" height="2463" className={!apercu ? 'display_none': ''}></canvas>

			</div>
			{!apercu && <Button onClick={() => showResult()} id="preview_button">apercu</Button>}
			{apercu && 
				<div className='button_container'>
					<Button onClick={() => set_apercu(false)}>modifier</Button>
					<Button onClick={() => telecharger()}>telecharger</Button>
				</div>
			}
		</div>
	);
}

export default Ticket;
