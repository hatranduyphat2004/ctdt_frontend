import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Container } from 'react-bootstrap';
import './Home.css'; // Đảm bảo bạn đã tạo file Home.css để tùy chỉnh styles

const Home = () => {
	return (
		<Container
			className='home-container d-flex justify-content-center align-items-center'
			fluid
		>
			<div className='text-center'>
				<h1 className='home-heading'>Welcome to the Management App</h1>
				<p className='home-description'>
					A simple yet powerful app for managing your daily tasks and personal
					information.
				</p>
				<div className='home-actions'>
					<Link to='/login'>
						<Button variant='primary' size='lg' className='home-button px-5'>
							Login
						</Button>
					</Link>
					{/* <Link to='/register'>
						<Button
							variant='outline-primary'
							size='lg'
							className='home-button ml-3'
						>
							Register
						</Button>
					</Link> */}
				</div>
			</div>
		</Container>
	);
};

export default Home;
