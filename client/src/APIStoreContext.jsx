import React, { createContext } from 'react';
import fournisseurStore from './Stores/fournisseurStore';
import equipementStore from './Stores/equipementStore';
import technicienStore from './Stores/technicienStore';
import plateformeStore from './Stores/plateformeStore';
import socketStore from './Stores/socketStore';

export const APIStoreContext = createContext();

export function APIStoreProvider({ children }) {
	return (
		<APIStoreContext.Provider value={ {socketStore, fournisseurStore, equipementStore, technicienStore, plateformeStore} }>
			{children}
		</APIStoreContext.Provider>
	);
}
