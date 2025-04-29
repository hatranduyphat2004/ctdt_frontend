import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import { store, persistor } from './app/store.jsx';
import App from './App.jsx';
import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-datepicker/dist/react-datepicker.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // ✅ Import JS ở đây
import { PersistGate } from 'redux-persist/integration/react';

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<Router>
					<App />
				</Router>
				<ToastContainer position='top-right' autoClose={2500} theme='colored' />
			</PersistGate>
		</Provider>
	</StrictMode>
);
