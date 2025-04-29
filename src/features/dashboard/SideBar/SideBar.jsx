import React from 'react';
import { useSelector } from 'react-redux';
import { Button, Nav } from 'react-bootstrap';
import { FaTimes, FaBars } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './SideBar.css';

const Sidebar = ({ isSidebarOpen, toggleSidebar, isActive }) => {
	const user = useSelector((state) => state.auth.user);

	return (
		<>
			<aside
				className={`sidebar ${
					isSidebarOpen ? 'open' : 'closed px-0'
				} bg-secondary`}
			>
				<div className='sidebar-header d-flex align-items-center justify-content-between'>
					{isSidebarOpen && <h4 className='text-white mb-0'>Dashboard</h4>}
					<Button
						variant='link'
						className='toggle-btn ps-4'
						onClick={toggleSidebar}
					>
						{isSidebarOpen ? <FaTimes /> : <FaBars />}
					</Button>
				</div>

				<Nav
					className={`sidebar-nav flex-column ${
						isSidebarOpen ? '' : 'centered'
					}`}
				>
					<Nav.Item className='mb-3'>
						<Link
							className={`nav-link text-white custom-link ${
								isActive('overview') ? 'active' : ''
							}`}
							to='overview'
						>
							{isSidebarOpen ? '🏠 Tổng quan' : '🏠'}
						</Link>
					</Nav.Item>
					{user.vaiTro === 'GIANG_VIEN' && (
						<Nav.Item className='mb-3'>
							<Link
								className={`nav-link text-white custom-link ${
									isActive('profile') ? 'active' : ''
								}`}
								to='profile'
							>
								{isSidebarOpen ? '👤 Trang cá nhân' : '👤'}
							</Link>
						</Nav.Item>
					)}

					<Nav.Item className='mb-3'>
						<Link
							className={`nav-link text-white custom-link ${
								isActive('general-info') ? 'active' : ''
							}`}
							to='general-info'
						>
							{isSidebarOpen ? '📄 Thông tin chung' : '📄'}
						</Link>
					</Nav.Item>
					<Nav.Item className='mb-3'>
						<Link
							className={`nav-link text-white custom-link ${
								isActive('major') ? 'active' : ''
							}`}
							to='major'
						>
							{isSidebarOpen ? '🎓 Ngành học' : '🎓'}
						</Link>
					</Nav.Item>
					<Nav.Item className='mb-3'>
						<Link
							className={`nav-link text-white custom-link ${
								isActive('module') ? 'active' : ''
							}`}
							to='module'
						>
							{isSidebarOpen ? '📚 Học phần' : '📚'}
						</Link>
					</Nav.Item>
					{user.vaiTro === 'ADMIN' && (
						<Nav.Item className='mb-3'>
							<Link
								className={`nav-link text-white custom-link ${
									isActive('lecturer') ? 'active' : ''
								}`}
								to='lecturer'
							>
								{isSidebarOpen ? '👨‍🏫 Giảng viên' : '👨‍🏫'}
							</Link>
						</Nav.Item>
					)}
					{user.vaiTro === 'ADMIN' && (
						<Nav.Item className='mb-3'>
							<Link
								className={`nav-link text-white custom-link ${
									isActive('program') ? 'active' : ''
								}`}
								to='program'
							>
								{isSidebarOpen ? '🧩 Khung chương trình' : '🧩'}
							</Link>
						</Nav.Item>
					)}
					<Nav.Item className='mb-3'>
						<Link
							className={`nav-link text-white custom-link ${
								isActive('plan-group') ? 'active' : ''
							}`}
							to='plan-group'
						>
							{isSidebarOpen ? '🗓️ Kế hoạch mở nhóm' : '🗓️'}
						</Link>
					</Nav.Item>
					{user.vaiTro === 'ADMIN' && (
						<Nav.Item className='mb-3'>
							<Link
								className={`nav-link text-white custom-link ${
									isActive('assignment') ? 'active' : ''
								}`}
								to='assignment'
							>
								{isSidebarOpen ? '📝 Phân công' : '📝'}
							</Link>
						</Nav.Item>
					)}
					{user.vaiTro === 'ADMIN' && (
						<Nav.Item className='mb-3'>
							<Link
								className={`nav-link text-white custom-link ${
									isActive('account') ? 'active' : ''
								}`}
								to='account'
							>
								{isSidebarOpen ? '🔒 Quản lý tài khoản' : '🔒'}
							</Link>
						</Nav.Item>
					)}
					<Nav.Item className='mb-3'>
						<Link
							className={`nav-link text-white custom-link ${
								isActive('statistics') ? 'active' : ''
							}`}
							to='statistics'
						>
							{isSidebarOpen ? '📊 Thống kê' : '📊'}
						</Link>
					</Nav.Item>
				</Nav>
			</aside>
		</>
	);
};

export default Sidebar;
