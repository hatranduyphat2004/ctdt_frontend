import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Button } from 'react-bootstrap';
import './NotFound.css'; // Đảm bảo bạn đã tạo file NotFound.css để tùy chỉnh styles

const NotFound = () => {
	return (
		<Container
			className='notfound-container d-flex justify-content-center align-items-center'
			style={{ height: '100vh' }}
		>
			<div className='text-center'>
				<h1 className='notfound-heading'>404</h1>
				<h2 className='notfound-message'>Oops! Page Not Found</h2>
				<p className='notfound-description'>
					The page you're looking for might have been removed or is temporarily
					unavailable.
				</p>
				<Link to='/'>
					<Button variant='primary' className='notfound-button'>
						Go Back to Home
					</Button>
				</Link>
			</div>
		</Container>
	);
};

export default NotFound;
