import React, { useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../auth/authActions';
import {
	Button,
	Dropdown,
	Nav,
	Navbar,
	Container,
	Modal,
	Form,
	InputGroup,
} from 'react-bootstrap';
import { FaTimes, FaBars } from 'react-icons/fa';
import './Dashboard.css';
import { toast } from 'react-toastify';

function Dashboard() {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const user = useSelector((state) => state.auth.user);
	const [isSidebarOpen, setSidebarOpen] = useState(true);

	const [showModal, setShowModal] = useState(false);
	const [currentPassword, setCurrentPassword] = useState('');
	const [newPassword, setNewPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [showPassword, setShowPassword] = useState({
		current: false,
		newConfirm: false, // gộp
	});

	const handleLogout = async () => {
		await dispatch(logout());
		toast.info('Đăng xuất thành công');
		navigate('/login');
	};

	const toggleSidebar = () => {
		setSidebarOpen(!isSidebarOpen);
	};

	const handleClose = () => {
		setShowModal(false);
		setCurrentPassword('');
		setNewPassword('');
		setConfirmPassword('');
		setShowPassword({ current: false, newConfirm: false });
	};
	const handleSave = () => {
		if (newPassword !== confirmPassword) {
			alert('Mật khẩu mới không khớp');
			return;
		}
		// Xử lý cập nhật mật khẩu ở đây
		alert('Mật khẩu đã được cập nhật');
		handleClose();
	};

	return (
		<div className='dashboard-container d-flex'>
			{/* Sidebar */}
			<aside
				className={`sidebar ${isSidebarOpen ? 'open' : 'closed'} bg-secondary`}
			>
				<div className='sidebar-header d-flex align-items-center justify-content-between'>
					{isSidebarOpen && <h4 className='text-white mb-0'>Dashboard</h4>}
					<Button variant='link' className='toggle-btn' onClick={toggleSidebar}>
						{isSidebarOpen ? <FaTimes /> : <FaBars />}
					</Button>
				</div>

				<Nav
					className={`sidebar-nav flex-column ${
						isSidebarOpen ? '' : 'centered'
					}`}
				>
					<Nav.Item className='mb-3'>
						<Link className='nav-link text-white ' to='profile'>
							{isSidebarOpen ? '👤 Trang cá nhân' : '👤'}
						</Link>
					</Nav.Item>
					<Nav.Item className='mb-3'>
						<Link className='nav-link text-white ' to='general-info'>
							{isSidebarOpen ? '📄 Thông tin chung' : '📄'}
						</Link>
					</Nav.Item>
					<Nav.Item className='mb-3'>
						<Link className='nav-link text-white ' to='module'>
							{isSidebarOpen ? '📚 Học phần' : '📚'}
						</Link>
					</Nav.Item>
					<Nav.Item className='mb-3'>
						<Link className='nav-link text-white ' to='lecturer'>
							{isSidebarOpen ? '👨‍🏫 Giảng viên' : '👨‍🏫'}
						</Link>
					</Nav.Item>
					<Nav.Item className='mb-3'>
						<Link className='nav-link text-white ' to='plan-group'>
							{isSidebarOpen ? '🗓️ Kế hoạch mở nhóm' : '🗓️'}
						</Link>
					</Nav.Item>
					<Nav.Item className='mb-3'>
						<Link className='nav-link text-white ' to='assignment'>
							{isSidebarOpen ? '📊 Phân công' : '📊'}
						</Link>
					</Nav.Item>
				</Nav>
			</aside>

			{/* Main content */}
			<main className='main-content w-100'>
				<Navbar bg='light' expand='lg' className='dashboard-header px-4'>
					<Container fluid>
						<Navbar.Brand>Ứng dụng Quản Lý</Navbar.Brand>
						<Dropdown align='end'>
							<Dropdown.Toggle variant='link' id='avatar-dropdown'>
								<img
									src='https://i.pravatar.cc/40'
									alt='avatar'
									className='avatar'
								/>
							</Dropdown.Toggle>

							<Dropdown.Menu>
								<Dropdown.Item disabled>
									Xin chào, {user.name || 'Người dùng'}
								</Dropdown.Item>
								<Dropdown.Item onClick={() => setShowModal(true)}>
									Đổi mật khẩu
								</Dropdown.Item>
								<Dropdown.Divider />
								<Dropdown.Item onClick={handleLogout}>
									🚪 Đăng xuất
								</Dropdown.Item>
							</Dropdown.Menu>
						</Dropdown>
					</Container>
				</Navbar>

				<div className='content p-4'>
					<Outlet />
				</div>
			</main>
			<Modal show={showModal} onHide={handleClose} centered>
				<Modal.Header closeButton>
					<Modal.Title>Đổi mật khẩu</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form>
						<Form.Group className='mb-3'>
							<Form.Label>Mật khẩu hiện tại</Form.Label>
							<InputGroup>
								<Form.Control
									type={showPassword.current ? 'text' : 'password'}
									value={currentPassword}
									onChange={(e) => setCurrentPassword(e.target.value)}
									placeholder='Nhập mật khẩu hiện tại'
									required
								/>
								<Button
									variant='outline-secondary'
									onClick={() =>
										setShowPassword((prev) => ({
											...prev,
											current: !prev.current,
										}))
									}
								>
									{showPassword.current ? '🙈' : '👁️'}
								</Button>
							</InputGroup>
						</Form.Group>

						<Form.Group className='mb-3'>
							<Form.Label>Mật khẩu mới</Form.Label>
							<InputGroup>
								<Form.Control
									type={showPassword.newConfirm ? 'text' : 'password'}
									value={newPassword}
									onChange={(e) => setNewPassword(e.target.value)}
									placeholder='Nhập mật khẩu mới'
									required
								/>
								<Button
									variant='outline-secondary'
									onClick={() =>
										setShowPassword((prev) => ({
											...prev,
											newConfirm: !prev.newConfirm,
										}))
									}
								>
									{showPassword.newConfirm ? '🙈' : '👁️'}
								</Button>
							</InputGroup>
						</Form.Group>

						<Form.Group>
							<Form.Label>Xác nhận mật khẩu mới</Form.Label>
							<Form.Control
								type={showPassword.newConfirm ? 'text' : 'password'}
								value={confirmPassword}
								onChange={(e) => setConfirmPassword(e.target.value)}
								placeholder='Xác nhận lại mật khẩu mới'
								required
							/>
						</Form.Group>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button variant='secondary' onClick={handleClose}>
						Hủy
					</Button>
					<Button variant='primary' onClick={handleSave}>
						Lưu
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
}

export default Dashboard;
