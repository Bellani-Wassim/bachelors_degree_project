import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { APIStoreProvider } from './APIStoreContext.jsx';
import App from './App';

const root = ReactDOM.createRoot(
	document.getElementById('root'),
);

root.render(
	<React.StrictMode>
		<BrowserRouter>
			<APIStoreProvider>
				<App />
			</APIStoreProvider>
		</BrowserRouter>
	</React.StrictMode>,
);
