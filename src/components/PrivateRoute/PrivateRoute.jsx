// src/components/PrivateRoute.jsx
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = ({ allowedRoles }) => {
	const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
	const userRole = useSelector((state) => state.auth.user?.vaiTro); // ví dụ: "ADMIN"

	if (!isAuthenticated) return <Navigate to='/login' replace />;

	if (allowedRoles && !allowedRoles.includes(userRole))
		return <Navigate to='/unauthorized' replace />;

	return <Outlet />;
};

export default PrivateRoute;
