import { Routes, Route } from 'react-router-dom';
import Login from './features/auth/Login';
import Register from './features/auth/Register';
import Dashboard from './features/Dashboard/Dashboard';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fakeCheckAuth } from './features/auth/authActions';

import Home from './components/Home/Home';
import Module from './components/Module/Module';
import NotFound from './components/NotFound/NotFound';
import GeneralInfo from './components/GeneralInfo/GeneralInfo';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import Profile from './components/profile/Profile';
import Lecturer from './components/Lecturer/Lecturer';
import PlanGroup from './components/PlanGroup/PlanGroup';
import Assignment from './components/Assignment/Assignment';

function App() {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fakeCheckAuth());
	}, [dispatch]);

	return (
		<Routes>
			<Route path='/' element={<Home />} />
			<Route path='/login' element={<Login />} />
			<Route path='/register' element={<Register />} />
			{/* 🔒 Private route */}
			<Route path='/dashboard' element={<PrivateRoute />}>
				<Route element={<Dashboard />}>
					{/* Dashboard là layout */}
					<Route index element={<Profile />} />
					<Route path='profile' element={<Profile />} />
					<Route path='module' element={<Module />} />
					<Route path='general-info' element={<GeneralInfo />} />
					<Route path='lecturer' element={<Lecturer />} />
					<Route path='plan-group' element={<PlanGroup />} />
					<Route path='assignment' element={<Assignment />} />
				</Route>
			</Route>
			<Route path='*' element={<NotFound />} /> {/* Trang NotFound */}
		</Routes>
	);
}

export default App;
