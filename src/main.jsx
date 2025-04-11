import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import { store } from './app/store.jsx';
import App from './App.jsx';
import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // ✅ Import JS ở đây
createRoot(document.getElementById('root')).render(
	<StrictMode>
		<Provider store={store}>
			<Router>
				<App />
			</Router>
			<ToastContainer position='top-right' autoClose={2500} theme='colored' />
		</Provider>
	</StrictMode>
);
