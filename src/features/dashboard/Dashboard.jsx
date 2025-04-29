import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../auth/authActions';
import {
	Button,
	Dropdown,
	Navbar,
	Container,
	Modal,
	Form,
	InputGroup,
} from 'react-bootstrap';
import { toast } from 'react-toastify';
import Sidebar from './SideBar/SideBar';
import './Dashboard.css';

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

	const isActive = (path) => location.pathname.includes(path);

	const handleLogout = () => {
		dispatch(logout());
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
			<Sidebar
				isSidebarOpen={isSidebarOpen}
				toggleSidebar={toggleSidebar}
				isActive={isActive}
			/>

			{/* Main content */}
			<main className='main-content w-100'>
				<Navbar bg='light' expand='lg' className='dashboard-header px-4'>
					<Container fluid className='px-0'>
						<Navbar.Brand>Ứng dụng Quản lý chương trình đào tạo</Navbar.Brand>
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
									Xin chào, {user?.hoTen || 'Người dùng'}
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
