import React, {useContext, useEffect , useState} from 'react';
import './assets/styles/style.css';
import { Routes, Route } from 'react-router-dom';
import { APIStoreContext } from "./APIStoreContext";
import { observer } from "mobx-react";
import MyAccount from "./components/MyAccount";
import settings from './assets/images/settings.svg';
import Employe from './pages/Employe';
import Ticket from './pages/Ticket';
import Login from './components/Login';
import Inscription from './pages/Inscription'
import SideBarNav from './components/SideBarNav.jsx';
import {
	Fournisseur,
	Technicien,
	Equipement,
	Contrat,
	Plateforme,
} from './pages';
import Ticket_curative from './pages/Ticket_curative';

function App() {
	const [authenticated, setAuthenticated] = useState(false);
	const [employe, setEmploye] = useState({});
	const [isAdmin, setIsAdmin] = useState(false);
  const [myAccountModelDisplay ,setMyAccountModelDisplay] = useState(false);
	const { socketStore } = useContext(APIStoreContext);
	useEffect(() => {
		socketStore.connectSocket();
  }, []);
	return (
		<div className="App">
			{!authenticated && <Login setAuthenticated={setAuthenticated} setEmploye={setEmploye} setIsAdmin={setIsAdmin} employe={employe}/>}
				{authenticated &&
				<> 		
				<SideBarNav isAdmin={isAdmin}/>
				<Routes>
					<Route path="/" element={<Fournisseur />} />

					<Route path="/techniciens" element={<Technicien />} />

					<Route path="/equipements" element={<Equipement />} />

					<Route path="/contrats" element={<Contrat />} />

					<Route path="/plateformes" element={<Plateforme />} />

					<Route path="/preventive" element={<Ticket /> } />

					<Route path="/curative" element={<Ticket_curative /> } />


					{isAdmin && 
					<>
					<Route path="/employe" element={<Employe/>} />
					<Route path="/inscription" element={<Inscription/>} />
					</>}
				</Routes>
				<div className="settings">
						<img className="settingsIcon" src={settings} alt="parametre"/>
						<div class="dropdown-content">
							<p onClick={()=>setAuthenticated(false)}>deconnecter</p>
							<p onClick={() => setMyAccountModelDisplay(true)}>mon compte</p>
						</div>
					</div>
					<MyAccount 
						myAccountModelDisplay={myAccountModelDisplay} 
						setMyAccountModelDisplay={setMyAccountModelDisplay}
						employe={employe}
						setEmploye={setEmploye}/></>
				}
		</div>
	);
}

export default observer(App);
