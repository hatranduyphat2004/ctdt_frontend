import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaLock } from 'react-icons/fa'; // dùng icon khóa từ react-icons
import './Unauthorized.css';

const Unauthorized = () => {
	const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

	return (
		<Container
			className='unauthorized-container d-flex justify-content-center align-items-center'
			style={{ height: '100vh' }}
		>
			<div className='text-center'>
				<FaLock size={80} color='#dc3545' className='mb-3' />
				<h1 className='unauthorized-heading'>403</h1>
				<h2 className='unauthorized-message'>Bạn không có quyền truy cập</h2>
				<p className='unauthorized-description'>
					Bạn không có quyền để truy cập trang này. Vui lòng đăng nhập bằng tài
					khoản phù hợp hoặc quay lại trang chính.
				</p>
				{isAuthenticated ? (
					<Link to='/dashboard'>
						<Button variant='danger' size='lg' className='px-5'>
							Dashboard
						</Button>
					</Link>
				) : (
					<Link to='/login'>
						<Button variant='primary' size='lg' className='px-5'>
							Đăng nhập
						</Button>
					</Link>
				)}
			</div>
		</Container>
	);
};

export default Unauthorized;
