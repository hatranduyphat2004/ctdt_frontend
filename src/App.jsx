// App.js
import { Routes, Route } from 'react-router-dom';
import Login from './features/auth/Login';
import Register from './features/auth/Register';
import Dashboard from './features/dashboard/Dashboard';

import Home from './components/Home/Home';
import Module from './components/Module/Module';
import NotFound from './components/NotFound/NotFound';
import GeneralInfo from './components/GeneralInfo/GeneralInfo';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import Profile from './components/profile/Profile';
import Lecturer from './components/Lecturer/Lecturer';
import PlanGroup from './components/PlanGroup/PlanGroup';
import Assignment from './components/Assignment/Assignment';
import Account from './components/Account/Account';
import Overview from './components/Overview/Overview';
import Unauthorized from './components/NotFound/Unauthorized';
import Major from './components/Major/Major';
import Program from './components/Program/Program';

function App() {
	return (
		<Routes>
			<Route path='/' element={<Home />} />
			<Route path='/login' element={<Login />} />
			<Route path='/register' element={<Register />} />
			{/* 🔒 Private route */}
			<Route path='/dashboard' element={<PrivateRoute />}>
				<Route element={<Dashboard />}>
					<Route index element={<Overview />} />
					<Route path='overview' element={<Overview />} />
					{/* <Route path='profile' element={<Profile />} /> */}
					<Route path='module' element={<Module />} />
					<Route path='general-info' element={<GeneralInfo />} />
					<Route path='plan-group' element={<PlanGroup />} />
					<Route path='assignment' element={<Assignment />} />
					<Route
						path='profile'
						element={<PrivateRoute allowedRoles={['GIANG_VIEN']} />}
					>
						<Route index element={<Profile />} />
					</Route>
					<Route
						path='program'
						element={<PrivateRoute allowedRoles={['ADMIN']} />}
					>
						<Route index element={<Program />} />
					</Route>
					<Route
						path='lecturer'
						element={<PrivateRoute allowedRoles={['ADMIN']} />}
					>
						<Route index element={<Lecturer />} />
					</Route>
					<Route
						path='major'
						element={<PrivateRoute allowedRoles={['ADMIN']} />}
					>
						<Route index element={<Major />} />
					</Route>
					<Route
						path='account'
						element={<PrivateRoute allowedRoles={['ADMIN']} />}
					>
						<Route index element={<Account />} />
					</Route>
				</Route>
			</Route>
			<Route path='/unauthorized' element={<Unauthorized />} />
			<Route path='*' element={<NotFound />} /> {/* Trang NotFound */}
		</Routes>
	);
}

export default App;
